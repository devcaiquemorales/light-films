import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError, v, type Infer } from "convex/values";
import {
	internalMutation,
	mutation,
	query,
	type MutationCtx,
	type QueryCtx,
} from "./_generated/server";
import type { Doc, Id } from "./_generated/dataModel";
import { photo } from "./schema";

type Photo = Infer<typeof photo>;

// Helpers

async function requireUser(ctx: QueryCtx | MutationCtx) {
	const userId = await getAuthUserId(ctx);
	if (!userId) throw new ConvexError("Faça login para continuar.");
	return userId;
}

// Storage photos get a signed URL; photos still in /public keep their path
async function photoUrl(ctx: QueryCtx, item: Photo | undefined) {
	if (!item) return null;
	if (item.storageId) return await ctx.storage.getUrl(item.storageId);
	return item.path ?? null;
}

async function withUrls(ctx: QueryCtx, project: Doc<"projects">) {
	return {
		...project,
		coverUrl: await photoUrl(ctx, project.cover),
		photoUrls: await Promise.all(
			project.photos.map((item) => photoUrl(ctx, item))
		),
	};
}

function slugify(text: string) {
	return text
		.normalize("NFD")
		.replace(/[̀-ͯ]/g, "")
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

async function uniqueSlug(
	ctx: MutationCtx,
	title: string,
	ignoreId?: Id<"projects">
) {
	const base = slugify(title) || "projeto";
	let slug = base;
	for (let n = 2; ; n++) {
		const existing = await ctx.db
			.query("projects")
			.withIndex("by_slug", (q) => q.eq("slug", slug))
			.unique();
		if (!existing || existing._id === ignoreId) return slug;
		slug = `${base}-${n}`;
	}
}

function validate(fields: { title: string; description: string }) {
	if (fields.title.trim().length < 2)
		throw new ConvexError("Escreva o título do projeto.");
	if (fields.description.trim().length < 10)
		throw new ConvexError(
			"Conte em poucas palavras o que foi feito (mínimo 10 letras)."
		);
}

// Panel

// The cover is always the first photo, so the panel has a single way to choose it
const projectFields = {
	title: v.string(),
	description: v.string(),
	photos: v.array(photo),
	published: v.boolean(),
};

export const list = query({
	args: {},
	handler: async (ctx) => {
		await requireUser(ctx);
		const projects = await ctx.db.query("projects").order("desc").collect();
		return await Promise.all(
			projects.map(async (project) => ({
				_id: project._id,
				title: project.title,
				slug: project.slug,
				published: project.published,
				updatedAt: project.updatedAt,
				photoCount: project.photos.length,
				coverUrl: await photoUrl(ctx, project.cover),
			}))
		);
	},
});

export const get = query({
	args: { id: v.id("projects") },
	handler: async (ctx, { id }) => {
		await requireUser(ctx);
		const project = await ctx.db.get(id);
		return project ? await withUrls(ctx, project) : null;
	},
});

export const create = mutation({
	args: projectFields,
	handler: async (ctx, fields) => {
		await requireUser(ctx);
		validate(fields);
		const now = Date.now();
		return await ctx.db.insert("projects", {
			...fields,
			cover: fields.photos[0],
			title: fields.title.trim(),
			description: fields.description.trim(),
			slug: await uniqueSlug(ctx, fields.title),
			publishedAt: fields.published ? now : undefined,
			updatedAt: now,
		});
	},
});

export const update = mutation({
	args: { id: v.id("projects"), ...projectFields },
	handler: async (ctx, { id, ...fields }) => {
		await requireUser(ctx);
		validate(fields);
		const project = await ctx.db.get(id);
		if (!project) throw new ConvexError("Projeto não encontrado.");

		// Delete files that were removed from the project
		const kept = new Set(
			fields.photos.map((item) => item.storageId).filter(Boolean)
		);
		for (const item of [project.cover, ...project.photos]) {
			if (item?.storageId && !kept.has(item.storageId))
				await ctx.storage.delete(item.storageId);
		}

		await ctx.db.patch(id, {
			...fields,
			cover: fields.photos[0],
			title: fields.title.trim(),
			description: fields.description.trim(),
			slug: await uniqueSlug(ctx, fields.title, id),
			publishedAt: fields.published
				? (project.publishedAt ?? Date.now())
				: project.publishedAt,
			updatedAt: Date.now(),
		});
	},
});

export const remove = mutation({
	args: { id: v.id("projects") },
	handler: async (ctx, { id }) => {
		await requireUser(ctx);
		const project = await ctx.db.get(id);
		if (!project) return;
		for (const item of [project.cover, ...project.photos]) {
			if (item?.storageId) await ctx.storage.delete(item.storageId);
		}
		await ctx.db.delete(id);
	},
});

// TODO(fase 5): trocar pelo upload assinado do R2 (@convex-dev/r2)
export const generateUploadUrl = mutation({
	args: {},
	handler: async (ctx) => {
		await requireUser(ctx);
		return await ctx.storage.generateUploadUrl();
	},
});

// Public site

export const listPublished = query({
	args: {},
	handler: async (ctx) => {
		const projects = await ctx.db
			.query("projects")
			.withIndex("by_published", (q) => q.eq("published", true))
			.order("desc")
			.collect();
		return await Promise.all(projects.map((project) => withUrls(ctx, project)));
	},
});

// Dev: copy the static projects into the database (`bunx convex run projects:seed`)
export const seed = internalMutation({
	args: {
		projects: v.array(
			v.object({
				title: v.string(),
				slug: v.string(),
				description: v.string(),
				cover: v.string(),
				photos: v.array(v.string()),
			})
		),
	},
	handler: async (ctx, { projects }) => {
		const now = Date.now();
		for (const [index, project] of projects.entries()) {
			const existing = await ctx.db
				.query("projects")
				.withIndex("by_slug", (q) => q.eq("slug", project.slug))
				.unique();
			if (existing) {
				// Replace placeholder text only; never overwrite what was written in the panel
				if (existing.description.startsWith("Lorem ipsum")) {
					await ctx.db.patch(existing._id, {
						description: project.description,
					});
				}
				continue;
			}
			await ctx.db.insert("projects", {
				title: project.title,
				slug: project.slug,
				description: project.description,
				cover: { path: project.cover },
				photos: project.photos.map((path) => ({ path })),
				published: true,
				publishedAt: now - index,
				updatedAt: now - index,
			});
		}
	},
});

// Dev: give a user the admin role (`bunx convex run projects:makeAdmin '{"email":"..."}'`)
export const makeAdmin = internalMutation({
	args: { email: v.string() },
	handler: async (ctx, { email }) => {
		const user = await ctx.db
			.query("users")
			.withIndex("email", (q) => q.eq("email", email.toLowerCase()))
			.unique();
		if (!user) throw new ConvexError("Usuário não encontrado.");
		await ctx.db.patch(user._id, { role: "admin" });
	},
});
