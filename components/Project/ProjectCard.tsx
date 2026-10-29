// Imported Components
import Image from "next/image";
import Link from "next/link";
import ProjectDialog from "./ProjectDialog";

// Types
import type { Project } from "@/lib/data/projects";

// Photo + title. On the home it opens the project dialog; on project listings
// (`link`) it goes straight to the project page.
export default function ProjectCard({
	project,
	sizes,
	link = false,
}: {
	project: Project;
	sizes: string;
	link?: boolean;
}) {
	// Variables
	const className =
		"group flex w-full cursor-pointer flex-col gap-4 text-left focus-visible:outline-none";

	const content = (
		<>
			<span className="ring-ring/50 block overflow-hidden rounded-sm group-focus-visible:ring-3">
				<Image
					className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
					src={project.image}
					alt=""
					width={800}
					height={600}
					sizes={sizes}
				/>
			</span>
			<span className="link-grow text-medium text-vidro self-start font-bold font-stretch-expanded">
				{project.title}
			</span>
		</>
	);

	// Rendering
	if (link) {
		return (
			<Link href={`/projetos/${project.slug}`} className={className}>
				{content}
			</Link>
		);
	}

	return (
		<ProjectDialog project={project}>
			<button type="button" className={className}>
				{content}
			</button>
		</ProjectDialog>
	);
}
