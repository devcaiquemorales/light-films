// Types
export type TitleType = {
	text: string;
	intro?: React.ReactNode;
	inverted?: boolean;
	// h1 on pages where the section title is the page title
	as?: "h1" | "h2";
};
