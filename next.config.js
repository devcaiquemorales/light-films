/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		formats: ["image/avif", "image/webp"],
		// 90 is used by the before/after slider, where compression shows the most
		qualities: [75, 90],
	},
};

module.exports = nextConfig;
