// Imported Components
import Section from "@/components/Section";
import Slider from "./Slider";

// Functional Component
export default function BeforeAfter() {
	// Rendering
	return (
		<Section
			id="antes-e-depois"
			tone="branco"
			title="Antes e depois"
			intro="Arraste para comparar o mesmo vidro sem película e com película."
		>
			{/* TODO(cliente): trocar por um par de fotos reais (antes/depois) de uma obra; hoje o "depois" é simulado */}
			<Slider
				before={{
					src: "/hero-bg.jpg",
					alt: "Prédio visto através de um vidro sem película",
				}}
				after={{
					src: "/hero-bg.jpg",
					alt: "Prédio visto através de um vidro com película fumê",
				}}
				afterOverlay="bg-[rgb(16_40_46/0.45)] backdrop-saturate-75"
			/>
			<p className="text-muted-foreground mt-4 text-sm">Imagem ilustrativa.</p>
		</Section>
	);
}
