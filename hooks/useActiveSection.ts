"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Which nav section is on screen: scroll-spy on the home page,
// "projetos" on the projects pages, nothing elsewhere
export function useActiveSection(ids: string[]) {
	const pathname = usePathname();
	const [active, setActive] = useState<string | null>(null);
	const key = ids.join(",");

	useEffect(() => {
		if (pathname !== "/") return;

		const sectionIds = key.split(",");

		// Active = last section whose top has passed the middle of the viewport
		// Cheap enough (a few getBoundingClientRect calls) to run on every scroll event
		const update = () => {
			const line = window.innerHeight * 0.45;
			let current: string | null = null;
			for (const id of sectionIds) {
				const el = document.getElementById(id);
				if (!el) continue;
				const { top, bottom } = el.getBoundingClientRect();
				if (top <= line && bottom > line) current = id;
			}
			setActive(current);
		};

		update();
		window.addEventListener("scroll", update, { passive: true });
		window.addEventListener("resize", update);
		return () => {
			window.removeEventListener("scroll", update);
			window.removeEventListener("resize", update);
		};
	}, [pathname, key]);

	if (pathname.startsWith("/projetos")) return "projetos";
	return pathname === "/" ? active : null;
}
