import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Everything open, AI search crawlers included. /painel is not blocked here on
// purpose: crawlers must reach it to read its noindex (also sent as a header).
export default function robots(): MetadataRoute.Robots {
	return {
		rules: { userAgent: "*", allow: "/" },
		sitemap: `${site.url}/sitemap.xml`,
	};
}
