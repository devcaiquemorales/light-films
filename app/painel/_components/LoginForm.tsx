// Client Side
"use client";

// Imports
import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { Loader2Icon } from "lucide-react";
import { LogoMark } from "@/components/Logo";

// Imported Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useServerOffline } from "./ConnectionNotice";

// Gives up on a request that hangs (e.g. connection dropped mid-way)
const TIMEOUT_MS = 20000;

// Functional Component
export default function LoginForm() {
	// Variables
	const { signIn } = useAuthActions();
	const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
	const [sending, setSending] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const firstAccess = flow === "signUp";
	const offline = useServerOffline();

	// Functions
	const submit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSending(true);
		setError(null);
		const data = new FormData(e.currentTarget);
		data.set("flow", flow);
		try {
			await Promise.race([
				signIn("password", data),
				new Promise((_, reject) =>
					setTimeout(() => reject(new Error("timeout")), TIMEOUT_MS)
				),
			]);
		} catch (err) {
			setError(
				err instanceof Error && err.message === "timeout"
					? "O servidor demorou para responder. Confira a internet e tente de novo."
					: firstAccess
						? "Não foi possível criar o acesso. Confira o e-mail (ele precisa estar liberado) e use uma senha com pelo menos 8 caracteres."
						: "E-mail ou senha incorretos."
			);
		} finally {
			setSending(false);
		}
	};

	// Rendering
	return (
		<main className="flex flex-1 items-center justify-center px-5 py-12">
			<div className="w-full max-w-sm">
				<p className="text-vidro flex flex-col items-center gap-3 text-center text-lg font-extrabold font-stretch-expanded">
					<LogoMark className="size-14" />
					Light Films
				</p>
				<form
					onSubmit={submit}
					className="mt-8 flex flex-col gap-6 rounded-md bg-white p-6 shadow-[0_20px_50px_-30px_rgb(27_55_72/0.5)] md:p-8"
				>
					<div>
						<h1 className="text-vidro text-medium font-bold font-stretch-expanded">
							{firstAccess ? "Primeiro acesso" : "Entrar no painel"}
						</h1>
						<p className="text-muted-foreground mt-1 text-sm">
							{firstAccess
								? "Crie a sua senha para acessar o painel."
								: "Use o e-mail e a senha cadastrados."}
						</p>
					</div>

					<FieldGroup>
						{firstAccess && (
							<Field>
								<FieldLabel htmlFor="name" className="text-vidro font-semibold">
									Seu nome
								</FieldLabel>
								<Input
									id="name"
									name="name"
									autoComplete="name"
									required
									className="h-12 text-base"
								/>
							</Field>
						)}
						<Field>
							<FieldLabel htmlFor="email" className="text-vidro font-semibold">
								E-mail
							</FieldLabel>
							<Input
								id="email"
								name="email"
								type="email"
								autoComplete="username"
								required
								className="h-12 text-base"
							/>
						</Field>
						<Field>
							<FieldLabel
								htmlFor="password"
								className="text-vidro font-semibold"
							>
								Senha
							</FieldLabel>
							<Input
								id="password"
								name="password"
								type="password"
								autoComplete={firstAccess ? "new-password" : "current-password"}
								minLength={8}
								required
								className="h-12 text-base"
							/>
						</Field>
					</FieldGroup>

					{error && (
						<p
							role="alert"
							className="bg-destructive/10 text-destructive rounded-sm px-3 py-2 text-sm"
						>
							{error}
						</p>
					)}

					<Button
						type="submit"
						variant="brand"
						size="brand"
						disabled={sending || offline}
						className="w-full"
					>
						{sending && <Loader2Icon className="animate-spin" />}
						{sending
							? firstAccess
								? "Criando acesso…"
								: "Entrando…"
							: firstAccess
								? "Criar acesso"
								: "Entrar"}
					</Button>
				</form>

				<button
					type="button"
					onClick={() => {
						setFlow(firstAccess ? "signIn" : "signUp");
						setError(null);
					}}
					className="link-grow text-vidro mx-auto mt-6 block text-sm font-semibold"
				>
					{firstAccess ? "Já tenho senha" : "Primeiro acesso? Criar senha"}
				</button>
			</div>
		</main>
	);
}
