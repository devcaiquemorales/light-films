import { cn } from "@/lib/utils";
import Title from "../Title";

// Types
import { SectionType } from "./types";

// Functional Component
export default function Section(props: SectionType) {
	// Rendering
	return (
		<section
			id={props.id}
			className={cn(
				"px-[10%] py-28",
				props.colored && "bg-primary-400 text-white",
				props.className
			)}
		>
			{/* Caps content width so ultrawide screens don't stretch the layout */}
			<div className="mx-auto max-w-7xl">
				<Title colored={props.colored} text={props.title} />
				{props.children}
			</div>
		</section>
	);
}
