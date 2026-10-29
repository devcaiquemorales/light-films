// Client Side
"use client";

// Imports
import { useEffect, useState } from "react";
import { useConvexConnectionState } from "convex/react";
import { WifiOffIcon } from "lucide-react";

// Shows up when the panel can't reach the server for a few seconds,
// instead of leaving buttons and spinners loading forever
export function useServerOffline() {
	const { isWebSocketConnected } = useConvexConnectionState();
	const [timedOut, setTimedOut] = useState(false);

	useEffect(() => {
		if (isWebSocketConnected) return;
		const timer = setTimeout(() => setTimedOut(true), 4000);
		return () => {
			clearTimeout(timer);
			setTimedOut(false);
		};
	}, [isWebSocketConnected]);

	const offline = !isWebSocketConnected && timedOut;
	return offline;
}

// Functional Component
export default function ConnectionNotice() {
	// Variables
	const offline = useServerOffline();

	// Rendering
	if (!offline) return null;
	return (
		<div role="alert" className="bg-destructive text-white">
			<p className="mx-auto flex max-w-3xl items-center gap-3 px-5 py-3 text-sm font-medium">
				<WifiOffIcon aria-hidden className="size-5 shrink-0" />
				Sem conexão com o painel. Confira a internet; assim que voltar, tudo
				continua de onde parou.
				{process.env.NODE_ENV === "development" &&
					" (Dev: rode `bun run convex`.)"}
			</p>
		</div>
	);
}
