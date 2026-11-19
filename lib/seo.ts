// Page metadata with its own share card (Open Graph). Next replaces the parent's
// openGraph object as a whole, so each page repeats the shared fields here.
import type { Metadata } from "next";
import { site } from "@/lib/site";

export function pageMetadata({
	title,
	description,
	path,
	image,
}: {
	title: string;
	description: string;
	path: string;
	image?: string;
}): Metadata {
	return {
		title,
		description,
		alternates: { canonical: path },
		openGraph: {
			type: "website",
			locale: "pt_BR",
			siteName: site.name,
			title: `${title} | ${site.name}`,
			description,
			url: path,
			// A page that sets openGraph loses the site-wide image, so pass it again
			images: [image ?? "/opengraph-image"],
		},
		twitter: { card: "summary_large_image" },
	};
}
