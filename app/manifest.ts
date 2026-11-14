import type { MetadataRoute } from "next";
import { site, siteDescription } from "@/lib/site";

// "Add to home screen" on Android uses these names, colors and icons
export default function manifest(): MetadataRoute.Manifest {
	return {
		name: site.name,
		short_name: site.name,
		description: siteDescription,
		start_url: "/",
		display: "browser",
		background_color: "#f1f5f8",
		theme_color: "#1b3748",
		icons: [
			{ src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
			{ src: "/apple-icon", type: "image/png", sizes: "180x180" },
		],
	};
}
