import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

// Where a photo lives: Cloudflare R2 (`r2Key`), Convex file storage (`storageId`,
// fallback while R2 isn't configured) or /public (`path`, the original projects)
export const photo = v.object({
	r2Key: v.optional(v.string()),
	storageId: v.optional(v.id("_storage")),
	path: v.optional(v.string()),
});

export default defineSchema({
	...authTables,

	// Same shape as authTables.users, plus the panel role
	users: defineTable({
		name: v.optional(v.string()),
		image: v.optional(v.string()),
		email: v.optional(v.string()),
		emailVerificationTime: v.optional(v.number()),
		phone: v.optional(v.string()),
		phoneVerificationTime: v.optional(v.number()),
		isAnonymous: v.optional(v.boolean()),
		role: v.optional(v.union(v.literal("admin"), v.literal("cliente"))),
	}).index("email", ["email"]),

	projects: defineTable({
		title: v.string(),
		slug: v.string(),
		description: v.string(),
		cover: v.optional(photo),
		photos: v.array(photo),
		published: v.boolean(),
		publishedAt: v.optional(v.number()),
		updatedAt: v.number(),
	})
		.index("by_slug", ["slug"])
		.index("by_published", ["published", "publishedAt"]),
});
