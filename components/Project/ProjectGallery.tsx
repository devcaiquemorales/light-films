// Client Side
"use client";

// Imports
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

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
export default function ProjectGallery({
	photos,
	variant = "modal",
}: {
	photos: Project["photos"];
	// "page": taller photos plus a thumbnail strip to jump between them
	variant?: "modal" | "page";
}) {
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

	const isPage = variant === "page";

	// Rendering
	const carousel = (
		<Carousel
			setApi={setApi}
			opts={{ loop: photos.length > 1 }}
			className={cn(
				"bg-vidro relative",
				isPage && "overflow-hidden rounded-sm"
			)}
		>
			<CarouselContent className="ml-0">
				{photos.map((photo, index) => (
					<CarouselItem key={photo.path} className="pl-0">
						<Image
							src={photo.path}
							alt={photo.alt}
							priority={isPage && index === 0}
							width={1200}
							height={800}
							sizes={
								isPage
									? "(min-width: 1280px) 1200px, 100vw"
									: "(min-width: 768px) 900px, 100vw"
							}
							className={cn(
								"w-full object-cover",
								isPage
									? "aspect-[3/2] max-h-[75svh] md:aspect-[16/9]"
									: "aspect-[3/2] max-h-[55svh]"
							)}
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
						className="bg-vidro/80 absolute right-3 bottom-3 rounded-full px-3 py-1 text-sm font-medium text-white tabular-nums"
					>
						{current} de {photos.length}
					</p>
				</>
			)}
		</Carousel>
	);

	if (!isPage || photos.length < 2) return carousel;

	return (
		<div className="flex flex-col gap-3">
			{carousel}
			<ul className="-m-1 flex gap-3 overflow-x-auto p-1">
				{photos.map((photo, index) => (
					<li key={photo.path} className="shrink-0">
						<button
							type="button"
							onClick={() => api?.scrollTo(index)}
							aria-label={`Ver foto ${index + 1}`}
							aria-current={current === index + 1 ? "true" : undefined}
							className="ring-ceu block cursor-pointer overflow-hidden rounded-sm opacity-50 transition-opacity hover:opacity-100 focus-visible:ring-3 focus-visible:outline-none aria-[current]:opacity-100 aria-[current]:ring-3"
						>
							<Image
								src={photo.path}
								alt=""
								width={160}
								height={107}
								sizes="160px"
								className="aspect-[3/2] w-24 object-cover md:w-32"
							/>
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
