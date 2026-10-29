// Imports
import type { Metadata } from "next";

// Imported Components
import Providers from "./_components/Providers";
import Shell from "./_components/Shell";

// SEO: the panel never shows up in search
export const metadata: Metadata = {
	title: "Painel",
	robots: { index: false, follow: false },
};

// Functional Component
export default function PanelLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Providers>
			<Shell>{children}</Shell>
		</Providers>
	);
}
