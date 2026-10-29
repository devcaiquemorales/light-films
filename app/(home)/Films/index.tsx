// Imports
import Image from "next/image";
import { cn } from "@/lib/utils";

// Imported Components
import Section from "@/components/Section";

// TODO(cliente): confirmar quais linhas de película a Light Films trabalha
const films = [
	{
		name: "Controle solar",
		text: "Barra boa parte do calor e dos raios UV sem mudar a aparência do vidro.",
		usage: ["Salas", "Escritórios"],
		pane: "bg-[rgb(28_70_80/0.14)]",
	},
	{
		name: "Fumê",
		text: "Escurece o vidro na medida certa e tira o reflexo das telas.",
		usage: ["Quartos", "Escritórios"],
		pane: "bg-[rgb(16_40_46/0.45)] backdrop-brightness-90 backdrop-saturate-75",
	},
	{
		name: "Espelhada",
		text: "Reflete o sol e dá privacidade de dia, com fachada uniforme por fora.",
		usage: ["Fachadas", "Prédios"],
		pane: "bg-[linear-gradient(135deg,rgb(226_236_239/0.85),rgb(120_150_160/0.65)_45%,rgb(232_240_242/0.8)_62%,rgb(140_165_172/0.7))] backdrop-brightness-75",
	},
	{
		name: "Jateada",
		text: "Deixa o vidro fosco: passa luz, mas não dá para ver através.",
		usage: ["Banheiros", "Divisórias"],
		pane: "bg-white/45 backdrop-blur-md",
	},
	{
		name: "Segurança",
		text: "Película mais grossa que segura os estilhaços se o vidro quebrar.",
		usage: ["Vitrines", "Portas"],
		pane: "bg-[rgb(200_220_230/0.12)]",
	},
	{
		name: "Decorativa",
		text: "Faixas, recortes e desenhos para identificar ambientes e marcar vidros.",
		usage: ["Lojas", "Recepções"],
		pane: "bg-[repeating-linear-gradient(0deg,transparent_0_18px,rgb(255_255_255/0.55)_18px_26px)] backdrop-blur-[2px]",
	},
];

// Functional Component
export default function Films() {
	// Rendering
	return (
		<Section
			id="peliculas"
			title="Tipos de película"
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
