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
		<div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-6">
			<Button asChild variant="brand" size="lg" className="h-11 w-full rounded-full px-6 font-semibold sm:w-auto">
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
					className="link-grow text-vidro self-center py-1 text-sm font-semibold sm:self-auto"
				>
					Abrir página do projeto
				</Link>
			)}
		</div>
	);
}
