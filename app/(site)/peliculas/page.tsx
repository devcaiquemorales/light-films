// Imports
import { films } from "@/lib/data/films";
import { pageMetadata } from "@/lib/seo";

// Imported Components
import Section from "@/components/Section";
import FilmCard from "@/components/Film/FilmCard";

// SEO
export const metadata = pageMetadata({
	title: "Tipos de película para vidro em São Paulo",
	description:
		"Controle solar, fumê, espelhada, jateada, de segurança e decorativa: veja como cada película para vidro funciona e onde usar. Atendemos São Paulo e Grande São Paulo.",
	path: "/peliculas",
});

// Functional Component
export default function Peliculas() {
	// Rendering
	return (
		<main>
			<Section
				id="peliculas"
				headingAs="h1"
				title="Tipos de película para vidro"
				intro="Cada película resolve um problema diferente: calor, claridade, privacidade, segurança ou decoração. Escolha um tipo para ver como funciona, onde usar e o que perguntar antes de aplicar."
			>
				<ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
					{films.map((film) => (
						<li key={film.slug}>
							<FilmCard film={film} headingAs="h2" />
						</li>
					))}
				</ul>
			</Section>
		</main>
	);
}
