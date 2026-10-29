// Client Side
"use client";

// Imported Components
import Section from "@/components/Section";
import ProjectCard from "@/components/Project/ProjectCard";
import Link from "next/link";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

// Data
import { ProjectsData } from "@/lib/data/projects";

// Functional Component
export default function Projects() {
	// Rendering
	return (
		<Section
			id="projetos"
			title="Projetos recentes"
			intro="Toque em um projeto para ver as fotos e o que foi feito."
		>
			<Carousel opts={{ align: "start" }} className="flex flex-col gap-8">
				<CarouselContent className="-ml-6">
					{ProjectsData.map((project) => (
						<CarouselItem key={project.slug} className="basis-[85%] pl-6 sm:basis-1/2 lg:basis-1/3">
							<ProjectCard
								project={project}
								sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 85vw"
							/>
						</CarouselItem>
					))}
				</CarouselContent>
				<div className="flex items-center gap-6">
					<div className="flex gap-2">
						<CarouselPrevious className="static size-11 translate-y-0 rounded-full border-vidro bg-vidro text-white hover:bg-vidro-2 hover:text-white disabled:border-vidro/15 disabled:bg-transparent disabled:text-vidro/30 disabled:opacity-100" />
						<CarouselNext className="static size-11 translate-y-0 rounded-full border-vidro bg-vidro text-white hover:bg-vidro-2 hover:text-white disabled:border-vidro/15 disabled:bg-transparent disabled:text-vidro/30 disabled:opacity-100" />
					</div>
					<Link
						href="/projetos"
						className="text-base font-semibold text-vidro underline underline-offset-6 hover:text-vidro-2"
					>
						Ver todos os projetos
					</Link>
				</div>
			</Carousel>
		</Section>
	);
}
