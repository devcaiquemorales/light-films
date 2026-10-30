// Client Side
"use client";

// Imports
import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAction, useMutation } from "convex/react";
import { ConvexError } from "convex/values";
import { toast } from "sonner";
import {
	ArrowLeftIcon,
	ImagePlusIcon,
	Loader2Icon,
	Trash2Icon,
} from "lucide-react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { compressImage } from "@/lib/compressImage";
import { cn } from "@/lib/utils";

// Imported Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { FieldError } from "@/components/ui/field";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import PhotoList, { type Photo } from "./PhotoList";
import { refreshSite } from "../actions";
import StatusPill from "./StatusPill";

// Types
export type ProjectFormValues = {
	title: string;
	description: string;
	published: boolean;
	photos: Photo[];
};

const empty: ProjectFormValues = {
	title: "",
	description: "",
	published: true,
	photos: [],
};

// Keeps browser autofill and password managers (iCloud, 1Password, LastPass, Bitwarden) quiet
const noAutofill = {
	autoComplete: "off",
	"data-1p-ignore": true,
	"data-lpignore": "true",
	"data-bwignore": true,
	"data-form-type": "other",
};

// Only the stored reference goes to Convex, never the preview URL
const toStored = ({ r2Key, storageId, path }: Photo) => ({
	r2Key,
	storageId,
	path,
});

function errorMessage(error: unknown) {
	return error instanceof ConvexError && typeof error.data === "string"
		? error.data
		: "Algo deu errado. Tente de novo em instantes.";
}

