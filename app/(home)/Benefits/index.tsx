// Imports
import { EyeOffIcon, ShieldCheckIcon, SunIcon, ThermometerSunIcon } from "lucide-react";

// Imported Components
import Title from "@/components/Title";

const benefits = [
	{
		icon: ThermometerSunIcon,
		title: "Ambiente mais fresco",
		text: "A película barra boa parte do calor do sol antes que ele entre, e o ar-condicionado trabalha menos.",
	},
	{
		icon: SunIcon,
		title: "Proteção contra raios UV",
		text: "Móveis, pisos e mercadorias desbotam menos, e quem fica perto da janela também se protege.",
	},
	{
		icon: EyeOffIcon,
		title: "Privacidade na medida",
		text: "Do quase transparente ao espelhado: você escolhe quanto do lado de dentro quer mostrar.",
	},
	{
		icon: ShieldCheckIcon,
		title: "Mais segurança",
		text: "Com película de segurança, se o vidro quebrar, os estilhaços ficam presos no lugar.",
	},
];

// Functional Component
export default function Benefits() {
	// Rendering
	return (
		<section id="beneficios" className="scroll-mt-20 bg-vidro px-5 py-20 text-white md:px-10 md:py-28">
			<div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
				{/* Title stays in view while the list scrolls past on large screens */}
				<div className="lg:sticky lg:top-32 lg:self-start">
					<Title
						inverted
						text="O que muda com a película"
						intro="Um filme fino aplicado no vidro que você já tem. Sem obra, sem trocar janela."
					/>
				</div>
				<ul className="flex flex-col">
					{benefits.map(({ icon: Icon, title, text }) => (
						<li
							key={title}
							className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 border-t border-white/15 py-8 first:border-t-0 first:pt-0 md:gap-x-8"
						>
							<span className="flex size-12 items-center justify-center rounded-full bg-sol/15 text-sol md:size-14">
								<Icon aria-hidden className="size-6 md:size-7" strokeWidth={1.75} />
							</span>
							<div>
								<h3 className="text-lg font-bold font-stretch-expanded text-white">{title}</h3>
								<p className="mt-2 max-w-lg text-base text-white/70 text-pretty">{text}</p>
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
