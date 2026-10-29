// Imports
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";

// Imported Components
import Section from "@/components/Section";
import ProjectActions from "@/components/Project/ProjectActions";

// Data
import { ProjectsData } from "@/lib/data/projects";

// Types
type Props = { params: Promise<{ id: string }> };

// Only the known projects exist; anything else is a 404
export const dynamicParams = false;

export function generateStaticParams() {
	return ProjectsData.map((project) => ({ id: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params;
	const project = ProjectsData.find((project) => project.slug === id);
	if (!project) return {};

	return {
		title: project.title,
		description: project.description[0],
		alternates: { canonical: `/projetos/${project.slug}` },
		openGraph: { images: [project.image] },
	};
}

// Functional Component
export default async function Page({ params }: Props) {
	// Variables
	const { id } = await params;
	const project = ProjectsData.find((project) => project.slug === id);

	if (!project) notFound();

	// Rendering
	return (
		<main>
			<Section title={project.title} id={project.slug}>
				<div className="mb-12 flex flex-col gap-4">
					{project.description.map((paragraph) => (
						<p key={paragraph} className="max-w-3xl text-base text-primary-400">
							{paragraph}
						</p>
					))}
				</div>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
					{project.photos.map((photo) => (
						<Image
							key={photo.path}
							className="aspect-square w-full rounded-lg object-cover"
							src={photo.path}
							alt={photo.alt}
							width={400}
							height={400}
						/>
					))}
				</div>
				<div className="mt-12">
					<ProjectActions project={project} />
				</div>
			</Section>
		</main>
	);
}
