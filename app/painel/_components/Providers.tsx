// Client Side
"use client";

// Imports
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";

// Read at build time; without it the panel shows a setup notice instead of breaking the whole build
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

// Functional Component
export default function Providers({ children }: { children: React.ReactNode }) {
	// Rendering
	if (!convex) {
		return (
			<main className="bg-nevoa flex min-h-svh items-center justify-center px-5">
				<div className="max-w-md rounded-md bg-white p-6 text-center">
					<h1 className="text-vidro text-medium font-bold font-stretch-expanded">
						Painel indisponível
					</h1>
					<p className="text-muted-foreground mt-2 text-sm">
						O painel ainda não foi configurado neste endereço. Falta a variável{" "}
						<code className="text-vidro">NEXT_PUBLIC_CONVEX_URL</code> no
						deploy.
					</p>
				</div>
			</main>
		);
	}

	return <ConvexAuthProvider client={convex}>{children}</ConvexAuthProvider>;
}
