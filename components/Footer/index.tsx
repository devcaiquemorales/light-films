import Image from "next/image";
import Link from "next/link";
import { navLinks, site } from "@/lib/site";
import { LogoMark } from "@/components/Logo";

// Functional Component
export default function Footer() {
	// Rendering
	return (
		<footer className="bg-vidro-escuro px-5 pt-16 pb-10 text-white md:px-10">
			<div className="mx-auto flex max-w-7xl flex-col gap-12">
				<div className="flex flex-col justify-between gap-10 md:flex-row">
					<div className="max-w-sm">
						<Link
							href="/"
							className="inline-flex items-center gap-3 text-lg font-black font-stretch-expanded"
						>
							<LogoMark className="size-10 md:size-11" />
							{site.name}
						</Link>
						<p className="mt-3 text-base text-white/70">
							Película para vidros de casas, escritórios, lojas e prédios em São
							Paulo.
						</p>
					</div>
					<nav
						aria-label="Rodapé"
						className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm"
					>
						{navLinks.map((item) => (
							<Link
								key={item.id}
								href={`/#${item.id}`}
								className="text-white/80 hover:text-white"
							>
								{item.name}
							</Link>
						))}
					</nav>
					<div className="flex flex-col gap-3 text-sm">
						<a href={site.phoneHref} className="text-white/80 hover:text-white">
							{site.phone}
						</a>
						<a
							href={site.facebook}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 text-white/80 hover:text-white"
						>
							<Image
								src="/facebook.png"
								alt=""
								width={16}
								height={16}
								className="size-4"
							/>
							Facebook
						</a>
					</div>
				</div>
				<div className="flex flex-col justify-between gap-2 border-t border-white/[0.07] pt-6 text-sm text-white/50 md:flex-row">
					<p>
						<span className="whitespace-nowrap">
							© {new Date().getFullYear()} {site.name}
						</span>{" "}
						· <span className="whitespace-nowrap">CNPJ {site.cnpj}</span> ·{" "}
						<Link
							href="/politica-de-privacidade"
							className="whitespace-nowrap hover:text-white hover:underline"
						>
							Política de privacidade
						</Link>
					</p>
					<p>
						Site desenvolvido por{" "}
						<a
							className="hover:text-white hover:underline"
							href="https://caiquemorales.com/"
							target="_blank"
							rel="noopener noreferrer"
						>
							Caique Morales
						</a>
					</p>
				</div>
			</div>
		</footer>
	);
}