// Functional Component
export default function ProjectForm({
	id,
	initial = empty,
}: {
	id?: Id<"projects">;
	initial?: ProjectFormValues;
}) {
	// Variables
	const router = useRouter();
	const create = useMutation(api.projects.create);
	const update = useMutation(api.projects.update);
	const remove = useMutation(api.projects.remove);
	const getUploadTarget = useAction(api.r2.getUploadTarget);

	const [values, setValues] = useState(initial);
	const [errors, setErrors] = useState<{
		title?: string;
		description?: string;
	}>({});
	const [uploading, setUploading] = useState(0);
	const [saving, setSaving] = useState(false);

	const isUploading = uploading > 0;

	// Functions
	const set = <K extends keyof ProjectFormValues>(
		key: K,
		value: ProjectFormValues[K]
	) => setValues((prev) => ({ ...prev, [key]: value }));

	const upload = async (file: File): Promise<Photo> => {
		const blob = await compressImage(file);
		const preview = URL.createObjectURL(blob);
		const target = await getUploadTarget({ contentType: blob.type });

		// R2: the browser uploads straight to the bucket with a signed URL
		if (target.kind === "r2") {
			const response = await fetch(target.url, {
				method: "PUT",
				headers: { "Content-Type": blob.type },
				body: blob,
			});
			if (!response.ok) throw new Error("upload failed");
			return { r2Key: target.key, url: preview };
		}

		// Fallback while R2 isn't configured: Convex file storage
		const response = await fetch(target.url, {
			method: "POST",
			headers: { "Content-Type": blob.type },
			body: blob,
		});
		if (!response.ok) throw new Error("upload failed");
		const { storageId } = (await response.json()) as {
			storageId: Id<"_storage">;
		};
		return { storageId, url: preview };
	};

	const addPhotos = async (files: File[]) => {
		const images = files.filter((item) => item.type.startsWith("image/"));
		if (images.length === 0) return;
		setUploading((prev) => prev + images.length);
		await Promise.all(
			images.map(async (file) => {
				try {
					const photo = await upload(file);
					setValues((prev) => ({ ...prev, photos: [...prev.photos, photo] }));
				} catch {
					toast.error(`Não foi possível enviar "${file.name}".`);
				} finally {
					setUploading((prev) => prev - 1);
				}
			})
		);
	};

	const save = async (e: React.FormEvent) => {
		e.preventDefault();
		const nextErrors = {
			title:
				values.title.trim().length < 2
					? "Escreva o título do projeto."
					: undefined,
			description:
				values.description.trim().length < 10
					? "Conte em poucas palavras o que foi feito (mínimo 10 letras)."
					: undefined,
		};
		setErrors(nextErrors);
		if (nextErrors.title || nextErrors.description) {
			document
				.getElementById(nextErrors.title ? "title" : "description")
				?.focus();
			return;
		}

		const fields = {
			title: values.title,
			description: values.description,
			published: values.published,
			photos: values.photos.map(toStored),
		};

		setSaving(true);
		try {
			if (id) await update({ id, ...fields });
			else await create(fields);
			await refreshSite();
			toast.success(
				values.published
					? "Projeto salvo e publicado no site."
					: "Projeto salvo como rascunho."
			);
			router.push("/painel");
		} catch (error) {
			toast.error(errorMessage(error));
		} finally {
			setSaving(false);
		}
	};

	const destroy = async () => {
		if (!id) return;
		try {
			await remove({ id });
			await refreshSite();
			toast.success("Projeto excluído.");
			router.push("/painel");
		} catch (error) {
			toast.error(errorMessage(error));
		}
	};

	// Rendering
	return (
		<form
			onSubmit={save}
			noValidate
			autoComplete="off"
			className="flex flex-col gap-6 pb-32"
		>
			<header className="flex flex-col gap-4">
				<Link
					href="/painel"
					className="link-grow text-vidro/70 hover:text-vidro inline-flex items-center gap-2 self-start text-sm font-semibold"
				>
					<ArrowLeftIcon aria-hidden className="size-4" />
					Seus projetos
				</Link>
				<div className="flex flex-wrap items-center gap-3">
					<h1 className="text-vidro text-lg font-bold font-stretch-expanded">
						{id ? values.title || "Editar projeto" : "Novo projeto"}
					</h1>
					{id && <StatusPill published={initial.published} />}
				</div>
			</header>

			<Step number={1} title="Título" htmlFor="title">
				<Input
					id="title"
					value={values.title}
					onChange={(e) => {
						set("title", e.target.value);
						setErrors((prev) => ({ ...prev, title: undefined }));
					}}
					placeholder="Ex.: Sabesp – Unidade Centro"
					aria-invalid={!!errors.title}
					className="h-12 text-base"
					{...noAutofill}
				/>
				<FieldError>{errors.title}</FieldError>
			</Step>

			<Step
				number={2}
				title="O que foi feito"
				htmlFor="description"
				hint='Ex.: "Aplicamos película fumê em 40 janelas da fachada para reduzir o calor."'
			>
				<Textarea
					id="description"
					value={values.description}
					onChange={(e) => {
						set("description", e.target.value);
						setErrors((prev) => ({ ...prev, description: undefined }));
					}}
					aria-invalid={!!errors.description}
					className="min-h-36 text-base"
					{...noAutofill}
				/>
				<FieldError>{errors.description}</FieldError>
			</Step>

			<Step
				number={3}
				title="Fotos"
				hint="A primeira foto da lista é a capa do projeto no site. Para trocar a capa, arraste outra foto para o topo pelos pontinhos."
			>
				<DropZone onFiles={addPhotos} multiple busy={isUploading} />
				<PhotoList
					photos={values.photos}
					uploading={uploading}
					onChange={(photos) => set("photos", photos)}
				/>
			</Step>

			<Step number={4} title="Publicação">
				<label className="bg-nevoa flex cursor-pointer items-center justify-between gap-6 rounded-md p-4">
					<span>
						<span className="text-vidro block text-base font-semibold">
							Mostrar no site
						</span>
						<span className="text-muted-foreground block text-sm">
							{values.published
								? "Ao salvar, o projeto aparece no site."
								: "Fica salvo só aqui no painel, como rascunho."}
						</span>
					</span>
					<Switch
						checked={values.published}
						onCheckedChange={(checked) => set("published", checked)}
						className="data-[state=checked]:bg-ceu scale-125"
					/>
				</label>
			</Step>

			{id && <DeleteProject title={values.title} onConfirm={destroy} />}

			{/* Sticky save bar, always in reach of the thumb on phones */}
			<div className="border-border fixed inset-x-0 bottom-0 z-20 border-t bg-white/95 backdrop-blur">
				<div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-5 py-3">
					<p className="text-muted-foreground hidden text-sm sm:block">
						{isUploading
							? "Enviando fotos, aguarde…"
							: "Tudo pronto? É só salvar."}
					</p>
					<div className="flex flex-1 items-center justify-end gap-2 sm:flex-none">
						<Button
							asChild
							type="button"
							variant="ghost"
							size="lg"
							className="text-vidro"
						>
							<Link href="/painel">Cancelar</Link>
						</Button>
						<Button
							type="submit"
							variant="brand"
							size="brand"
							disabled={saving || isUploading}
							className="min-w-36"
						>
							{(saving || isUploading) && (
								<Loader2Icon className="animate-spin" />
							)}
							{saving ? "Salvando…" : isUploading ? "Enviando…" : "Salvar"}
						</Button>
					</div>
				</div>
			</div>
		</form>
	);
}

