// Client Side
"use client";

// Imports
import { use } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { Loader2Icon } from "lucide-react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

// Imported Components
import ProjectForm from "../../_components/ProjectForm";

// Functional Component
export default function EditProject({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	// Variables
	const { id } = use(params);
	const project = useQuery(api.projects.get, { id: id as Id<"projects"> });

	// Rendering
	if (project === undefined) {
		return (
			<div className="flex justify-center py-20">
				<Loader2Icon
					aria-label="Carregando"
					className="text-vidro size-8 animate-spin"
				/>
			</div>
		);
	}

	if (project === null) {
		return (
			<div className="flex flex-col items-start gap-4">
				<h1 className="text-vidro text-lg font-bold font-stretch-expanded">
					Projeto não encontrado
				</h1>
				<Link href="/painel" className="link-grow text-vidro font-semibold">
					Voltar para os projetos
				</Link>
			</div>
		);
	}

	return (
		<ProjectForm
			id={project._id}
			initial={{
				title: project.title,
				description: project.description,
				published: project.published,
				photos: project.photos.flatMap((photo, index) => {
					const url = project.photoUrls[index];
					return url ? [{ ...photo, url }] : [];
				}),
			}}
		/>
	);
}
