import { cn } from "@/lib/utils";

// LF brand mark (same drawing as app/icon.svg and public/brand/lf.svg)
export function LogoMark({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 64 64"
			aria-hidden
			className={cn("size-8 shrink-0", className)}
		>
			<rect width="64" height="64" rx="14" fill="#2a74a6" />
			<path d="M14 16h8.5v24.5H31V48H14z" fill="#ffffff" />
			<path d="M34 16h17v7.5h-8.5v5.5h7v7h-7V48H34z" fill="#cfe6f5" />
		</svg>
	);
}
