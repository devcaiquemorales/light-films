// Client side
"use client";

// Imports
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { navLinks, site } from "@/lib/site";

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
	// Rendering
	return (
		<header className="relative isolate z-10 bg-primary-400">
			<nav className="mx-auto flex h-20 w-[90%] max-w-7xl items-center justify-between">
				<Link href="/" title={site.name} className="text-base font-bold text-white">
					{site.name}
				</Link>

				{/* Desktop */}
				<ul className="hidden items-center gap-8 text-sm md:flex">
					{navLinks.map((item) => (
						<li key={item.id}>
							<Link
								href={`/#${item.id}`}
								className="font-medium text-white underline-offset-8 hover:underline"
							>
								{item.name}
							</Link>
						</li>
					))}
				</ul>

				{/* Mobile */}
				<Sheet>
					<SheetTrigger asChild>
						<Button
							variant="ghost"
							size="icon-lg"
							className="text-white hover:bg-white/10 hover:text-white aria-expanded:bg-transparent aria-expanded:text-white md:hidden"
							aria-label="Abrir menu"
						>
							<MenuIcon className="size-8" />
						</Button>
					</SheetTrigger>
					<SheetContent
						side="left"
						// Don't refocus the trigger on close, or it scrolls back to the top
						onCloseAutoFocus={(e) => e.preventDefault()}
						className="border-none bg-primary-400 text-white [&_[data-slot=sheet-close]]:text-white"
					>
						<SheetHeader>
							<SheetTitle className="text-white">{site.name}</SheetTitle>
							<SheetDescription className="sr-only">
								Menu de navegação
							</SheetDescription>
						</SheetHeader>
						<ul className="flex flex-1 flex-col items-center justify-center gap-8 text-sm">
							{navLinks.map((item) => (
								<li key={item.id}>
									<SheetClose asChild>
										<Link href={`/#${item.id}`} className="font-medium text-white">
											{item.name}
										</Link>
									</SheetClose>
								</li>
							))}
						</ul>
					</SheetContent>
				</Sheet>
			</nav>
		</header>
	);
}
