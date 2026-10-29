// Client Side
"use client";

// Imported Components
import {
	Dialog,
	DialogContent,
	DialogDescription,
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
			<DialogContent className="max-h-[92svh] gap-0 overflow-y-auto p-0 sm:max-w-4xl [&>[data-slot=dialog-close]]:bg-white [&>[data-slot=dialog-close]]:text-vidro [&>[data-slot=dialog-close]]:shadow-md">
				{/* Photos first: this is a portfolio */}
				<ProjectGallery photos={project.photos} />
				<div className="flex flex-col gap-6 p-6 md:p-8">
					<DialogHeader className="max-w-2xl gap-3 text-left">
						<DialogTitle className="text-lg font-bold font-stretch-expanded text-vidro">
							{project.title}
						</DialogTitle>
						<DialogDescription asChild>
							<div className="flex flex-col gap-3 text-base text-muted-foreground">
								{project.description.map((paragraph) => (
									<p key={paragraph}>{paragraph}</p>
								))}
							</div>
						</DialogDescription>
					</DialogHeader>
					<ProjectActions project={project} showPageLink />
				</div>
			</DialogContent>
		</Dialog>
	);
}
