// Client Side
"use client";

// Imported Components
import Image from "next/image";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

// Types
import type { Project } from "@/lib/data/projects";

// Functional Component
export default function ProjectGallery({ photos }: { photos: Project["photos"] }) {
	// Rendering
	return (
		<Carousel opts={{ loop: true }} className="relative">
			<CarouselContent>
				{photos.map((photo) => (
					<CarouselItem key={photo.path}>
						<Image
							src={photo.path}
							alt={photo.alt}
							width={900}
							height={600}
							sizes="(min-width: 768px) 720px, 90vw"
							className="aspect-video max-h-[50svh] rounded-lg object-cover"
						/>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className="left-2 border-0 bg-white/90 text-primary-400" />
			<CarouselNext className="right-2 border-0 bg-white/90 text-primary-400" />
		</Carousel>
	);
}
