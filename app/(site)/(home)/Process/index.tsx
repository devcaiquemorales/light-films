// Imported Components
import Section from "@/components/Section";

// TODO(cliente): confirmar as etapas reais do atendimento
const steps = [
	{
		title: "Você chama",
		text: "Mande uma mensagem pelo WhatsApp, com fotos e medidas aproximadas dos vidros.",
	},
	{
		title: "Visita e medição",
		text: "Vamos até o local, medimos os vidros e mostramos amostras das películas.",
	},
	{
		title: "Orçamento",
		text: "Você recebe o valor fechado e o prazo de aplicação.",
	},
	{
		title: "Aplicação",
		text: "Aplicamos com o ambiente protegido e entregamos tudo limpo.",
	},
];

// Functional Component
export default function Process() {
	// Rendering
	return (
		<Section id="como-funciona" tone="branco" title="Como funciona">
			<ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
				{steps.map((step, index) => (
					<li key={step.title} className="flex flex-col gap-3">
						<span
							aria-hidden
							className="text-reflexo text-2xl leading-none font-black font-stretch-expanded"
						>
							{index + 1}
						</span>
						<h3 className="text-medium text-vidro font-bold font-stretch-expanded">
							{step.title}
						</h3>
						<p className="text-muted-foreground text-base text-pretty">
							{step.text}
						</p>
					</li>
				))}
			</ol>
		</Section>
	);
}
