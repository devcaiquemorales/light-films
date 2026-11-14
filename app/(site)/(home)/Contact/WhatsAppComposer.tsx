// Client Side
"use client";

// Imports
import { useState } from "react";
import { MessageCircleIcon } from "lucide-react";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

// Imported Components
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const places = [
	"Casa",
	"Apartamento",
	"Escritório",
	"Loja",
	"Prédio ou condomínio",
	"Outro",
];
const UNSURE = "Ainda não sei";
const goals = ["Menos calor", "Privacidade", "Segurança", "Decoração", UNSURE];

// Builds the first WhatsApp message from a few taps. Nothing is sent or stored by the site:
// the button only opens WhatsApp with the text filled in.
export default function WhatsAppComposer() {
	// Variables
	const [place, setPlace] = useState<string | null>(null);
	const [wants, setWants] = useState<string[]>([]);
	const [note, setNote] = useState("");

	// Greeting, details block and closing line separated by blank lines; *text* is bold in WhatsApp
	const details = [
		place && `*Local:* ${place}`,
		wants.length > 0 &&
			`*Procuro:* ${goals
				.filter((goal) => wants.includes(goal))
				.join(", ")
				.toLowerCase()}`,
		note.trim() && `*Obs.:* ${note.trim().replace(/\s+/g, " ")}`,
	].filter(Boolean);

	const message = [
		"Olá! Vim pelo site e quero um orçamento de película.",
		details.length > 0 && details.join("\n"),
		"Vou mandar fotos dos vidros.",
	]
		.filter(Boolean)
		.join("\n\n");

	// Functions
	// "Ainda não sei" doesn't mix with the other goals: picking it clears them and vice versa
	const toggleWant = (item: string) =>
		setWants((prev) => {
			if (prev.includes(item)) return prev.filter((want) => want !== item);
			if (item === UNSURE) return [UNSURE];
			return [...prev.filter((want) => want !== UNSURE), item];
		});

	// Rendering
	return (
		<div className="text-vidro flex flex-col gap-7 rounded-md bg-white p-6 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.5)] md:p-8">
			<ChipGroup legend="Onde é?">
				{places.map((item) => (
					<Chip
						key={item}
						type="radio"
						name="local"
						label={item}
						checked={place === item}
						onChange={() => setPlace(place === item ? null : item)}
					/>
				))}
			</ChipGroup>

			<ChipGroup legend="O que você procura?" hint="pode marcar mais de um">
				{goals.map((item) => (
					<Chip
						key={item}
						type="checkbox"
						name="procura"
						label={item}
						checked={wants.includes(item)}
						onChange={() => toggleWant(item)}
					/>
				))}
			</ChipGroup>

			<div className="flex flex-col gap-2">
				<label htmlFor="whatsapp-note" className="font-semibold">
					Quer contar mais alguma coisa?{" "}
					<span className="text-muted-foreground font-normal">(opcional)</span>
				</label>
				<Textarea
					id="whatsapp-note"
					value={note}
					onChange={(e) => setNote(e.target.value)}
					placeholder="Ex.: 3 janelas na sala, bairro Moema"
					maxLength={300}
					className="h-24 resize-none bg-white text-base"
				/>
			</div>

			<div className="flex flex-col gap-3">
				<Button
					asChild
					variant="brand"
					size="brand"
					className="h-13 w-full px-8 md:w-max"
				>
					<a
						href={whatsappLink(message)}
						target="_blank"
						rel="noopener noreferrer"
					>
						<MessageCircleIcon
							aria-hidden
							className="size-5"
							strokeWidth={2.25}
						/>
						Chamar no WhatsApp
					</a>
				</Button>
				<p className="text-muted-foreground text-sm">
					A mensagem já vai pronta. Na conversa, é só mandar as fotos dos
					vidros.
				</p>
			</div>
		</div>
	);
}

// Parts

function ChipGroup({
	legend,
	hint,
	children,
}: {
	legend: string;
	hint?: string;
	children: React.ReactNode;
}) {
	return (
		<fieldset>
			<legend className="mb-3 font-semibold">
				{legend}{" "}
				{hint && (
					<span className="text-muted-foreground font-normal">({hint})</span>
				)}
			</legend>
			<div className="flex flex-wrap gap-2">{children}</div>
		</fieldset>
	);
}

function Chip({
	type,
	name,
	label,
	checked,
	onChange,
}: {
	type: "radio" | "checkbox";
	name: string;
	label: string;
	checked: boolean;
	onChange: () => void;
}) {
	return (
		<label
			className={cn(
				"has-focus-visible:ring-ring/50 inline-flex h-10 cursor-pointer items-center rounded-full border px-4 text-sm font-semibold transition-colors duration-200 select-none has-focus-visible:ring-3",
				checked
					? "border-vidro bg-vidro text-white"
					: "border-border text-vidro hover:border-vidro/40 bg-white"
			)}
		>
			<input
				type={type}
				name={name}
				checked={checked}
				onChange={onChange}
				className="sr-only"
			/>
			{label}
		</label>
	);
}
