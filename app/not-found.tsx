// Imported Components
import Link from "next/link";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";

// Functional Component
export default function NotFound() {
	// Rendering
	return (
		<main>
			<Section title="Página não encontrada" id="nao-encontrada">
				<div className="flex flex-col items-center gap-8 text-center">
					<p className="text-base text-primary-400">
						A página que você procura não existe ou foi removida.
					</p>
					<Button asChild variant="brand-solid" size="brand">
						<Link href="/">Voltar para o início</Link>
					</Button>
				</div>
			</Section>
		</main>
	);
}
