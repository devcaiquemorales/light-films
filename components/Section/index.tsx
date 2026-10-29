import { cn } from "@/lib/utils";
import Title from "../Title";

// Types
import { SectionType } from "./types";

// Functional Component
export default function Section({ tone = "nevoa", ...props }: SectionType) {
	// Rendering
	return (
		<section
			id={props.id}
			className={cn(
				"scroll-mt-20 px-5 py-20 md:px-10 md:py-28",
				tone === "branco" && "bg-white",
				tone === "vidro" && "bg-vidro text-white",
				props.className
			)}
		>
			{/* Caps content width so ultrawide screens don't stretch the layout */}
			<div className="mx-auto max-w-7xl">
				<Title
					text={props.title}
					intro={props.intro}
					inverted={tone === "vidro"}
					as={props.headingAs}
				/>
				{props.children}
			</div>
		</section>
	);
}
