// Imports
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { site } from "@/lib/site";

// SEO
export const metadata = pageMetadata({
	title: "Política de privacidade",
	description:
		"Como a Light Films coleta, usa e protege os dados de quem visita o site.",
	path: "/politica-de-privacidade",
});

const updatedAt = "14 de novembro de 2026";

// Functional Component
export default function PrivacyPolicy() {
	// Rendering
	return (
		<main className="px-5 pt-10 pb-20 md:px-10 md:pt-14 md:pb-28">
			<article className="mx-auto flex max-w-3xl flex-col gap-10">
				<header className="flex flex-col gap-4">
					<h1 className="text-vidro text-xl font-bold text-balance font-stretch-expanded">
						Política de privacidade
					</h1>
					<p className="text-muted-foreground/70 -mt-1 text-sm italic">
						Última atualização: {updatedAt}
					</p>
					{/* Same size as the sections below so the page reads as one text */}
					<p className="text-muted-foreground text-base text-pretty">
						Esta página explica, de forma simples, quais dados a {site.name}{" "}
						recebe pelo site, para que usa e quais são os seus direitos, de
						acordo com a Lei Geral de Proteção de Dados (LGPD, Lei nº
						13.709/2018).
					</p>
				</header>

				<Block title="1. Quem somos">
					<p>
						A {site.name} aplica película em vidros de casas, escritórios, lojas
						e prédios em São Paulo e região. Somos a responsável (controladora)
						pelos dados descritos aqui. CNPJ {site.cnpj}.
					</p>
					<p>
						Contato: <a href={`mailto:${site.email}`}>{site.email}</a> ·{" "}
						<a href={site.phoneHref}>{site.phone}</a> ·{" "}
						<a href={site.landlineHref}>{site.landline}</a>
					</p>
				</Block>

				<Block title="2. Quais dados recebemos">
					<ul>
						<li>
							<strong>WhatsApp:</strong> o site não tem formulário. Os botões
							(inclusive o &quot;monte sua mensagem&quot; da seção de contato)
							só abrem o WhatsApp com um texto pronto; nada do que você marca
							fica guardado no site. Na conversa, que segue a política de
							privacidade do WhatsApp, recebemos seu nome, número e o que você
							enviar (como fotos dos vidros).
						</li>
						<li>
							<strong>E-mail e telefone:</strong> se você preferir escrever ou
							ligar, recebemos o que você nos enviar por esses canais.
						</li>
						<li>
							<strong>Dados técnicos de acesso:</strong> como qualquer site, a
							empresa de hospedagem registra informações básicas da visita
							(endereço IP, navegador, data e hora) para manter o site
							funcionando e seguro.
						</li>
					</ul>
					<p>
						O site{" "}
						<strong>não usa cookies de publicidade nem de rastreamento</strong>{" "}
						e não pede dados sensíveis.
					</p>
				</Block>

				<Block title="3. Para que usamos">
					<ul>
						<li>
							Responder ao seu contato, agendar a visita e enviar o orçamento.
						</li>
						<li>
							Prestar o serviço contratado e tirar dúvidas depois da aplicação.
						</li>
						<li>Manter o site seguro e funcionando.</li>
					</ul>
					<p>
						Não vendemos seus dados e não enviamos propaganda sem a sua
						autorização. A base legal é o atendimento ao seu pedido
						(procedimentos preliminares a um contrato) e o nosso legítimo
						interesse em manter o site seguro.
					</p>
				</Block>

				<Block title="4. Com quem compartilhamos">
					<p>Só com os serviços necessários para o site funcionar:</p>
					<ul>
						<li>
							<strong>Vercel:</strong> hospeda o site.
						</li>
						<li>
							<strong>Convex e Cloudflare:</strong> guardam os projetos e as
							fotos publicados no site.
						</li>
						<li>
							<strong>WhatsApp (Meta):</strong> quando você escolhe falar com a
							gente por lá.
						</li>
					</ul>
					<p>
						Alguns desses serviços ficam fora do Brasil; eles adotam medidas de
						segurança compatíveis com a LGPD. Também podemos compartilhar dados
						se uma lei ou autoridade exigir.
					</p>
				</Block>

				<Block title="5. Por quanto tempo guardamos">
					<p>
						Guardamos as mensagens e os dados de contato enquanto forem
						necessários para o atendimento, o serviço e eventuais garantias, e
						pelo prazo que a lei exigir. Depois disso, apagamos.
					</p>
				</Block>

				<Block title="6. Seus direitos">
					<p>Você pode, a qualquer momento e sem custo, pedir para:</p>
					<ul>
						<li>saber se temos dados seus e receber uma cópia;</li>
						<li>corrigir dados incompletos ou desatualizados;</li>
						<li>apagar seus dados ou deixar de recebê-los;</li>
						<li>saber com quem compartilhamos.</li>
					</ul>
					<p>
						É só escrever para <a href={`mailto:${site.email}`}>{site.email}</a>
						. Respondemos em até 15 dias. Se achar necessário, você também pode
						procurar a Autoridade Nacional de Proteção de Dados (ANPD).
					</p>
				</Block>

				<Block title="7. Segurança">
					<p>
						O site usa conexão segura (HTTPS) e o acesso à área de administração
						é restrito a pessoas autorizadas, com login e senha.
					</p>
				</Block>

				<Block title="8. Mudanças nesta política">
					<p>
						Se esta política mudar, a nova versão fica publicada nesta página
						com a data de atualização no topo.
					</p>
				</Block>

				<Link
					href="/"
					className="link-grow text-vidro self-start text-base font-semibold"
				>
					Voltar para o início
				</Link>
			</article>
		</main>
	);
}

function Block({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<section className="text-muted-foreground [&_a]:text-vidro [&_strong]:text-vidro flex flex-col gap-3 text-base text-pretty [&_a]:underline [&_a]:underline-offset-4 [&_li]:pl-1 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5">
			<h2 className="text-vidro text-medium font-bold font-stretch-expanded">
				{title}
			</h2>
			{children}
		</section>
	);
}
