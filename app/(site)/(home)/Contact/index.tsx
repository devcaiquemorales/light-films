import Section from "@/components/Section";
import WhatsAppComposer from "./WhatsAppComposer";
import { quoteMessage, site, whatsappLink } from "@/lib/site";

// Functional Component
export default function Contact() {
	// Rendering
	return (
		<Section
			id="contato"
			tone="vidro"
			title="Peça um orçamento"
			intro="Marque as opções e a mensagem chega pronta no WhatsApp. A gente responde rápido e marca a visita."
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
								{site.phone}
							</a>
						</dd>
					</div>
					<div>
						<dt className="text-sm text-white/60">Telefone</dt>
						<dd className="mt-1 flex flex-col gap-1">
							<a
								href={site.phoneHref}
								className="text-lg font-bold text-white font-stretch-expanded underline-offset-8 hover:underline"
							>
								{site.phone}
							</a>
							<a
								href={site.landlineHref}
								className="text-base text-white/85 underline-offset-8 hover:text-white hover:underline"
							>
								{site.landline} <span className="text-white/60">(fixo)</span>
							</a>
						</dd>
					</div>
					<div>
						<dt className="text-sm text-white/60">E-mail</dt>
						<dd className="mt-1">
							<a
								href={`mailto:${site.email}`}
								className="text-base text-white/85 underline-offset-8 hover:text-white hover:underline"
							>
								{site.email}
							</a>
						</dd>
					</div>
					<div>
						<dt className="text-sm text-white/60">Atendimento</dt>
						<dd className="mt-1 text-white/85">São Paulo e Grande São Paulo</dd>
					</div>
				</dl>
				<WhatsAppComposer />
			</div>
		</Section>
	);
}
