// Imports
import Link from "next/link";
import FilmSwatch from "./FilmSwatch";

// Types
import type { Film } from "@/lib/data/films";

// Sample window + name + short text; the whole card links to the film's page
export default function FilmCard({
	film,
	headingAs: Heading = "h3",
}: {
	film: Film;
	headingAs?: "h2" | "h3";
}) {
	return (
		<Link
			href={`/peliculas/${film.slug}`}
			className="group focus-visible:ring-ring/50 flex flex-col gap-4 rounded-sm focus-visible:ring-3 focus-visible:outline-none"
		>
			<FilmSwatch
				film={film}
				sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
			/>
			<div className="flex flex-col gap-2">
				<Heading className="text-medium text-vidro link-grow self-start font-bold font-stretch-expanded">
					{film.name}
				</Heading>
				<p className="text-muted-foreground text-base text-pretty">
					{film.text}
				</p>
				<p className="text-vidro/70 text-sm">
					<span className="sr-only">Indicada para: </span>
					{film.usage.join(" · ")}
				</p>
			</div>
		</Link>
	);
}
