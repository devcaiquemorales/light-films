// Imported Components
import Section from "@/components/Section";
import Item from "./Item";

// Functional Component
export default function Occupation() {
	// Rendering
	return (
		<Section
			id="atuacao"
			tone="branco"
			title="Onde aplicamos"
			intro="Cada lugar pede uma película diferente. A gente visita, mede e indica a certa para o seu caso."
		>
			<ul className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
				<Item
					title="Residências"
					img="/residencias.png"
					text="Quartos e salas mais frescos, sem precisar fechar a cortina o dia todo."
				/>
				<Item
					title="Escritórios"
					img="/escritorios.png"
					text="Menos reflexo nas telas e mais conforto para quem trabalha perto da janela."
				/>
				<Item
					title="Comércios"
					img="/comercios.png"
					text="Vitrine protegida do sol, sem desbotar os produtos expostos."
				/>
				<Item
					title="Prédios"
					img="/predios.png"
					text="Fachada com acabamento uniforme e ambientes internos menos quentes."
				/>
			</ul>
		</Section>
	);
}
