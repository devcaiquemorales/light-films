// Imported Components
import Link from "next/link";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Functional Component
export default function NotFound() {
	// Rendering
	return (
		<>
			<Header />
			<main className="flex flex-1 flex-col">
				<Section
					title="Página não encontrada"
					id="nao-encontrada"
					headingAs="h1"
					intro="O endereço pode ter mudado ou a página foi removida."
					className="flex flex-1 flex-col justify-center [&>div]:w-full"
				>
					<div className="flex flex-wrap items-center gap-x-6 gap-y-4">
						<Button asChild variant="brand" size="brand">
							<Link href="/">Voltar para o início</Link>
						</Button>
						<Link
							href="/projetos"
							className="link-grow text-vidro text-base font-semibold"
						>
							Ver projetos
						</Link>
					</div>
				</Section>
			</main>
			<Footer />
		</>
	);
}
