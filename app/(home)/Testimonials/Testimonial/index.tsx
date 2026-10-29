// Imported Components
import Image from "next/image";
import { QuoteIcon } from "lucide-react";

// Types
import { TestimonialsType } from "./types";

// Functional Component
export default function Testimonial(props: TestimonialsType) {
	// Rendering
	return (
		<figure className="flex flex-col gap-5">
			<QuoteIcon aria-hidden className="size-9 fill-sol text-sol" strokeWidth={0} />
			<blockquote className="text-medium text-vidro text-pretty">{props.testimonial}</blockquote>
			<figcaption className="mt-auto flex items-center gap-3 pt-2">
				<Image
					className="size-11 rounded-full object-cover"
					src={props.photoPath}
					alt=""
					width={88}
					height={88}
				/>
				<div>
					<p className="text-sm font-semibold text-vidro">{props.name}</p>
					<p className="text-sm text-muted-foreground">{props.role}</p>
				</div>
			</figcaption>
		</figure>
	);
}
