// Imported Components
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Functional Component
export default function Hero() {
	// Rendering
	return (
		<section
			id="inicio"
			className="relative isolate -mt-20 flex min-h-svh items-center justify-center overflow-hidden"
		>
			<Image
				src="/hero-bg.jpg"
				alt=""
				fill
				priority
				sizes="100vw"
				className="-z-10 object-cover object-center"
			/>
			<div className="flex max-w-[90%] flex-col items-center gap-8 text-center">
				<div className="flex flex-col gap-3">
					<h1 className="max-w-[62.5rem] text-xl font-bold text-white">
						Proteção e Estilo em um lugar: Película Arquitetônica de Qualidade
					</h1>
					<p className="max-w-[62.5rem] text-medium text-white">
						Controle a Luz, a Temperatura e a Privacidade sem abrir mão do
						Design
					</p>
				</div>
				<Button asChild variant="brand" size="brand">
					<Link href="#atuacao">Ver mais</Link>
				</Button>
			</div>
		</section>
	);
}
