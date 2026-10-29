// Client Side
"use client";

// Imports
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";

// Imported Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogClose,
} from "@/components/ui/dialog";

// Validation
const schema = z.object({
	user_name: z.string().trim().min(2, "Informe seu nome."),
	user_phone: z
		.string()
		.regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Informe um celular válido com DDD."),
	user_email: z.email("Informe um e-mail válido."),
	message: z
		.string()
		.trim()
		.min(10, "Escreva uma mensagem com pelo menos 10 caracteres."),
});

type FormFields = z.infer<typeof schema>;
type FormErrors = Partial<Record<keyof FormFields, string>>;

const emptyForm: FormFields = {
	user_name: "",
	user_phone: "",
	user_email: "",
	message: "",
};

// Formats digits as (11) 91234-5678
function formatPhone(value: string) {
	const digits = value.replace(/\D/g, "").slice(0, 11);
	return digits
		.replace(/^(\d{2})(\d)/, "($1) $2")
		.replace(/(\d)(\d{4})$/, "$1-$2");
}

// Functional Component
export default function Form() {
	// Variables
	const form = useRef<HTMLFormElement>(null);
	const [formData, setFormData] = useState<FormFields>(emptyForm);
	const [errors, setErrors] = useState<FormErrors>({});
	const [sending, setSending] = useState(false);
	const [successOpen, setSuccessOpen] = useState(false);

	// Functions
	const update = (field: keyof FormFields, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		setErrors((prev) => ({ ...prev, [field]: undefined }));
	};

	const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (sending || !form.current) return;

		const result = schema.safeParse(formData);
		if (!result.success) {
			const fieldErrors: FormErrors = {};
			for (const issue of result.error.issues) {
				const key = issue.path[0] as keyof FormFields;
				fieldErrors[key] ??= issue.message;
			}
			setErrors(fieldErrors);
			return;
		}

		setSending(true);
		try {
			await emailjs.sendForm(
				"service_zgdcyfm",
				"template_crknyff",
				form.current,
				{
					publicKey: "hv75Z0c-mETbppE6e",
				}
			);
			setFormData(emptyForm);
			setSuccessOpen(true);
		} catch {
			toast.error("Não foi possível enviar sua mensagem.", {
				description: "Tente novamente ou fale com a gente pelo WhatsApp.",
			});
		} finally {
			setSending(false);
		}
	};

	// Rendering
	return (
		<>
			<form
				ref={form}
				onSubmit={sendEmail}
				noValidate
				className="text-vidro flex flex-col gap-8 rounded-md bg-white p-6 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.5)] md:p-8"
			>
				<FieldGroup>
					<Field data-invalid={!!errors.user_name}>
						<FieldLabel
							htmlFor="user_name"
							className="text-vidro font-semibold"
						>
							Nome
						</FieldLabel>
						<Input
							id="user_name"
							name="user_name"
							autoComplete="name"
							className="h-11 bg-white"
							value={formData.user_name}
							aria-invalid={!!errors.user_name}
							onChange={(e) => update("user_name", e.target.value)}
						/>
						<FieldError>{errors.user_name}</FieldError>
					</Field>
					<Field data-invalid={!!errors.user_phone}>
						<FieldLabel
							htmlFor="user_phone"
							className="text-vidro font-semibold"
						>
							Celular
						</FieldLabel>
						<Input
							id="user_phone"
							name="user_phone"
							type="tel"
							inputMode="numeric"
							autoComplete="tel-national"
							placeholder="(11) 91234-5678"
							className="h-11 bg-white"
							value={formData.user_phone}
							aria-invalid={!!errors.user_phone}
							onChange={(e) =>
								update("user_phone", formatPhone(e.target.value))
							}
						/>
						<FieldError>{errors.user_phone}</FieldError>
					</Field>
					<Field data-invalid={!!errors.user_email}>
						<FieldLabel
							htmlFor="user_email"
							className="text-vidro font-semibold"
						>
							E-mail
						</FieldLabel>
						<Input
							id="user_email"
							name="user_email"
							type="email"
							autoComplete="email"
							className="h-11 bg-white"
							value={formData.user_email}
							aria-invalid={!!errors.user_email}
							onChange={(e) => update("user_email", e.target.value)}
						/>
						<FieldError>{errors.user_email}</FieldError>
					</Field>
					<Field data-invalid={!!errors.message}>
						<FieldLabel htmlFor="message" className="text-vidro font-semibold">
							Mensagem
						</FieldLabel>
						<Textarea
							id="message"
							name="message"
							className="h-44 resize-none bg-white"
							value={formData.message}
							aria-invalid={!!errors.message}
							onChange={(e) => update("message", e.target.value)}
						/>
						<FieldError>{errors.message}</FieldError>
					</Field>
				</FieldGroup>
				<Button
					type="submit"
					variant="brand-solid"
					size="brand"
					disabled={sending}
					className="w-full md:w-max"
				>
					{sending && <Loader2Icon className="animate-spin" />}
					{sending ? "Enviando..." : "Enviar mensagem"}
				</Button>
			</form>

			<Dialog open={successOpen} onOpenChange={setSuccessOpen}>
				<DialogContent className="sm:max-w-xl">
					<DialogHeader>
						<DialogTitle className="text-vidro text-lg font-bold font-stretch-expanded">
							Mensagem enviada!
						</DialogTitle>
						<DialogDescription className="text-muted-foreground text-base">
							Agradecemos por entrar em contato conosco. Recebemos sua mensagem
							e vamos responder o mais rápido possível.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="brand-solid" size="brand">
								Fechar
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
