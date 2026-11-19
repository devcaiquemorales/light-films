// Imports
import Image from "next/image";
import { cn } from "@/lib/utils";
import { films } from "@/lib/data/films";

// Imported Components
import Section from "@/components/Section";

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
					<li key={film.name} className="flex flex-col gap-4">
						{/* Same sky photo behind every swatch so the films compare side by side */}
						<div className="border-vidro relative aspect-[3/2] overflow-hidden rounded-sm border-8">
							<Image
								src="/skyview.png"
								alt=""
								fill
								sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
								className="object-cover"
							/>
							<div className={cn("absolute inset-0", film.pane)} />
						</div>
						<div className="flex flex-col gap-2">
							<h3 className="text-medium text-vidro font-bold font-stretch-expanded">
								{film.name}
							</h3>
							<p className="text-muted-foreground text-base text-pretty">
								{film.text}
							</p>
							<p className="text-vidro/70 text-sm">
								<span className="sr-only">Indicada para: </span>
								{film.usage.join(" · ")}
							</p>
						</div>
					</li>
				))}
			</ul>
		</Section>
	);
}
