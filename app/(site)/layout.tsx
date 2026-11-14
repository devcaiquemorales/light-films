// Imports
import { site, siteDescription } from "@/lib/site";

// Imported Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Whatsapp from "@/components/Whatsapp";

// Structured data so search engines show the business with phone and region
const localBusiness = {
	"@context": "https://schema.org",
	"@type": "HomeAndConstructionBusiness",
	name: site.name,
	description: siteDescription,
	url: site.url,
	// Logo and image help Google tie the LF mark to the business
	logo: `${site.url}/brand/lf-quadrado-512.png`,
	image: `${site.url}/opengraph-image`,
	email: site.email,
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

// Public site chrome; the panel (/painel) has its own layout
export default function SiteLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Header />
			{/* Grows so the footer stays at the bottom on short pages */}
			<div className="flex flex-1 flex-col">{children}</div>
			<Footer />
			<Whatsapp />
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
			/>
		</>
	);
}
