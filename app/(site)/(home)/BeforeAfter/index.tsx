// Imported Components
import Title from "@/components/Title";
import Slider from "./Slider";

// Functional Component
export default function BeforeAfter() {
	// Rendering
	return (
		<section
			id="antes-e-depois"
			className="scroll-mt-20 bg-white px-5 py-20 md:px-10 md:py-28"
		>
			{/* Two columns keep the photo at a size the source image can fill sharply */}
			<div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
				<div className="flex flex-col">
					<Title
						text="Antes e depois"
						intro="Arraste para comparar o mesmo vidro sem película e com película: menos brilho, menos calor e a vista continua lá."
					/>
					<p className="text-muted-foreground -mt-6 text-sm md:-mt-10">
						Imagem ilustrativa.
					</p>
				</div>
				{/* TODO(cliente): trocar por um par de fotos reais (antes/depois) de uma obra; hoje o "depois" é simulado */}
				<Slider
					before={{
						src: "/skyview.png",
						alt: "Prédios de São Paulo vistos através de um vidro sem película",
					}}
					after={{
						src: "/skyview.png",
						alt: "Prédios de São Paulo vistos através de um vidro com película fumê",
					}}
					afterOverlay="bg-[rgb(16_40_46/0.45)] backdrop-saturate-75"
				/>
			</div>
		</section>
	);
}
