import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getProjects } from "@/lib/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const projects = await getProjects();
	return [
		{ url: site.url, changeFrequency: "monthly", priority: 1 },
		{ url: `${site.url}/projetos`, changeFrequency: "monthly", priority: 0.8 },
		...projects.map((project) => ({
			url: `${site.url}/projetos/${project.slug}`,
			changeFrequency: "yearly" as const,
			priority: 0.6,
		})),
	];
}
