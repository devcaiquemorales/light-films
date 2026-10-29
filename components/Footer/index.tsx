import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

// Functional Component
export default function Footer() {
	// Rendering
	return (
		<footer className="relative bg-primary-400 py-40">
			<div className="mx-auto flex w-[90%] max-w-7xl flex-col items-center gap-2">
				<Link href="/" className="text-lg font-bold text-white">
					{site.name}
				</Link>
				<p className="mb-3 max-w-sm text-center text-sm text-white">
					{site.slogan}
				</p>
				<a
					href={site.facebook}
					title="Abrir facebook da empresa"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						src="/facebook.png"
						alt="Facebook da Light Films"
						width={20}
						height={20}
					/>
				</a>
				<a
					href={site.phoneHref}
					className="mt-2 text-center text-base leading-relaxed font-light text-white hover:underline"
				>
					{site.phone}
				</a>
			</div>
			<p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center text-sm text-gray-400">
				Site desenvolvido por&nbsp;
				<a
					className="hover:underline"
					href="https://caiquemorales.com/"
					target="_blank"
					rel="noopener noreferrer"
					title="Ver portfolio do desenvolvedor do site"
				>
					Caique Morales
				</a>
			</p>
		</footer>
	);
}
