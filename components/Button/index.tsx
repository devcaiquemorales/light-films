// Client Side
"use client";

// Imports
import { scrollToSection } from "@/utils/scrollToSection";

// Types
import { ButtonType } from "./types";

// Functional Component
export default function Button(props: ButtonType) {
	// Function
	function invariant(value: unknown): asserts value {
		if (value) return;

		throw new Error("Invariant violation");
	}

	invariant(props.navigate);
	const screen: string = props.navigate;

	// Rendering
	return (
		<button
			className="w-max rounded-[1rem] bg-white hover:bg-primary-400 text-primary-400 hover:text-white duration-300"
			onClick={props.navigate ? () => scrollToSection(screen) : props.onClick}
		>
			<p className="text-sm font-bold uppercase p-[1.125em_5.125em]">
				{props.text}
			</p>
		</button>
	);
}
