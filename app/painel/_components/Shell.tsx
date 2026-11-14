// Client Side
"use client";

// Imports
import Link from "next/link";
import {
	Authenticated,
	AuthLoading,
	Unauthenticated,
	useQuery,
} from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { ExternalLinkIcon, Loader2Icon, LogOutIcon } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { LogoMark } from "@/components/Logo";

// Imported Components
import { Button } from "@/components/ui/button";
import LoginForm from "./LoginForm";
import ConnectionNotice, { useServerOffline } from "./ConnectionNotice";

// Functional Component
export default function Shell({ children }: { children: React.ReactNode }) {
	// Rendering
	return (
		<div className="bg-nevoa flex min-h-svh flex-col">
			<ConnectionNotice />
			<AuthLoading>
				<LoadingOrLogin />
			</AuthLoading>
			<Unauthenticated>
				<LoginForm />
			</Unauthenticated>
			<Authenticated>
				<TopBar />
				<main className="mx-auto w-full max-w-3xl flex-1 px-5 py-8 md:py-12">
					{children}
				</main>
			</Authenticated>
		</div>
	);
}

// While offline the auth check never finishes; show the login (with the notice) instead of a spinner
function LoadingOrLogin() {
	const offline = useServerOffline();
	if (offline) return <LoginForm />;
	return (
		<div className="flex flex-1 items-center justify-center">
			<Loader2Icon
				aria-label="Carregando"
				className="text-vidro size-8 animate-spin"
			/>
		</div>
	);
}

function TopBar() {
	// Variables
	const { signOut } = useAuthActions();
	const me = useQuery(api.users.me);

	// Rendering
	return (
		<header className="bg-vidro sticky top-0 z-30 text-white">
			<div className="mx-auto flex h-16 max-w-3xl items-center justify-between gap-4 px-5">
				<Link href="/painel" className="flex items-center gap-2.5">
					<LogoMark className="size-8" />
					<span className="text-medium font-extrabold font-stretch-expanded">
						Light Films
					</span>
					<span className="text-sm text-white/60">Painel</span>
				</Link>
				<div className="flex items-center gap-1">
					<Button
						asChild
						variant="ghost"
						size="sm"
						className="text-white/80 hover:bg-white/10 hover:text-white"
					>
						<a href="/" target="_blank" rel="noopener noreferrer">
							<ExternalLinkIcon />
							<span className="hidden sm:inline">Ver site</span>
						</a>
					</Button>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => void signOut()}
						className="text-white/80 hover:bg-white/10 hover:text-white"
						title={me?.email}
					>
						<LogOutIcon />
						Sair
					</Button>
				</div>
			</div>
		</header>
	);
}
