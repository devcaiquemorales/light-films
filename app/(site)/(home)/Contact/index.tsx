import Section from "@/components/Section";
import Form from "./Form";
import { quoteMessage, site, whatsappLink } from "@/lib/site";

// Functional Component
export default function Contact() {
	// Rendering
	return (
		<Section
			id="contato"
			tone="vidro"
			title="Peça um orçamento"
			intro="Conte onde é, quantos vidros são e, se puder, mande fotos. Respondemos pelo WhatsApp ou por e-mail."
		>
			<div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20">
				<dl className="flex flex-col gap-8 text-base">
					<div>
						<dt className="text-sm text-white/60">WhatsApp</dt>
						<dd className="mt-1">
							<a
								href={whatsappLink(quoteMessage)}
								target="_blank"
								rel="noopener noreferrer"
								className="text-ceu-claro text-lg font-bold font-stretch-expanded underline-offset-8 hover:underline"
							>
								(11) 98169-6933
							</a>
						</dd>
					</div>
					<div>
						<dt className="text-sm text-white/60">Telefone</dt>
						<dd className="mt-1">
							<a
								href={site.phoneHref}
								className="text-lg font-bold text-white font-stretch-expanded underline-offset-8 hover:underline"
							>
								{site.phone}
							</a>
						</dd>
					</div>
					<div>
						<dt className="text-sm text-white/60">Atendimento</dt>
						<dd className="mt-1 text-white/85">São Paulo e região</dd>
					</div>
				</dl>
				<Form />
			</div>
		</Section>
	);
}
