// Imported Components
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TintSimulator from "./TintSimulator";
import { quoteMessage, whatsappLink } from "@/lib/site";

// Functional Component
export default function Hero() {
	// Rendering
	return (
		<section
			id="inicio"
			className="relative isolate overflow-hidden px-5 pt-10 pb-20 md:px-10 md:pt-16 md:pb-28"
		>
			{/* Sunlight falling through glass: soft diagonal beams behind the content */}
			<div
				aria-hidden
				className="absolute inset-0 -z-10 bg-[linear-gradient(115deg,transparent_0_38%,rgb(42_116_166/0.07)_38%_46%,transparent_46%_52%,rgb(42_116_166/0.05)_52%_56%,transparent_56%)]"
			/>
			<div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-[1.25fr_1fr] md:gap-16">
				<div className="@container flex flex-col gap-7">
					{/* The h1 carries the search terms; the big slogan below is visual */}
					<h1 className="text-vidro/70 flex items-center gap-3 text-sm font-semibold tracking-[0.1em] uppercase md:tracking-[0.14em]">
						<span aria-hidden className="bg-ceu h-0.5 w-8 shrink-0" />
						Película para vidros em São Paulo
					</h1>
					{/* One sentence per line; size follows the column width so no line wraps */}
					<p className="text-vidro flex flex-col items-start text-[min(var(--hero-fit),4.4rem)] leading-[0.98] font-black whitespace-nowrap font-stretch-semi-expanded [--hero-fit:9.5cqi] sm:font-stretch-expanded sm:[--hero-fit:8.7cqi]">
						<span>
							Menos{" "}
							<span className="-mx-1 bg-[linear-gradient(transparent_62%,var(--color-ceu-claro)_62%_92%,transparent_92%)] px-1">
								calor
							</span>
							.
						</span>
						<span>Mais privacidade.</span>
						<span>A mesma vista.</span>
					</p>
					<p className="text-medium text-muted-foreground max-w-xl text-pretty">
						A Light Films aplica película nos vidros de casas, escritórios,
						lojas e prédios em São Paulo. Escolha um tom na janela e veja a
						diferença.
					</p>
					<div className="flex flex-wrap items-center gap-3">
						<Button asChild variant="brand" size="brand">
							<a
								href={whatsappLink(quoteMessage)}
								target="_blank"
								rel="noopener noreferrer"
							>
								Pedir orçamento
							</a>
						</Button>
						<Button asChild variant="ghost" size="brand" className="text-vidro">
							<Link href="#projetos">Ver projetos</Link>
						</Button>
					</div>
				</div>
				<TintSimulator />
			</div>
		</section>
	);
}
