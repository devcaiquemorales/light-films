import { v } from "convex/values";
import { internalMutation, internalQuery } from "./_generated/server";
import { photo } from "./schema";

// One-off: copies every photo that is still in /public (`path`) or in Convex storage
// (`storageId`) into R2. Photos in /public are downloaded from a deployed copy of the site.
// Run: bunx convex run migrationsNode:photosToR2 '{"siteUrl":"https://v2-light-films.vercel.app"}'

export const projectsToMigrate = internalQuery({
	args: {},
	handler: async (ctx) => {
		const projects = await ctx.db.query("projects").collect();
		return projects
			.filter((project) => project.photos.some((item) => !item.r2Key))
			.map((project) => ({
				_id: project._id,
				slug: project.slug,
				photos: project.photos,
			}));
	},
});

export const setPhotos = internalMutation({
	args: { id: v.id("projects"), photos: v.array(photo) },
	handler: async (ctx, { id, photos }) => {
		await ctx.db.patch(id, { photos, cover: photos[0] });
	},
});

// Every R2 key a project still uses (for the orphan cleanup)
export const usedR2Keys = internalQuery({
	args: {},
	handler: async (ctx) => {
		const projects = await ctx.db.query("projects").collect();
		return projects.flatMap((project) =>
			[project.cover, ...project.photos].flatMap((item) =>
				item?.r2Key ? [item.r2Key] : []
			)
		);
	},
});

// One-off text fix: swaps a project description only if it still matches `from` exactly,
// so anything rewritten in the panel is left alone
export const replaceDescriptions = internalMutation({
	args: { pairs: v.array(v.object({ from: v.string(), to: v.string() })) },
	handler: async (ctx, { pairs }) => {
		const projects = await ctx.db.query("projects").collect();
		const changed: string[] = [];
		for (const project of projects) {
			const pair = pairs.find((item) => item.from === project.description);
			if (!pair) continue;
			await ctx.db.patch(project._id, {
				description: pair.to,
				updatedAt: Date.now(),
			});
			changed.push(project.slug);
		}
		return changed;
	},
});
