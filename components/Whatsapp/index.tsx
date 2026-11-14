import Image from "next/image";
import { whatsappLink } from "@/lib/site";

// Functional Component
export default function Whatsapp() {
	// Rendering
	return (
		<a
			href={whatsappLink(
				"Olá, vim pelo seu site, poderíamos ter uma conversa?"
			)}
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Conversar pelo WhatsApp"
			className="fixed right-5 bottom-5 z-50 drop-shadow-lg md:right-8 md:bottom-8"
		>
			<Image
				src="/whatsapp.png"
				alt=""
				width={512}
				height={512}
				className="h-12 w-12 md:h-16 md:w-16"
			/>
		</a>
	);
}
