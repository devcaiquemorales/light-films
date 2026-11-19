// Basic security headers for every page (no CSP yet: it needs testing with
// WhatsApp links, R2/Convex images and Vercel scripts first)
const securityHeaders = [
	{ key: "X-Content-Type-Options", value: "nosniff" },
	{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
	{ key: "X-Frame-Options", value: "DENY" },
	{
		key: "Permissions-Policy",
		value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
	},
];

/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
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
	async headers() {
		return [
			{ source: "/:path*", headers: securityHeaders },
			// The panel is private: keep it out of search even if a link leaks
			{
				source: "/painel/:path*",
				headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
			},
			{
				source: "/painel",
				headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
			},
		];
	},
};

module.exports = nextConfig;
