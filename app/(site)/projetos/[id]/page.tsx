// Imports
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

// Imported Components
import ProjectActions from "@/components/Project/ProjectActions";
import ProjectCard from "@/components/Project/ProjectCard";
import ProjectGallery from "@/components/Project/ProjectGallery";

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

	const others = ProjectsData.filter(
		(item) => item.slug !== project.slug
	).slice(0, 3);

	// Rendering
	return (
		<main>
			<article className="px-5 pt-10 pb-20 md:px-10 md:pt-14 md:pb-28">
				<div className="mx-auto flex max-w-7xl flex-col gap-10">
					<Link
						href="/projetos"
						className="link-grow text-vidro/70 hover:text-vidro inline-flex items-center gap-2 self-start text-sm font-semibold"
					>
						<ArrowLeftIcon aria-hidden className="size-4" />
						Todos os projetos
					</Link>

					<header className="flex max-w-3xl flex-col gap-5">
						<h1 className="text-vidro text-xl font-bold text-balance font-stretch-expanded">
							{project.title}
						</h1>
						<div className="text-muted-foreground text-medium flex flex-col gap-3 text-pretty">
							{project.description.map((paragraph) => (
								<p key={paragraph}>{paragraph}</p>
							))}
						</div>
					</header>

					<ProjectGallery photos={project.photos} variant="page" />

					<div className="bg-vidro flex flex-col gap-6 rounded-sm p-8 text-white md:flex-row md:items-center md:justify-between md:p-10">
						<p className="text-medium max-w-xl font-bold text-pretty font-stretch-expanded">
							Quer um resultado parecido no seu vidro?
						</p>
						<ProjectActions project={project} />
					</div>
				</div>
			</article>

			{others.length > 0 && (
				<section
					aria-labelledby="outros-projetos"
					className="bg-white px-5 py-20 md:px-10 md:py-24"
				>
					<div className="mx-auto max-w-7xl">
						<h2
							id="outros-projetos"
							className="text-vidro mb-10 text-lg font-bold font-stretch-expanded"
						>
							Outros projetos
						</h2>
						<ul className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
							{others.map((item) => (
								<li key={item.slug}>
									<ProjectCard
										link
										project={item}
										sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
									/>
								</li>
							))}
						</ul>
					</div>
				</section>
			)}
		</main>
	);
}
