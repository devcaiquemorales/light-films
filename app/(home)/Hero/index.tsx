// Imported Components
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TintSimulator from "./TintSimulator";
import { quoteMessage, whatsappLink } from "@/lib/site";

// Functional Component
export default function Hero() {
	// Rendering
	return (
		<section id="inicio" className="px-5 pt-10 pb-20 md:px-10 md:pt-16 md:pb-28">
			<div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-[1.1fr_1fr] md:gap-16">
				<div className="flex flex-col gap-7">
					<h1 className="text-[clamp(2.4rem,4vw+1rem,4.4rem)] leading-[0.98] font-black font-stretch-expanded text-vidro">
						Menos calor. Mais privacidade. A&nbsp;mesma vista.
					</h1>
					<p className="max-w-xl text-medium text-muted-foreground text-pretty">
						A Light Films aplica película nos vidros de casas, escritórios, lojas e prédios em
						São Paulo. Escolha um tom na janela e veja a diferença.
					</p>
					<div className="flex flex-wrap items-center gap-3">
						<Button asChild variant="brand" size="brand">
							<a href={whatsappLink(quoteMessage)} target="_blank" rel="noopener noreferrer">
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
