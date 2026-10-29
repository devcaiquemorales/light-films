// Client Side
"use client";

// Imports
import { useEffect, useState } from "react";

// Imported Components
import Image from "next/image";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	type CarouselApi,
} from "@/components/ui/carousel";

// Types
import type { Project } from "@/lib/data/projects";

const arrow =
	"size-10 border-0 bg-white text-vidro shadow-md hover:bg-white hover:text-vidro disabled:hidden";

// Functional Component
export default function ProjectGallery({ photos }: { photos: Project["photos"] }) {
	// Variables
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(1);

	useEffect(() => {
		if (!api) return;
		const onSelect = () => setCurrent(api.selectedScrollSnap() + 1);
		api.on("select", onSelect);
		return () => {
			api.off("select", onSelect);
		};
	}, [api]);

	// Rendering
	return (
		<Carousel setApi={setApi} opts={{ loop: photos.length > 1 }} className="relative bg-vidro">
			<CarouselContent className="ml-0">
				{photos.map((photo) => (
					<CarouselItem key={photo.path} className="pl-0">
						<Image
							src={photo.path}
							alt={photo.alt}
							width={1200}
							height={800}
							sizes="(min-width: 768px) 900px, 100vw"
							className="aspect-[3/2] max-h-[55svh] w-full object-cover"
						/>
					</CarouselItem>
				))}
			</CarouselContent>
			{photos.length > 1 && (
				<>
					<CarouselPrevious className={`left-3 ${arrow}`} />
					<CarouselNext className={`right-3 ${arrow}`} />
					<p
						aria-live="polite"
						className="absolute right-3 bottom-3 rounded-full bg-vidro/80 px-3 py-1 text-sm font-medium text-white tabular-nums"
					>
						{current} de {photos.length}
					</p>
				</>
			)}
		</Carousel>
	);
}
