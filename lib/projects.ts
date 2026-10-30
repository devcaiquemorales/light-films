// Server-side project data for the public site, read from Convex
import { unstable_cache } from "next/cache";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import type { FunctionReturnType } from "convex/server";

// Types
import { ProjectsData, type Project } from "@/lib/data/projects";

// Panel saves call updateTag(PROJECTS_TAG) so pages refresh right away;
// the timer is only a safety net
export const PROJECTS_TAG = "projects";
const REVALIDATE_SECONDS = 300;

type ConvexProject = NonNullable<
	FunctionReturnType<typeof api.projects.getPublishedBySlug>
>;

// Same shape the site components already use
function toProject(project: ConvexProject): Project {
	const photos = project.photoUrls.flatMap((url, index) =>
		url ? [{ path: url, alt: `${project.title} - foto ${index + 1}` }] : []
	);
	return {
		title: project.title,
		slug: project.slug,
		image: project.coverUrl ?? photos[0]?.path ?? "",
		description: project.description
			.split(/\n\s*\n/)
			.map((paragraph) => paragraph.trim())
			.filter(Boolean),
		photos,
	};
}

// Without a Convex URL (e.g. a build with no env) the site falls back to the bundled projects
const hasConvex = Boolean(process.env.NEXT_PUBLIC_CONVEX_URL);

export const getProjects = unstable_cache(
	async (): Promise<Project[]> => {
		if (!hasConvex) return ProjectsData;
		const projects = await fetchQuery(api.projects.listPublished);
		return projects.map(toProject);
	},
	["projects:list"],
	{ tags: [PROJECTS_TAG], revalidate: REVALIDATE_SECONDS }
);

export const getProject = unstable_cache(
	async (slug: string): Promise<Project | null> => {
		if (!hasConvex)
			return ProjectsData.find((project) => project.slug === slug) ?? null;
		const project = await fetchQuery(api.projects.getPublishedBySlug, { slug });
		return project ? toProject(project) : null;
	},
	["projects:one"],
	{ tags: [PROJECTS_TAG], revalidate: REVALIDATE_SECONDS }
);
