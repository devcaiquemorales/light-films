// Imports
import { PlusIcon } from "lucide-react";
import { quoteMessage, whatsappLink } from "@/lib/site";

// Imported Components
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

// TODO(cliente): revisar respostas; prazo de aplicação e durabilidade ainda em lorem ipsum
const questions = [
	{
		question: "A película escurece muito o ambiente?",
		answer:
			"Depende do tom. As películas claras quase não mudam a luz; as fumê e escuras deixam o ambiente mais sombreado. Na visita você vê as amostras no próprio vidro antes de decidir.",
	},
	{
		question: "Dá para ver de dentro para fora?",
		answer:
			"Sim. Durante o dia, quem está dentro enxerga normalmente e quem está fora vê pouco ou nada, principalmente com películas fumê, escuras e espelhadas. À noite, com a luz acesa por dentro, o efeito se inverte.",
	},
	{
		question: "Quanto tempo leva a aplicação?",
		answer:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	},
	{
		question: "Quanto tempo dura a película?",
		answer:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
	},
	{
		question: "Como limpar o vidro depois?",
		answer:
			"Espere alguns dias antes da primeira limpeza. Depois, use pano macio com água e sabão neutro. Evite esponjas ásperas e produtos com amônia.",
	},
	{
		question: "Preciso tirar móveis ou cortinas?",
		answer:
			"Só o que estiver encostado no vidro. A gente protege o chão e os móveis próximos e deixa tudo limpo no final.",
	},
];

// Functional Component
export default function Faq() {
	// Rendering
	return (
		<section
			id="duvidas"
			className="scroll-mt-20 bg-white px-5 py-20 md:px-10 md:py-28"
		>
			<div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
				<div className="flex flex-col lg:sticky lg:top-28 lg:self-start">
					<Title
						text="Dúvidas frequentes"
						intro="O que mais perguntam na visita. Se a sua não estiver aqui, é só chamar."
					/>
					<Button
						asChild
						variant="brand"
						size="brand"
						className="-mt-4 self-start md:-mt-8"
					>
						<a
							href={whatsappLink(quoteMessage)}
							target="_blank"
							rel="noopener noreferrer"
						>
							Tirar dúvida no WhatsApp
						</a>
					</Button>
				</div>

				<Accordion type="single" collapsible className="gap-2">
					{questions.map((item, index) => (
						<AccordionItem
							key={item.question}
							value={item.question}
							className="bg-nevoa/60 data-[state=open]:bg-nevoa rounded-sm border-0 transition-colors not-last:border-b-0"
						>
							<AccordionTrigger className="text-vidro md:text-medium items-center gap-3 px-5 md:gap-5 py-5 text-left text-base font-semibold hover:no-underline md:px-7 md:py-6 [&>[data-slot=accordion-trigger-icon]]:hidden">
								<span
									aria-hidden
									className="text-ceu w-7 shrink-0 text-sm font-bold tabular-nums"
								>
									{String(index + 1).padStart(2, "0")}
								</span>
								<span className="flex-1">{item.question}</span>
								<span className="group-aria-expanded/accordion-trigger:bg-vidro text-vidro flex size-9 shrink-0 items-center justify-center rounded-full bg-white transition-colors group-aria-expanded/accordion-trigger:text-white">
									<PlusIcon
										aria-hidden
										className="size-4 transition-transform duration-300 group-aria-expanded/accordion-trigger:rotate-45 motion-reduce:transition-none"
										strokeWidth={2.5}
									/>
								</span>
							</AccordionTrigger>
							<AccordionContent className="text-muted-foreground max-w-2xl pr-5 pb-6 pl-15 text-base text-pretty md:pr-7 md:pl-19">
								{item.answer}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
}
