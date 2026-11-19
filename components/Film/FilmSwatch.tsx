// Imports
import Image from "next/image";
import { cn } from "@/lib/utils";

// Types
import type { Film } from "@/lib/data/films";

// The same sky photo behind every film, framed like a window, so the films
// compare side by side. Mirror films get one reflection across the glass.
export default function FilmSwatch({
	film,
	sizes,
	priority = false,
	className,
}: {
	film: Film;
	sizes: string;
	priority?: boolean;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"border-vidro bg-vidro relative aspect-[3/2] overflow-hidden rounded-sm border-8",
				className
			)}
		>
			<Image
				src="/skyview.png"
				alt=""
				fill
				priority={priority}
				sizes={sizes}
				className="object-cover"
			/>
			<div className={cn("absolute inset-0", film.pane)} />
			{film.sheen && (
				<div
					aria-hidden
					className="absolute inset-0 bg-[linear-gradient(180deg,rgb(220_232_240/0.5),rgb(220_232_240/0.08)_50%,rgb(220_232_240/0.2)),linear-gradient(112deg,transparent_20%,rgb(255_255_255/0.12)_26%,rgb(255_255_255/0.6)_33%,rgb(255_255_255/0.18)_39%,transparent_45%,transparent_58%,rgb(255_255_255/0.32)_62%,transparent_67%)] mix-blend-screen"
				/>
			)}
		</div>
	);
}
