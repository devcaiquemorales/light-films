// Imported Components
import Image from "next/image";
import { QuoteIcon } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

// Types
import { TestimonialsType } from "./types";

// Functional Component
export default function Testimonial(props: TestimonialsType) {
	// Rendering
	return (
		<Card className="gap-6 rounded-3xl border-none bg-white px-2 py-10 ring-0 md:gap-10">
			<CardContent className="flex flex-col gap-6 md:gap-10">
				<QuoteIcon
					aria-hidden
					className="size-6 fill-primary-400 text-primary-400 md:size-10"
				/>
				<blockquote className="text-base text-primary-400 md:min-h-60">
					{props.testimonial}
				</blockquote>
			</CardContent>
			<CardFooter className="mt-auto gap-4">
				<Image
					className="w-8 rounded-full md:w-12"
					src={props.photoPath}
					alt={props.name}
					width={517}
					height={517}
				/>
				<div>
					<p className="text-sm font-medium text-primary-400">{props.name}</p>
					<p className="text-sm text-gray-500">{props.role}</p>
				</div>
			</CardFooter>
		</Card>
	);
}
