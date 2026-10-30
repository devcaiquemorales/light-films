import { v } from "convex/values";
import {
	internalAction,
	internalMutation,
	internalQuery,
} from "./_generated/server";
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
