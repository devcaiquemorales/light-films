import { cn } from "@/lib/utils";

// "No site" / "Rascunho" label used in the list and in the editor
export default function StatusPill({
	published,
	className,
}: {
	published: boolean;
	className?: string;
}) {
	return (
		<span
			className={cn(
				"inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
				published ? "bg-emerald-50 text-emerald-700" : "bg-nevoa text-vidro/70",
				className
			)}
		>
			<span
				aria-hidden
				className={cn(
					"size-1.5 rounded-full",
					published ? "bg-emerald-500" : "bg-vidro/40"
				)}
			/>
			{published ? "No site" : "Rascunho"}
		</span>
	);
}
