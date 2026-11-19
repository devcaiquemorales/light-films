// Imports
import { jsonLdString, siteJsonLd } from "@/lib/schema";

// Imported Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Whatsapp from "@/components/Whatsapp";

// Public site chrome; the panel (/painel) has its own layout
export default function SiteLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Header />
			{/* Grows so the footer stays at the bottom on short pages. On navigation Next
			    scrolls the new page's <main> to the top; the margin keeps it below the sticky header */}
			<div className="flex flex-1 flex-col [&>main]:scroll-mt-16 md:[&>main]:scroll-mt-20">
				{children}
			</div>
			<Footer />
			<Whatsapp />
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: jsonLdString(siteJsonLd) }}
			/>
		</>
	);
}
