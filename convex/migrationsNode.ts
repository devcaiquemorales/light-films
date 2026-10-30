"use node";

// Node runtime: its fetch sends a Content-Length with the upload, which R2 requires
import { v, type Infer } from "convex/values";
import { internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import type { Id } from "./_generated/dataModel";
import { photo } from "./schema";
import { r2Config } from "./r2";

type Photo = Infer<typeof photo>;

const extensions: Record<string, string> = {
	"image/webp": "webp",
	"image/jpeg": "jpg",
	"image/png": "png",
};

export const photosToR2 = internalAction({
	args: { siteUrl: v.string() },
	handler: async (ctx, { siteUrl }) => {
		const r2 = r2Config();
		if (!r2) throw new Error("R2 env vars are missing on this deployment");
		const base = siteUrl.replace(/\/+$/, "");
		const projects = await ctx.runQuery(
			internal.migrations.projectsToMigrate,
			{}
		);
		const report: string[] = [];

		for (const project of projects) {
			const photos: Photo[] = [];
			const oldStorage: Id<"_storage">[] = [];

			for (const [index, item] of project.photos.entries()) {
				if (item.r2Key) {
					photos.push(item);
					continue;
				}

				let blob: Blob | null = null;
				if (item.storageId) {
					blob = await ctx.storage.get(item.storageId);
					oldStorage.push(item.storageId);
				} else if (item.path) {
					const response = await fetch(`${base}${item.path}`);
					if (response.ok) blob = await response.blob();
				}
				if (!blob)
					throw new Error(
						`Could not read photo ${index + 1} of ${project.slug}`
					);

				const type = blob.type || "image/jpeg";
				const key = `projetos/${project.slug}/${String(index + 1).padStart(2, "0")}-${crypto.randomUUID().slice(0, 8)}.${extensions[type] ?? "jpg"}`;
				const upload = await r2.client.fetch(
					`${r2.endpoint}/${r2.bucket}/${key}`,
					{
						method: "PUT",
						headers: { "Content-Type": type },
						// Full buffer so Node sends a Content-Length (R2 answers 411 to streamed bodies)
						body: Buffer.from(await blob.arrayBuffer()),
					}
				);
				if (!upload.ok)
					throw new Error(`R2 upload failed for ${key}: ${upload.status}`);
				photos.push({ r2Key: key });
			}

			await ctx.runMutation(internal.migrations.setPhotos, {
				id: project._id,
				photos,
			});
			for (const storageId of oldStorage) await ctx.storage.delete(storageId);
			report.push(`${project.slug}: ${photos.length} fotos`);
		}

		return report;
	},
});

// Deletes bucket files no project uses (uploads abandoned in the panel, failed migrations).
// Files newer than an hour are kept so a project being edited right now isn't touched.
// Run: bunx convex run migrationsNode:cleanupR2Orphans '{"dryRun":true}'
export const cleanupR2Orphans = internalAction({
	args: { dryRun: v.optional(v.boolean()), minAgeMinutes: v.optional(v.number()) },
	handler: async (ctx, { dryRun = false, minAgeMinutes = 60 }) => {
		const r2 = r2Config();
		if (!r2) throw new Error("R2 env vars are missing on this deployment");
		const used = new Set(
			await ctx.runQuery(internal.migrations.usedR2Keys, {})
		);
		const cutoff = Date.now() - minAgeMinutes * 60 * 1000;
		const orphans: string[] = [];

		let token: string | undefined;
		do {
			const url = new URL(`${r2.endpoint}/${r2.bucket}`);
			url.searchParams.set("list-type", "2");
			url.searchParams.set("prefix", "projetos/");
			if (token) url.searchParams.set("continuation-token", token);
			const xml = await (await r2.client.fetch(url)).text();

			for (const [, body] of xml.matchAll(
				/<Contents>([\s\S]*?)<\/Contents>/g
			)) {
				const key = body.match(/<Key>([^<]+)<\/Key>/)?.[1];
				const modified = body.match(
					/<LastModified>([^<]+)<\/LastModified>/
				)?.[1];
				if (
					key &&
					!used.has(key) &&
					modified &&
					Date.parse(modified) < cutoff
				) {
					orphans.push(key);
				}
			}
			token = xml.match(
				/<NextContinuationToken>([^<]+)<\/NextContinuationToken>/
			)?.[1];
		} while (token);

		if (!dryRun && orphans.length > 0) {
			await ctx.runAction(internal.r2.deleteObjects, { keys: orphans });
		}
		return { dryRun, orphans };
	},
});
