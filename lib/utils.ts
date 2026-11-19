import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge about the custom `text-medium` font size from globals.css,
// otherwise it is treated as a text color and dropped next to `text-primary-400`
const twMerge = extendTailwindMerge({
	extend: {
		classGroups: {
			"font-size": [{ text: ["medium"] }],
		},
	},
});

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// "película fumê" -> "Película fumê"
export function capitalize(text: string) {
	return text.charAt(0).toUpperCase() + text.slice(1);
}
