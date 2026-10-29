// Client Side
"use client";

// Imports
import { useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Types
type SliderProps = {
	before: { src: string; alt: string };
	after: { src: string; alt: string };
	// Simulates the film over the "after" photo while there's no real photo for it
	afterOverlay?: string;
};

// Functional Component
export default function Slider({ before, after, afterOverlay }: SliderProps) {
	// Variables
	const [position, setPosition] = useState(50);

	// Rendering
	return (
		<div className="relative aspect-[4/3] overflow-hidden rounded-sm select-none md:aspect-[16/9]">
			<Image
				src={before.src}
				alt={before.alt}
				fill
				sizes="(min-width: 1280px) 1200px, 100vw"
				className="object-cover"
			/>

			{/* "After" photo, clipped from the handle to the right edge */}
			<div
				className="absolute inset-0"
				style={{ clipPath: `inset(0 0 0 ${position}%)` }}
			>
				<Image
					src={after.src}
					alt={after.alt}
					fill
					sizes="(min-width: 1280px) 1200px, 100vw"
					className="object-cover"
				/>
				{afterOverlay && (
					<div className={cn("absolute inset-0", afterOverlay)} />
				)}
			</div>

			<span className="bg-vidro/80 absolute top-4 left-4 rounded-full px-3 py-1 text-sm font-semibold text-white">
				Antes
			</span>
			<span className="bg-ceu absolute top-4 right-4 rounded-full px-3 py-1 text-sm font-semibold text-white">
				Depois
			</span>

			{/* Handle */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_12px_rgb(0_0_0/0.4)]"
				style={{ left: `${position}%` }}
			>
				<span className="text-vidro absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_4px_16px_rgb(0_0_0/0.35)]">
					<ChevronLeftIcon className="-mr-1 size-5" strokeWidth={2.5} />
					<ChevronRightIcon className="-ml-1 size-5" strokeWidth={2.5} />
				</span>
			</div>

			{/* Invisible range input on top: drag, touch and arrow keys for free */}
			<input
				type="range"
				min={0}
				max={100}
				value={position}
				onChange={(e) => setPosition(Number(e.target.value))}
				aria-label="Comparar antes e depois"
				aria-valuetext={`${position}% antes`}
				className="peer absolute inset-0 size-full cursor-ew-resize opacity-0"
			/>
			<div className="peer-focus-visible:ring-ring/60 pointer-events-none absolute inset-0 rounded-sm peer-focus-visible:ring-4 peer-focus-visible:ring-inset" />
		</div>
	);
}
