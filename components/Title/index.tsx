import { cn } from "@/lib/utils";

// Types
import { TitleType } from "./types";

// Functional Component
export default function Title(props: TitleType) {
	// Variables
	const line = cn(
		"h-3 min-w-6 max-w-[22vw] flex-1 border-y-4",
		props.colored ? "border-white" : "border-primary-400"
	);

	// Rendering
	return (
		<div className="mb-20 flex items-center justify-center gap-4 md:gap-8">
			<span aria-hidden className={line} />
			<h2
				className={cn(
					"text-center text-lg font-bold uppercase",
					props.colored ? "text-white" : "text-primary-400"
				)}
			>
				{props.text}
			</h2>
			<span aria-hidden className={line} />
		</div>
	);
}
