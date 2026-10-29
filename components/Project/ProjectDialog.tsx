// Client Side
"use client";

// Imported Components
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import ProjectGallery from "./ProjectGallery";
import ProjectActions from "./ProjectActions";

// Types
import type { Project } from "@/lib/data/projects";

// Functional Component
export default function ProjectDialog({
	project,
	children,
}: {
	project: Project;
	children: React.ReactNode;
}) {
	// Rendering
	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="max-h-[90svh] overflow-y-auto sm:max-w-3xl">
				<DialogHeader>
					<DialogTitle className="text-medium font-bold text-primary-400">
						{project.title}
					</DialogTitle>
					<DialogDescription className="text-base text-primary-400">
						{project.description[0]}
					</DialogDescription>
				</DialogHeader>
				{project.description.slice(1).map((paragraph) => (
					<p key={paragraph} className="text-base text-primary-400">
						{paragraph}
					</p>
				))}
				<ProjectGallery photos={project.photos} />
				<DialogFooter>
					<ProjectActions project={project} showPageLink />
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
