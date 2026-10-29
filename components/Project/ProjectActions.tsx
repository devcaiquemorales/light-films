// Imported Components
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/site";

// Types
import type { Project } from "@/lib/data/projects";

// Functional Component
export default function ProjectActions({
	project,
	showPageLink = false,
}: {
	project: Project;
	showPageLink?: boolean;
}) {
	// Rendering
	return (
		<div className="flex flex-wrap items-center gap-x-6 gap-y-4">
			<Button asChild variant="brand" size="lg" className="h-11 rounded-full px-6 font-semibold">
				<a
					href={whatsappLink(
						`Olá! Vi o projeto ${project.title} no site e gostaria de um orçamento parecido.`
					)}
					target="_blank"
					rel="noopener noreferrer"
				>
					Quero um orçamento parecido
				</a>
			</Button>
			{showPageLink && (
				<Link
					href={`/projetos/${project.slug}`}
					className="link-grow text-sm font-semibold text-vidro"
				>
					Abrir página do projeto
				</Link>
			)}
		</div>
	);
}
