// Imports
import { Archivo } from "next/font/google";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

// Imported Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Whatsapp from "@/components/Whatsapp";
import { Toaster } from "@/components/ui/sonner";

// Stylesheets
import "./globals.css";

// Font
// Variable width axis: expanded for headings, normal for body text
const archivo = Archivo({
	subsets: ["latin"],
	axes: ["wdth"],
	variable: "--font-sans",
});

// SEO
const description =
	"Película para vidros de casas, escritórios, lojas e prédios em São Paulo. Menos calor, proteção UV e mais privacidade, sem trocar a janela.";

export const metadata: Metadata = {
	metadataBase: new URL(site.url),
	title: {
		default: "Light Films - Película para vidros em São Paulo",
		template: "%s | Light Films",
	},
	description,
	authors: [{ name: "Caique Morales", url: "https://caiquemorales.com/" }],
	keywords: [
		"insulfilm",
		"película para vidros",
		"película arquitetônica",
		"controle solar",
		"película fumê",
		"película espelhada",
		"película jateada",
		"São Paulo",
	],
	openGraph: {
		type: "website",
		locale: "pt_BR",
		siteName: site.name,
		title: "Light Films - Película para vidros em São Paulo",
		description,
	},
	robots: { index: true, follow: true },
};

// Structured data so search engines show the business with phone and region
const localBusiness = {
	"@context": "https://schema.org",
	"@type": "HomeAndConstructionBusiness",
	name: site.name,
	description,
	url: site.url,
	telephone: "+55-11-4259-3003",
	areaServed: { "@type": "City", name: "São Paulo" },
	address: {
		"@type": "PostalAddress",
		addressLocality: "São Paulo",
		addressRegion: "SP",
		addressCountry: "BR",
	},
	sameAs: [site.facebook],
};

// Functional Component
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="pt-BR" className={cn("font-sans", archivo.variable)}>
			<body className="flex min-h-svh flex-col">
				<Header />
				{/* Grows so the footer stays at the bottom on short pages */}
				<div className="flex flex-1 flex-col">{children}</div>
				<Footer />
				<Whatsapp />
				<Toaster position="top-center" richColors />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
				/>
			</body>
		</html>
	);
}
