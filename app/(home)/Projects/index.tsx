// Client Side
"use client";

// Imports
import { useState } from "react";
import Autoplay from "embla-carousel-autoplay";

// Imported Components
import Section from "@/components/Section";
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
		<Section id="projects" title="Nossos projetos">
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
								<Link
									href={`/projetos/${project.slug}`}
									title={`Ver projeto ${project.title}`}
								>
									<Image
										className="h-auto w-full object-cover"
										src={project.image}
										alt={project.title}
										width={1000}
										height={1000}
									/>
								</Link>
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
				<div className="self-center">
					<Link
						href="/projetos"
						title="Ver todos os projetos"
						className="block w-max rounded-[1rem] bg-primary-400 hover:bg-white text-white hover:text-primary-400  border-2 border-solid border-primary-400 duration-300"
					>
						<p className="text-sm font-bold uppercase p-[1.125em_5.125em]">
							Ver todos projetos
						</p>
					</Link>
				</div>
			</div>
		</Section>
	);
}
