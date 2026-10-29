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
		<div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
			{showPageLink && (
				<Button asChild variant="outline" size="lg">
					<Link href={`/projetos/${project.slug}`}>Ver página do projeto</Link>
				</Button>
			)}
			<Button asChild variant="brand-solid" size="lg" className="rounded-[1rem] font-bold">
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
		</div>
	);
}
