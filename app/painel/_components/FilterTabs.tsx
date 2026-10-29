// Client Side
"use client";

// Imports
import { cn } from "@/lib/utils";

// Types
export type FilterTab<T extends string> = {
	id: T;
	label: string;
	count: number;
	dot?: string;
};

// Pill tabs; the selected one fades to dark instead of switching instantly
export default function FilterTabs<T extends string>({
	tabs,
	value,
	onChange,
	label,
}: {
	tabs: FilterTab<T>[];
	value: T;
	onChange: (value: T) => void;
	label: string;
}) {
	// Rendering
	return (
		<div role="tablist" aria-label={label} className="flex flex-wrap gap-2">
			{tabs.map((tab) => {
				const selected = tab.id === value;
				return (
					<button
						key={tab.id}
						type="button"
						role="tab"
						aria-selected={selected}
						onClick={() => onChange(tab.id)}
						className={cn(
							"focus-visible:ring-ring/50 inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-[background-color,border-color,color,box-shadow] duration-300 ease-out focus-visible:ring-3 focus-visible:outline-none motion-reduce:transition-none",
							selected
								? "border-vidro bg-vidro text-white shadow-[0_6px_16px_-8px_rgb(27_55_72/0.7)]"
								: "border-border text-vidro hover:border-vidro/40 bg-white"
						)}
					>
						{tab.dot && (
							<span
								aria-hidden
								className={cn("size-2 rounded-full", tab.dot)}
							/>
						)}
						{tab.label}
						<span
							className={cn(
								"min-w-6 rounded-full px-1.5 py-0.5 text-center text-xs tabular-nums transition-colors duration-300 ease-out",
								selected ? "bg-white/15" : "bg-nevoa"
							)}
						>
							{tab.count}
						</span>
					</button>
				);
			})}
		</div>
	);
}
