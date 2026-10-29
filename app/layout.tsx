// Imports
import { Archivo } from "next/font/google";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { site, siteDescription as description } from "@/lib/site";

// Imported Components
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

// Functional Component
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="pt-BR" className={cn("font-sans", archivo.variable)}>
			<body className="flex min-h-svh flex-col">
				{children}
				<Toaster position="top-center" richColors />
			</body>
		</html>
	);
}
