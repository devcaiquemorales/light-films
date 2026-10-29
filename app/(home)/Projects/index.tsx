// Client Side
"use client";

// Imports
import { useState } from "react";
import Autoplay from "embla-carousel-autoplay";

// Imported Components
import Section from "@/components/Section";
import ProjectDialog from "@/components/Project/ProjectDialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
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
	// Variables
	const [autoplay] = useState(() =>
		Autoplay({ delay: 2000, stopOnInteraction: false })
	);

	// Rendering
	return (
		<Section id="projetos" title="Nossos projetos">
			<div className="flex flex-col gap-10">
				<Carousel
					opts={{ loop: true, align: "start" }}
					plugins={[autoplay]}
					className="relative"
				>
					<CarouselContent className="-ml-[50px]">
						{ProjectsData.map((project) => (
							<CarouselItem
								key={project.slug}
								className="pl-[50px] min-[1080px]:basis-1/3"
							>
								<ProjectDialog project={project}>
									<button
										type="button"
										title={`Ver projeto ${project.title}`}
										className="block w-full cursor-pointer"
									>
										<Image
											className="aspect-square w-full object-cover"
											src={project.image}
											alt={project.title}
											width={1000}
											height={1000}
											sizes="(min-width: 1080px) 30vw, 80vw"
										/>
									</button>
								</ProjectDialog>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious
						aria-label="Slide anterior"
						className="-left-8 z-40 size-12 border-0 bg-white text-primary-400 drop-shadow-3xl"
					/>
					<CarouselNext
						aria-label="Próximo slide"
						className="-right-8 z-40 size-12 border-0 bg-white text-primary-400 drop-shadow-3xl"
					/>
				</Carousel>
				<Button asChild variant="brand-solid" size="brand" className="self-center">
					<Link href="/projetos" title="Ver todos os projetos">
						Ver todos projetos
					</Link>
				</Button>
			</div>
		</Section>
	);
}
