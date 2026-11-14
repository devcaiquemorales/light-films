// Client side
"use client";

// Imports
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { navLinks, quoteMessage, site, whatsappLink } from "@/lib/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/Logo";

// Imported Components
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

// On the home page the logo goes back to the very top (the hero has no anchor offset),
// and drops any #section from the URL
function scrollHomeToTop(e: React.MouseEvent<HTMLAnchorElement>) {
	if (window.location.pathname !== "/") return;
	e.preventDefault();
	window.scrollTo({ top: 0, behavior: "smooth" });
	window.history.replaceState(null, "", "/");
}

// Functional Component
export default function Header() {
	// Variables
	const active = useActiveSection(navLinks.map((item) => item.id));

	// Rendering
	return (
		<header className="bg-vidro/95 sticky top-0 z-40 border-b border-white/10 px-5 backdrop-blur-md md:px-10">
			{/* Side padding outside the max width, like the sections, so the edges line up */}
			<nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 md:h-20">
				<Link
					href="/"
					title={site.name}
					onClick={scrollHomeToTop}
					className="text-medium focus-visible:ring-ceu-claro/60 flex items-center gap-3 rounded-sm font-extrabold text-white font-stretch-expanded focus-visible:ring-3 focus-visible:outline-none"
				>
					<LogoMark className="size-8 md:size-9" />
					{site.name}
				</Link>

				{/* Desktop */}
				<div className="hidden items-center gap-8 md:flex">
					<ul className="flex items-center gap-7 text-sm">
						{navLinks.map((item) => (
							<li key={item.id}>
								<Link
									href={`/#${item.id}`}
									aria-current={active === item.id ? "location" : undefined}
									className="link-grow font-medium text-white/70 [--link-line:var(--color-ceu-claro)] hover:text-white aria-[current]:text-white"
								>
									{item.name}
								</Link>
							</li>
						))}
					</ul>
					<Button
						asChild
						variant="brand"
						size="lg"
						className="rounded-full px-5 font-semibold"
					>
						<a
							href={whatsappLink(quoteMessage)}
							target="_blank"
							rel="noopener noreferrer"
						>
							Pedir orçamento
						</a>
					</Button>
				</div>

				{/* Mobile */}
				<Sheet>
					<SheetTrigger asChild>
						<Button
							variant="ghost"
							size="icon-lg"
							className="text-white hover:bg-white/10 hover:text-white aria-expanded:bg-transparent md:hidden"
							aria-label="Abrir menu"
						>
							<MenuIcon className="size-7" />
						</Button>
					</SheetTrigger>
					<SheetContent
						side="right"
						// Don't refocus the trigger on close, or it scrolls back to the top
						onCloseAutoFocus={(e) => e.preventDefault()}
						className="bg-vidro border-none text-white [&>[data-slot=sheet-close]]:text-white"
					>
						<SheetHeader className="border-b border-white/10 pb-4">
							<SheetTitle className="flex items-center gap-2.5 text-sm font-semibold text-white/60">
								<LogoMark className="size-6" />
								{site.name}
							</SheetTitle>
							<SheetDescription className="sr-only">
								Menu de navegação
							</SheetDescription>
						</SheetHeader>
						<ul className="flex flex-col gap-1 px-4">
							{navLinks.map((item) => (
								<li key={item.id}>
									<SheetClose asChild>
										<Link
											href={`/#${item.id}`}
											aria-current={active === item.id ? "location" : undefined}
											className={cn(
												"flex items-center gap-3 py-3 text-lg font-bold text-white/85 font-stretch-expanded hover:text-white",
												active === item.id &&
													"text-ceu-claro hover:text-ceu-claro"
											)}
										>
											{item.name}
										</Link>
									</SheetClose>
								</li>
							))}
						</ul>
						<div className="mt-auto p-4">
							<Button asChild variant="brand" size="brand" className="w-full">
								<a
									href={whatsappLink(quoteMessage)}
									target="_blank"
									rel="noopener noreferrer"
								>
									Pedir orçamento
								</a>
							</Button>
						</div>
					</SheetContent>
				</Sheet>
			</nav>
		</header>
	);
}
