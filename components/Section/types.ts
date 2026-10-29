// Types
export type SectionType = {
	id: string;
	children: React.ReactNode;
	title: string;
	intro?: React.ReactNode;
	tone?: "nevoa" | "branco" | "vidro";
	className?: string;
	headingAs?: "h1" | "h2";
};
