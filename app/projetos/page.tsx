// Imports
import type { Metadata } from "next";
import Image from "next/image";

// Imported Components
import Section from "@/components/Section";
import ProjectDialog from "@/components/Project/ProjectDialog";
import { Card, CardContent } from "@/components/ui/card";

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
			<Section title="Projetos" id="projetos">
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
					{ProjectsData.map((project) => (
						<ProjectDialog key={project.slug} project={project}>
							<button
								type="button"
								className="group cursor-pointer text-left"
								title={`Ver projeto ${project.title}`}
							>
								<Card className="gap-0 py-0">
									<div className="relative overflow-hidden">
										<Image
											src={project.image}
											alt={project.title}
											width={500}
											height={500}
											className="h-52 object-cover duration-300 group-hover:scale-105"
										/>
										<span className="absolute inset-0 flex items-center justify-center bg-black/50 text-base text-white opacity-0 duration-300 group-hover:opacity-100">
											Ver projeto
										</span>
									</div>
									<CardContent className="bg-primary-400 py-4 text-center">
										<h2 className="text-sm font-medium text-white">
											{project.title}
										</h2>
									</CardContent>
								</Card>
							</button>
						</ProjectDialog>
					))}
				</div>
			</Section>
		</main>
	);
}
