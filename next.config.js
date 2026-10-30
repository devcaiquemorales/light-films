/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		formats: ["image/avif", "image/webp"],
		// 90 is used by the before/after slider, where compression shows the most
		qualities: [75, 90],
		// Project photos from the panel: Convex file storage and the R2 public bucket
		remotePatterns: [
			{ protocol: "https", hostname: "*.convex.cloud" },
			{ protocol: "https", hostname: "*.r2.dev" },
		],
	},
};

module.exports = nextConfig;
