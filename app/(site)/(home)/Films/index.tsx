// Imports
import Link from "next/link";
import { films } from "@/lib/data/films";

// Imported Components
import Section from "@/components/Section";
import FilmCard from "@/components/Film/FilmCard";

// Functional Component
export default function Films() {
	// Rendering
	return (
		<Section
			id="peliculas"
			title="Tipos de película para vidro"
			intro="Não sabe qual escolher? Na visita a gente leva amostras e aplica um pedaço no seu vidro para você ver."
		>
			<ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
				{films.map((film) => (
					<li key={film.slug}>
						<FilmCard film={film} />
					</li>
				))}
			</ul>
			<Link
				href="/peliculas"
				className="link-grow text-vidro mt-12 inline-block text-sm font-semibold"
			>
				Ver todos os tipos em detalhe
			</Link>
		</Section>
	);
}
