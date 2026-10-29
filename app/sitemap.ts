import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { ProjectsData } from "@/lib/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{ url: site.url, changeFrequency: "monthly", priority: 1 },
		{ url: `${site.url}/projetos`, changeFrequency: "monthly", priority: 0.8 },
		...ProjectsData.map((project) => ({
			url: `${site.url}/projetos/${project.slug}`,
			changeFrequency: "yearly" as const,
			priority: 0.6,
		})),
	];
}
