// Imports
import type { Metadata } from "next";

// Imported Components
import Section from "@/components/Section";
import ProjectCard from "@/components/Project/ProjectCard";

// Data
import { ProjectsData } from "@/lib/data/projects";

// SEO
export const metadata: Metadata = {
	title: "Projetos",
	description:
		"Conheça os projetos de aplicação de película arquitetônica realizados pela Light Films.",
	alternates: { canonical: "/projetos" },
};

// Functional Component
export default function Projetos() {
	// Rendering
	return (
		<main>
			<Section
				title="Projetos"
				id="projetos"
				intro="Alguns dos lugares onde aplicamos película. Toque em um projeto para ver as fotos e o que foi feito."
			>
				<ul className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
					{ProjectsData.map((project) => (
						<li key={project.slug}>
							<ProjectCard
								project={project}
								sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
							/>
						</li>
					))}
				</ul>
			</Section>
		</main>
	);
}
