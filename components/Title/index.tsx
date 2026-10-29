import { cn } from "@/lib/utils";

// Types
import { TitleType } from "./types";

// Functional Component
export default function Title(props: TitleType) {
	// Variables
	const Heading = props.as ?? "h2";

	// Rendering
	return (
		<header className="mb-12 max-w-3xl md:mb-16">
			<Heading
				className={cn(
					"text-xl font-bold text-balance font-stretch-expanded",
					props.inverted ? "text-white" : "text-vidro"
				)}
			>
				{props.text}
			</Heading>
			{props.intro && (
				<p
					className={cn(
						"text-medium mt-5 max-w-2xl text-pretty",
						props.inverted ? "text-white/75" : "text-muted-foreground"
					)}
				>
					{props.intro}
				</p>
			)}
		</header>
	);
}
