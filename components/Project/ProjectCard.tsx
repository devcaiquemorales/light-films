// Imported Components
import Image from "next/image";
import ProjectDialog from "./ProjectDialog";

// Types
import type { Project } from "@/lib/data/projects";

// Photo + title that opens the project dialog (home carousel and /projetos)
export default function ProjectCard({ project, sizes }: { project: Project; sizes: string }) {
	// Rendering
	return (
		<ProjectDialog project={project}>
			<button
				type="button"
				className="group flex w-full cursor-pointer flex-col gap-4 text-left focus-visible:outline-none"
			>
				<span className="block overflow-hidden rounded-sm ring-ring/50 group-focus-visible:ring-3">
					<Image
						className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
						src={project.image}
						alt=""
						width={800}
						height={600}
						sizes={sizes}
					/>
				</span>
				<span className="link-grow self-start text-medium font-bold font-stretch-expanded text-vidro">
					{project.title}
				</span>
			</button>
		</ProjectDialog>
	);
}
