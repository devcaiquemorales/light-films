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
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-sans" });

// SEO
export const metadata: Metadata = {
	metadataBase: new URL(site.url),
	title: {
		default: "Light Films - Privacidade, Proteção e Estilo em Vidros",
		template: "%s | Light Films",
	},
	robots: "index, follow",
	description:
		"Explore os benefícios do insulfilm: diminua o calor, bloqueie raios UV, aumente a privacidade e reforce a segurança. Crie um ambiente mais confortável e seguro. Saiba mais!",
	authors: [{ name: "Caique Morales", url: "https://caiquemorales.com/" }],
	publisher: "Vercel",
	keywords:
		"Insulfilm, Película arquitetônica, Proteção solar, Aplicação de insulfilm, Projetos, Privacidade, Benefícios",
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
			</body>
		</html>
	);
}
