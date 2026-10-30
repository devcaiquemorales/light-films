import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError, v } from "convex/values";
import { AwsClient } from "aws4fetch";
import { action, internalAction } from "./_generated/server";

// Cloudflare R2 via its S3 API. Env vars live on the Convex deployment:
// R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET and R2_PUBLIC_URL
function r2Config() {
	const {
		R2_ACCOUNT_ID: accountId,
		R2_ACCESS_KEY_ID: accessKeyId,
		R2_SECRET_ACCESS_KEY: secretAccessKey,
		R2_BUCKET: bucket,
		R2_PUBLIC_URL: publicUrl,
	} = process.env;
	if (!accountId || !accessKeyId || !secretAccessKey || !bucket || !publicUrl)
		return null;
	return {
		bucket,
		publicUrl: publicUrl.replace(/\/+$/, ""),
		endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
		client: new AwsClient({
			accessKeyId,
			secretAccessKey,
			service: "s3",
			region: "auto",
		}),
	};
}

export function r2PublicUrl(key: string) {
	const base = (process.env.R2_PUBLIC_URL ?? "").replace(/\/+$/, "");
	return base ? `${base}/${key}` : null;
}

const extensions: Record<string, string> = {
	"image/webp": "webp",
	"image/jpeg": "jpg",
	"image/png": "png",
};

// Where the panel should send a photo: a signed R2 PUT URL, or Convex storage while R2 isn't set up
export const getUploadTarget = action({
	args: { contentType: v.string() },
	handler: async (
		ctx,
		{ contentType }
	): Promise<
		{ kind: "r2"; url: string; key: string } | { kind: "convex"; url: string }
	> => {
		if (!(await getAuthUserId(ctx)))
			throw new ConvexError("Faça login para continuar.");
		if (!contentType.startsWith("image/"))
			throw new ConvexError("Envie apenas imagens.");

		const r2 = r2Config();
		if (!r2)
			return { kind: "convex", url: await ctx.storage.generateUploadUrl() };

		const key = `projetos/${crypto.randomUUID()}.${extensions[contentType] ?? "jpg"}`;
		const url = new URL(`${r2.endpoint}/${r2.bucket}/${key}`);
		url.searchParams.set("X-Amz-Expires", "600");
		const signed = await r2.client.sign(new Request(url, { method: "PUT" }), {
			aws: { signQuery: true },
		});
		return { kind: "r2", url: signed.url, key };
	},
});

// Removes photos that left a project (scheduled by projects.update / projects.remove)
export const deleteObjects = internalAction({
	args: { keys: v.array(v.string()) },
	handler: async (_ctx, { keys }) => {
		const r2 = r2Config();
		if (!r2) return;
		for (const key of keys) {
			const response = await r2.client.fetch(
				`${r2.endpoint}/${r2.bucket}/${key}`,
				{
					method: "DELETE",
				}
			);
			if (!response.ok && response.status !== 404) {
				console.error(`R2 delete failed for ${key}: ${response.status}`);
			}
		}
	},
});
