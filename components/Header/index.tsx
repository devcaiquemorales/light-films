// Client side
"use client";

// Imports
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { navLinks, quoteMessage, site, whatsappLink } from "@/lib/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

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

// Functional Component
export default function Header() {
	// Variables
	const active = useActiveSection(navLinks.map((item) => item.id));

	// Rendering
	return (
		<header className="sticky top-0 z-40 border-b border-border/80 bg-nevoa/90 backdrop-blur-md">
			<nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 md:h-20 md:px-10">
				<Link
					href="/"
					title={site.name}
					className="text-medium font-extrabold font-stretch-expanded text-vidro"
				>
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
									className="link-grow font-medium text-vidro/70 [--link-line:var(--color-sol)] hover:text-vidro aria-[current]:text-vidro"
								>
									{item.name}
								</Link>
							</li>
						))}
					</ul>
					<Button asChild variant="brand" size="lg" className="rounded-full px-5 font-semibold">
						<a href={whatsappLink(quoteMessage)} target="_blank" rel="noopener noreferrer">
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
							className="text-vidro aria-expanded:bg-transparent md:hidden"
							aria-label="Abrir menu"
						>
							<MenuIcon className="size-7" />
						</Button>
					</SheetTrigger>
					<SheetContent
						side="right"
						// Don't refocus the trigger on close, or it scrolls back to the top
						onCloseAutoFocus={(e) => e.preventDefault()}
						className="border-none bg-vidro text-white [&>[data-slot=sheet-close]]:text-white"
					>
						<SheetHeader className="border-b border-white/10 pb-4">
							<SheetTitle className="text-sm font-semibold text-white/60">{site.name}</SheetTitle>
							<SheetDescription className="sr-only">Menu de navegação</SheetDescription>
						</SheetHeader>
						<ul className="flex flex-col gap-1 px-4">
							{navLinks.map((item) => (
								<li key={item.id}>
									<SheetClose asChild>
										<Link
											href={`/#${item.id}`}
											aria-current={active === item.id ? "location" : undefined}
											className={cn(
												"flex items-center gap-3 py-3 text-lg font-bold font-stretch-expanded text-white/85 hover:text-white",
												active === item.id && "text-sol hover:text-sol"
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
								<a href={whatsappLink(quoteMessage)} target="_blank" rel="noopener noreferrer">
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
