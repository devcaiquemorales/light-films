import { cn } from "@/lib/utils";

// Types
import { TitleType } from "./types";

// Functional Component
export default function Title(props: TitleType) {
	// Rendering
	return (
		<header className="mb-12 max-w-3xl md:mb-16">
			<h2
				className={cn(
					"text-xl font-bold font-stretch-expanded text-balance",
					props.inverted ? "text-white" : "text-vidro"
				)}
			>
				{props.text}
			</h2>
			{props.intro && (
				<p
					className={cn(
						"mt-5 max-w-2xl text-medium text-pretty",
						props.inverted ? "text-white/75" : "text-muted-foreground"
					)}
				>
					{props.intro}
				</p>
			)}
		</header>
	);
}
