// Client Side
"use client";

// Imports
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Tint levels shown in the hero; values are illustrative, not product specs
const tints = [
	{
		id: "sem",
		label: "Sem película",
		description: "Vidro comum: entra mais sol, calor e reflexo.",
		pane: "bg-transparent backdrop-brightness-125 backdrop-saturate-125",
	},
	{
		id: "clara",
		label: "Clara",
		description:
			"Quase invisível. Corta calor e raios UV sem escurecer o ambiente.",
		pane: "bg-[rgb(28_70_80/0.16)] backdrop-saturate-90",
	},
	{
		id: "fume",
		label: "Fumê",
		description:
			"Equilíbrio entre luz e conforto, com menos reflexo nas telas.",
		pane: "bg-[rgb(16_40_46/0.45)] backdrop-brightness-90 backdrop-saturate-75",
	},
	{
		id: "escura",
		label: "Escura",
		description:
			"Mais privacidade: quem está do lado de fora vê pouco do lado de dentro.",
		pane: "bg-[rgb(8_22_26/0.72)] backdrop-brightness-75 backdrop-saturate-50",
	},
	{
		id: "espelhada",
		label: "Espelhada",
		description:
			"Reflete o sol durante o dia e deixa a fachada com acabamento uniforme.",
		pane: "bg-[linear-gradient(135deg,rgb(226_236_239/0.85),rgb(120_150_160/0.65)_45%,rgb(232_240_242/0.8)_62%,rgb(140_165_172/0.7))] backdrop-brightness-75",
	},
] as const;

type TintId = (typeof tints)[number]["id"];

// Functional Component
export default function TintSimulator() {
	// Variables
	const [active, setActive] = useState<TintId>("fume");
	const current = tints.find((tint) => tint.id === active)!;

	// Rendering
	return (
		<figure className="flex flex-col gap-5">
			<div className="relative">
				{/* Glass panel offset behind the window, catching the light */}
				<div
					aria-hidden
					className="from-ceu-claro to-ceu absolute inset-0 translate-x-4 -translate-y-4 rounded-sm bg-linear-135 opacity-60 md:translate-x-7 md:-translate-y-7"
				/>
				{/* Window: real sky photo behind a 2x3 grid of panes */}
				<div className="border-vidro bg-vidro relative aspect-[4/5] max-h-[68svh] w-full overflow-hidden rounded-sm border-[14px] shadow-[0_40px_80px_-40px_rgb(18_48_58/0.6)] sm:aspect-[5/6] md:aspect-square">
					<Image
						src="/skyview.png"
						alt="Prédios de São Paulo vistos através de uma janela"
						fill
						priority
						sizes="(min-width: 768px) 45vw, 90vw"
						className="object-cover"
					/>
					<div className="absolute inset-0 grid grid-cols-2 grid-rows-[1.4fr_1fr_1fr]">
						{Array.from({ length: 6 }, (_, i) => (
							<div
								key={i}
								className={cn(
									"outline-vidro outline-[7px] transition-[background,backdrop-filter] duration-500 ease-out motion-reduce:transition-none",
									current.pane
								)}
							/>
						))}
					</div>
				</div>
			</div>

			<div
				role="radiogroup"
				aria-label="Tom da película"
				className="flex flex-wrap gap-2"
			>
				{tints.map((tint) => (
					<button
						key={tint.id}
						type="button"
						role="radio"
						aria-checked={active === tint.id}
						onClick={() => setActive(tint.id)}
						className={cn(
							"focus-visible:ring-ring/50 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-3 focus-visible:outline-none",
							active === tint.id
								? "border-vidro bg-vidro text-white"
								: "border-border text-vidro hover:border-vidro/40 bg-white"
						)}
					>
						{tint.label}
					</button>
				))}
			</div>

			<figcaption
				aria-live="polite"
				className="text-muted-foreground min-h-12 max-w-md text-sm"
			>
				<strong className="text-vidro font-semibold">{current.label}.</strong>{" "}
				{current.description}{" "}
				<span className="text-muted-foreground/80">Simulação ilustrativa.</span>
			</figcaption>
		</figure>
	);
}
