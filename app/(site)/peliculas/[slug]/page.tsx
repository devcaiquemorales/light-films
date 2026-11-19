// Imports
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { films, getFilm, priceFactors } from "@/lib/data/films";
import { pageMetadata } from "@/lib/seo";
import { filmJsonLd, jsonLdString } from "@/lib/schema";
import { whatsappLink } from "@/lib/site";

// Imported Components
import { Button } from "@/components/ui/button";
import FilmCard from "@/components/Film/FilmCard";
import FilmSwatch from "@/components/Film/FilmSwatch";

// Types
type Props = { params: Promise<{ slug: string }> };

// Fixed list: every page is built ahead and unknown slugs are a 404
export const dynamicParams = false;

export function generateStaticParams() {
	return films.map((film) => ({ slug: film.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const film = getFilm((await params).slug);
	if (!film) return {};
	return pageMetadata({
		title: film.title,
		description: film.description,
		path: `/peliculas/${film.slug}`,
	});
}

// Functional Component
export default async function FilmPage({ params }: Props) {
	// Variables
	const film = getFilm((await params).slug);
	if (!film) notFound();

	const quote = whatsappLink(
		`Olá! Vim pelo site e quero um orçamento de ${film.fullName}.`
	);
	const others = films.filter((item) => item.slug !== film.slug);

	// Rendering
	return (
		<main>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: jsonLdString(filmJsonLd(film)) }}
			/>

			<article className="px-5 pt-10 pb-20 md:px-10 md:pt-14 md:pb-28">
				<div className="mx-auto flex max-w-7xl flex-col gap-12 md:gap-16">
					<Link
						href="/peliculas"
						className="link-grow text-vidro/70 hover:text-vidro inline-flex items-center gap-2 self-start text-sm font-semibold"
					>
						<ArrowLeftIcon aria-hidden className="size-4" />
						Todos os tipos de película
					</Link>

					{/* Answer first: what it is, then the sample window */}
					<header className="grid items-center gap-10 md:grid-cols-[1.1fr_1fr] md:gap-16">
						<div className="flex flex-col gap-6">
							<h1 className="text-vidro text-xl font-bold text-balance font-stretch-expanded">
								{film.title}
							</h1>
							<p className="text-medium text-muted-foreground max-w-xl text-pretty">
								{film.lead}
							</p>
							<p className="text-vidro/70 text-sm">
								Indicada para: {film.usage.join(", ").toLowerCase()}
							</p>
							<Button
								asChild
								variant="brand"
								size="brand"
								className="self-start"
							>
								<a href={quote} target="_blank" rel="noopener noreferrer">
									Pedir orçamento
								</a>
							</Button>
						</div>
						<figure className="flex flex-col gap-3">
							<FilmSwatch
								film={film}
								priority
								sizes="(min-width: 768px) 45vw, 90vw"
								className="border-[14px] shadow-[0_40px_80px_-40px_rgb(18_48_58/0.6)]"
							/>
							<figcaption className="text-muted-foreground text-sm">
								Simulação ilustrativa. Na visita, a gente aplica uma amostra no
								seu vidro.
							</figcaption>
						</figure>
					</header>

					<div className="flex max-w-3xl flex-col gap-10">
						{film.sections.map((section) => (
							<section key={section.heading} className="flex flex-col gap-4">
								<h2 className="text-vidro text-lg font-bold text-balance font-stretch-expanded">
									{section.heading}
								</h2>
								{section.paragraphs?.map((paragraph) => (
									<p
										key={paragraph}
										className="text-muted-foreground text-base text-pretty"
									>
										{paragraph}
									</p>
								))}
								{section.bullets && (
									<ul className="text-muted-foreground flex list-disc flex-col gap-2 pl-5 text-base">
										{section.bullets.map((bullet) => (
											<li key={bullet} className="pl-1">
												{bullet}
											</li>
										))}
									</ul>
								)}
							</section>
						))}

						{/* Same on every page: answers "quanto custa" honestly, without prices */}
						<section className="flex flex-col gap-4">
							<h2 className="text-vidro text-lg font-bold text-balance font-stretch-expanded">
								Quanto custa a {film.fullName}?
							</h2>
							<p className="text-muted-foreground text-base text-pretty">
								O valor é calculado para cada obra. O que mais pesa no preço:
							</p>
							<ul className="text-muted-foreground flex list-disc flex-col gap-2 pl-5 text-base">
								{priceFactors.map((factor) => (
									<li key={factor} className="pl-1">
										{factor}
									</li>
								))}
							</ul>
							<p className="text-muted-foreground text-base text-pretty">
								Mande fotos e as medidas aproximadas dos vidros pelo{" "}
								<a
									href={quote}
									target="_blank"
									rel="noopener noreferrer"
									className="text-vidro font-semibold underline underline-offset-4"
								>
									WhatsApp
								</a>
								. Depois da visita e da medição, você recebe o valor fechado e o
								prazo de aplicação.
							</p>
						</section>

						{/* Answers stay open: easy to scan and to quote */}
						<section className="flex flex-col gap-6">
							<h2 className="text-vidro text-lg font-bold text-balance font-stretch-expanded">
								Perguntas sobre {film.fullName}
							</h2>
							{/* Flush with the headings, split by hairlines; on wide screens the
							    question sits beside its answer like a spec sheet */}
							<dl className="border-vidro/15 border-b">
								{film.faq.map((item) => (
									<div
										key={item.question}
										className="border-vidro/15 grid gap-2 border-t py-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-10"
									>
										<dt className="text-vidro text-base font-bold text-balance">
											{item.question}
										</dt>
										<dd className="text-muted-foreground text-base text-pretty">
											{item.answer}
										</dd>
									</div>
								))}
							</dl>
						</section>
					</div>

					<div className="bg-vidro flex flex-col gap-6 rounded-sm p-8 text-white md:flex-row md:items-center md:justify-between md:p-10">
						<div className="flex max-w-xl flex-col gap-2">
							<p className="text-medium font-bold text-pretty font-stretch-expanded">
								Quer ver a {film.fullName} no seu vidro?
							</p>
							<p className="text-base text-white/75">
								Atendemos São Paulo e toda a Grande São Paulo. Mande fotos dos
								vidros pelo WhatsApp.
							</p>
						</div>
						<Button
							asChild
							variant="brand"
							size="brand"
							className="w-full shrink-0 md:w-auto"
						>
							<a href={quote} target="_blank" rel="noopener noreferrer">
								Pedir orçamento
							</a>
						</Button>
					</div>
				</div>
			</article>

			<section
				aria-labelledby="outras-peliculas"
				className="bg-white px-5 py-20 md:px-10 md:py-24"
			>
				<div className="mx-auto max-w-7xl">
					<h2
						id="outras-peliculas"
						className="text-vidro mb-10 text-lg font-bold font-stretch-expanded"
					>
						Outros tipos de película
					</h2>
					<ul className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
						{others.map((item) => (
							<li key={item.slug}>
								<FilmCard film={item} />
							</li>
						))}
					</ul>
				</div>
			</section>
		</main>
	);
}
