import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getProjects } from "@/lib/projects";

// Bump when the text of a static page changes. A fixed date on purpose:
// Google stops trusting lastmod if it changes on every request.
const HOME_UPDATED = new Date("2026-11-18");
const PRIVACY_UPDATED = new Date("2026-11-14");

// Photos from the panel are absolute URLs (R2/Convex); bundled ones are local paths
const absolute = (src: string) =>
	src.startsWith("http") ? src : `${site.url}${src}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const projects = await getProjects();

	// The home and /projetos list the projects, so a project edit updates them too
	const latestProject = Math.max(
		0,
		...projects.map((project) => project.updatedAt ?? 0)
	);
	const listUpdated = new Date(Math.max(HOME_UPDATED.getTime(), latestProject));

	return [
		{ url: site.url, lastModified: listUpdated },
		{ url: `${site.url}/projetos`, lastModified: listUpdated },
		{
			url: `${site.url}/politica-de-privacidade`,
			lastModified: PRIVACY_UPDATED,
		},
		...projects.map((project) => ({
			url: `${site.url}/projetos/${project.slug}`,
			lastModified: project.updatedAt
				? new Date(project.updatedAt)
				: HOME_UPDATED,
			// Image sitemap: helps the project photos show up in image search
			images: project.photos.map((photo) => absolute(photo.path)),
		})),
	];
}