// Parts

function Step({
	number,
	title,
	hint,
	htmlFor,
	children,
}: {
	number: number;
	title: string;
	hint?: string;
	htmlFor?: string;
	children: React.ReactNode;
}) {
	const Label = htmlFor ? "label" : "h2";
	return (
		<section className="flex flex-col gap-4 rounded-lg bg-white p-5 shadow-[0_1px_2px_rgb(27_55_72/0.06)] md:p-7">
			<div className="flex gap-3">
				<span
					aria-hidden
					className="bg-vidro flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
				>
					{number}
				</span>
				<div className="flex flex-col gap-1 pt-0.5">
					<Label htmlFor={htmlFor} className="text-vidro text-base font-bold">
						{title}
					</Label>
					{hint && (
						<p className="text-muted-foreground text-sm text-pretty">{hint}</p>
					)}
				</div>
			</div>
			{children}
		</section>
	);
}

function FilePicker({
	multiple = false,
	onFiles,
	children,
	className,
}: {
	multiple?: boolean;
	onFiles: (files: File[]) => void;
	children: React.ReactNode;
	className?: string;
}) {
	const inputId = useId();
	return (
		<label htmlFor={inputId} className={className}>
			{children}
			<input
				id={inputId}
				type="file"
				accept="image/*"
				multiple={multiple}
				className="sr-only"
				onChange={(e) => {
					onFiles(Array.from(e.target.files ?? []));
					e.target.value = "";
				}}
			/>
		</label>
	);
}

function DropZone({
	onFiles,
	multiple = false,
	busy = false,
}: {
	onFiles: (files: File[]) => void;
	multiple?: boolean;
	busy?: boolean;
}) {
	const [over, setOver] = useState(false);

	return (
		<div
			onDragOver={(e) => {
				e.preventDefault();
				setOver(true);
			}}
			onDragLeave={() => setOver(false)}
			onDrop={(e) => {
				e.preventDefault();
				setOver(false);
				onFiles(Array.from(e.dataTransfer.files));
			}}
		>
			<FilePicker
				multiple={multiple}
				onFiles={onFiles}
				className={cn(
					"border-reflexo/70 text-vidro hover:border-ceu hover:bg-ceu/5 flex cursor-pointer items-center gap-4 rounded-md border-2 border-dashed p-4 transition-colors sm:p-5",
					over && "border-ceu bg-ceu/10"
				)}
			>
				<span className="bg-ceu/10 text-ceu flex size-12 shrink-0 items-center justify-center rounded-full">
					{busy ? (
						<Loader2Icon className="size-6 animate-spin" />
					) : (
						<ImagePlusIcon className="size-6" />
					)}
				</span>
				<span className="flex flex-col">
					<span className="text-base font-semibold">
						{multiple ? "Adicionar fotos" : "Escolher foto"}
					</span>
					<span className="text-muted-foreground text-sm">
						Toque para escolher{" "}
						<span className="hidden sm:inline">ou arraste para cá</span>
					</span>
				</span>
			</FilePicker>
		</div>
	);
}

function DeleteProject({
	title,
	onConfirm,
}: {
	title: string;
	onConfirm: () => Promise<void>;
}) {
	const [open, setOpen] = useState(false);
	const [deleting, setDeleting] = useState(false);

	return (
		<>
			<Button
				type="button"
				variant="ghost"
				onClick={() => setOpen(true)}
				className="text-destructive hover:bg-destructive/10 hover:text-destructive self-start"
			>
				<Trash2Icon />
				Excluir projeto
			</Button>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle className="text-vidro text-medium font-bold font-stretch-expanded">
							Excluir este projeto?
						</DialogTitle>
						<DialogDescription className="text-base">
							&quot;{title || "Sem título"}&quot; e as fotos dele saem do site e
							do painel. Não dá para desfazer.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="ghost" size="lg">
								Cancelar
							</Button>
						</DialogClose>
						<Button
							variant="destructive"
							size="lg"
							disabled={deleting}
							onClick={async () => {
								setDeleting(true);
								await onConfirm();
								setDeleting(false);
							}}
						>
							{deleting && <Loader2Icon className="animate-spin" />}
							{deleting ? "Excluindo…" : "Excluir"}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
