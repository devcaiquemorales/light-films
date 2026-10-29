// Client Side
"use client";

// Imports
import { useState } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import {
	ChevronRightIcon,
	ImageIcon,
	ImagesIcon,
	PlusIcon,
} from "lucide-react";
import { api } from "@/convex/_generated/api";

// Imported Components
import StatusPill from "./_components/StatusPill";
import FilterTabs from "./_components/FilterTabs";
import { Button } from "@/components/ui/button";

const dateFormat = new Intl.DateTimeFormat("pt-BR", {
	day: "numeric",
	month: "short",
});

// Types
type Filter = "todos" | "site" | "rascunho";

const filters: { id: Filter; label: string; dot?: string }[] = [
	{ id: "todos", label: "Todos" },
	{ id: "site", label: "No site", dot: "bg-emerald-500" },
	{ id: "rascunho", label: "Rascunhos", dot: "bg-vidro/40" },
];

// Functional Component
export default function PanelHome() {
	// Variables
	const me = useQuery(api.users.me);
	const projects = useQuery(api.projects.list);
	const firstName = me?.name?.split(" ")[0];
	const [filter, setFilter] = useState<Filter>("todos");

	const counts = {
		todos: projects?.length ?? 0,
		site: projects?.filter((project) => project.published).length ?? 0,
		rascunho: projects?.filter((project) => !project.published).length ?? 0,
	};
	const visible = projects?.filter((project) =>
		filter === "todos"
			? true
			: filter === "site"
				? project.published
				: !project.published
	);

	// Rendering
	return (
		<div className="flex flex-col gap-8">
			<section className="flex flex-col gap-2">
				<h1 className="text-vidro text-xl font-bold font-stretch-expanded">
					{firstName ? `Olá, ${firstName}!` : "Olá!"}
				</h1>
				<p className="text-muted-foreground text-medium">
					{projects?.length === 0
						? "Vamos publicar o primeiro projeto?"
						: "O que vamos publicar hoje?"}
				</p>
			</section>

			<section className="flex flex-col gap-4">
				<div className="flex items-center justify-between gap-4">
					<h2 className="text-vidro text-medium font-bold font-stretch-expanded">
						Seus projetos
					</h2>
					<Button
						asChild
						variant="brand"
						size="lg"
						className="h-11 rounded-full px-5 font-semibold"
					>
						<Link href="/painel/projetos/novo">
							<PlusIcon />
							Novo projeto
						</Link>
					</Button>
				</div>

				{/* Live counts double as filters, so they read as real data */}
				{projects && projects.length > 0 && (
					<FilterTabs
						label="Filtrar projetos"
						value={filter}
						onChange={setFilter}
						tabs={filters.map((item) => ({ ...item, count: counts[item.id] }))}
					/>
				)}

				{visible?.length === 0 && projects && projects.length > 0 && (
					<p className="text-muted-foreground rounded-lg bg-white p-6 text-base">
						{filter === "site"
							? "Nenhum projeto aparecendo no site."
							: "Nenhum rascunho."}
					</p>
				)}

				{projects === undefined && (
					<ul className="grid gap-4 sm:grid-cols-2">
						{[0, 1].map((item) => (
							<li
								key={item}
								className="aspect-[4/3.6] animate-pulse rounded-lg bg-white"
							/>
						))}
					</ul>
				)}

				{projects?.length === 0 && (
					<p className="text-muted-foreground rounded-lg bg-white p-6 text-base">
						Nenhum projeto ainda. Toque em Novo projeto para publicar o
						primeiro.
					</p>
				)}

				{visible && visible.length > 0 && (
					// New key per filter remounts the grid so the cards play their entrance again
					<ul key={filter} className="grid gap-4 sm:grid-cols-2">
						{visible.map((project, index) => (
							<li
								key={project._id}
								style={{ animationDelay: `${index * 60}ms` }}
								className="animate-in fade-in slide-in-from-bottom-3 fill-mode-both duration-500 ease-out motion-reduce:animate-none"
							>
								<Link
									href={`/painel/projetos/${project._id}`}
									className="group focus-visible:ring-ring/50 flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-[0_1px_2px_rgb(27_55_72/0.06)] transition-shadow hover:shadow-[0_16px_32px_-20px_rgb(27_55_72/0.45)] focus-visible:ring-3 focus-visible:outline-none"
								>
									<span className="relative block">
										{project.coverUrl ? (
											// eslint-disable-next-line @next/next/no-img-element -- storage URLs come from Convex, not a fixed host
											<img
												src={project.coverUrl}
												alt=""
												className="aspect-[16/10] w-full object-cover"
											/>
										) : (
											<span className="bg-nevoa text-reflexo flex aspect-[16/10] w-full items-center justify-center">
												<ImageIcon className="size-8" />
											</span>
										)}
										<StatusPill
											published={project.published}
											className="absolute top-3 left-3 shadow-sm"
										/>
									</span>
									<span className="flex flex-1 items-center gap-3 p-4">
										<span className="flex min-w-0 flex-1 flex-col gap-1">
											<span className="text-vidro truncate text-base font-bold">
												{project.title}
											</span>
											<span className="text-muted-foreground flex items-center gap-1.5 text-sm">
												<ImagesIcon aria-hidden className="size-4" />
												{project.photoCount}{" "}
												{project.photoCount === 1 ? "foto" : "fotos"} · editado
												em {dateFormat.format(project.updatedAt)}
											</span>
										</span>
										<span className="text-ceu text-sm font-semibold">
											Editar
											<ChevronRightIcon
												aria-hidden
												className="ml-0.5 inline size-4 transition-transform group-hover:translate-x-0.5"
											/>
										</span>
									</span>
								</Link>
							</li>
						))}
					</ul>
				)}
			</section>
		</div>
	);
}
