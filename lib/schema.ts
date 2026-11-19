// Structured data (JSON-LD) that tells search engines and AI search who the
// business is, where it works and what it does
import { site, siteDescription } from "@/lib/site";
import { films } from "@/lib/data/films";
import { cities } from "@/lib/data/cities";
import type { Project } from "@/lib/data/projects";

export const organizationId = `${site.url}/#organization`;

// Service-area business: no street address on purpose (no walk-in clients),
// so the area served replaces it: the capital and the whole metro region.
export const siteJsonLd = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "HomeAndConstructionBusiness",
			"@id": organizationId,
			name: site.name,
			description: siteDescription,
			url: site.url,
			logo: {
				"@type": "ImageObject",
				url: `${site.url}/brand/lf-quadrado-512.png`,
				width: 512,
				height: 512,
			},
			image: `${site.url}/opengraph-image`,
			email: site.email,
			telephone: "+55-11-4259-3003",
			taxID: site.cnpj,
			areaServed: [
				...cities.map((name) => ({ "@type": "City", name })),
				{
					"@type": "AdministrativeArea",
					name: "Região Metropolitana de São Paulo",
				},
			],
			contactPoint: [
				{
					"@type": "ContactPoint",
					contactType: "customer service",
					telephone: "+55-11-4259-3003",
					email: site.email,
					availableLanguage: "pt-BR",
				},
				{
					"@type": "ContactPoint",
					contactType: "sales",
					telephone: "+55-11-98169-6933",
					url: `https://wa.me/${site.whatsappNumber}`,
					availableLanguage: "pt-BR",
				},
			],
			knowsAbout: films.map((film) => `Película ${film.name.toLowerCase()}`),
			// Same wording as the "Tipos de película" section; no prices on purpose
			hasOfferCatalog: {
				"@type": "OfferCatalog",
				name: "Películas para vidros",
				itemListElement: films.map((film) => ({
					"@type": "Offer",
					itemOffered: {
						"@type": "Service",
						name: `Película ${film.name.toLowerCase()}`,
						description: film.text,
						serviceType: "Aplicação de película em vidros",
						provider: { "@id": organizationId },
					},
				})),
			},
			sameAs: [site.facebook],
		},
		{
			"@type": "WebSite",
			"@id": `${site.url}/#website`,
			url: site.url,
			name: site.name,
			inLanguage: "pt-BR",
			publisher: { "@id": organizationId },
		},
	],
};

// Project page: breadcrumb (Início › Projetos › name) plus the job with its photos
export function projectJsonLd(project: Project) {
	const url = `${site.url}/projetos/${project.slug}`;
	const absolute = (src: string) =>
		src.startsWith("http") ? src : `${site.url}${src}`;

	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "BreadcrumbList",
				itemListElement: [
					{ "@type": "ListItem", position: 1, name: "Início", item: site.url },
					{
						"@type": "ListItem",
						position: 2,
						name: "Projetos",
						item: `${site.url}/projetos`,
					},
					{ "@type": "ListItem", position: 3, name: project.title, item: url },
				],
			},
			{
				"@type": "CreativeWork",
				"@id": `${url}#projeto`,
				name: project.title,
				description: project.description.join(" "),
				url,
				inLanguage: "pt-BR",
				creator: { "@id": organizationId },
				image: project.photos.map((photo) => ({
					"@type": "ImageObject",
					contentUrl: absolute(photo.path),
					caption: photo.alt,
				})),
			},
		],
	};
}

// Safe inline JSON for a <script> tag (no "</script>" breakouts from panel text)
export function jsonLdString(data: unknown) {
	return JSON.stringify(data).replace(/</g, "\\u003c");
}
