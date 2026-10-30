// Client Side
"use client";

// Imports
import {
	DndContext,
	KeyboardSensor,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors,
	type DragEndEvent,
} from "@dnd-kit/core";
import {
	SortableContext,
	arrayMove,
	sortableKeyboardCoordinates,
	useSortable,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import {
	GripVerticalIcon,
	Loader2Icon,
	StarIcon,
	Trash2Icon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types
import type { Id } from "@/convex/_generated/dataModel";

export type Photo = {
	r2Key?: string;
	storageId?: Id<"_storage">;
	path?: string;
	url: string;
};

export const photoKey = (photo: Photo) =>
	photo.r2Key ?? photo.storageId ?? photo.path ?? photo.url;

// Functional Component
export default function PhotoList({
	photos,
	uploading,
	onChange,
}: {
	photos: Photo[];
	uploading: number;
	onChange: (photos: Photo[]) => void;
}) {
	// Variables
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
	);

	// Functions
	const onDragEnd = ({ active, over }: DragEndEvent) => {
		if (!over || active.id === over.id) return;
		const from = photos.findIndex((photo) => photoKey(photo) === active.id);
		const to = photos.findIndex((photo) => photoKey(photo) === over.id);
		onChange(arrayMove(photos, from, to));
	};

	// Rendering
	if (photos.length === 0 && uploading === 0) return null;

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			modifiers={[restrictToVerticalAxis]}
			onDragEnd={onDragEnd}
			accessibility={{
				screenReaderInstructions: {
					draggable:
						"Para mover, aperte espaço, use as setas para cima e para baixo e aperte espaço de novo para soltar.",
				},
			}}
		>
			<SortableContext
				items={photos.map(photoKey)}
				strategy={verticalListSortingStrategy}
			>
				<ol className="divide-border border-border flex flex-col divide-y overflow-hidden rounded-md border">
					{photos.map((photo, index) => (
						<Row
							key={photoKey(photo)}
							photo={photo}
							index={index}
							isCover={index === 0}
							onRemove={() => onChange(photos.filter((_, i) => i !== index))}
						/>
					))}
					{Array.from({ length: uploading }, (_, i) => (
						<li
							key={`uploading-${i}`}
							className="text-vidro/60 flex items-center gap-3 bg-white p-2 pr-3 text-sm"
						>
							<span className="w-9" />
							<span className="bg-nevoa flex aspect-[4/3] w-16 items-center justify-center rounded-sm sm:w-24">
								<Loader2Icon className="size-5 animate-spin" />
							</span>
							Enviando foto…
						</li>
					))}
				</ol>
			</SortableContext>
		</DndContext>
	);
}

function Row({
	photo,
	index,
	isCover,
	onRemove,
}: {
	photo: Photo;
	index: number;
	isCover: boolean;
	onRemove: () => void;
}) {
	// Variables
	const {
		attributes,
		listeners,
		setNodeRef,
		setActivatorNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: photoKey(photo) });

	// Rendering
	return (
		<li
			ref={setNodeRef}
			style={{ transform: CSS.Transform.toString(transform), transition }}
			className={cn(
				"relative flex items-center gap-3 bg-white p-2 pr-3",
				isDragging &&
					"ring-ceu z-10 shadow-[0_12px_30px_-10px_rgb(27_55_72/0.45)] ring-2"
			)}
		>
			{/* Drag handle: only this grabs, so the page still scrolls on phones */}
			<button
				type="button"
				ref={setActivatorNodeRef}
				{...attributes}
				{...listeners}
				aria-label={`Mover foto ${index + 1}`}
				className="text-vidro/40 hover:bg-nevoa hover:text-vidro focus-visible:ring-ring/50 flex h-12 w-9 shrink-0 cursor-grab touch-none items-center justify-center rounded-sm focus-visible:ring-3 focus-visible:outline-none active:cursor-grabbing"
			>
				<GripVerticalIcon className="size-5" />
			</button>

			{/* eslint-disable-next-line @next/next/no-img-element -- local preview / storage URL */}
			<img
				src={photo.url}
				alt={`Foto ${index + 1}`}
				draggable={false}
				className="aspect-[4/3] w-16 shrink-0 rounded-sm object-cover sm:w-24"
			/>

			<div className="flex min-w-0 flex-1 flex-col gap-1">
				<span className="text-vidro text-sm font-semibold whitespace-nowrap tabular-nums">
					Foto {index + 1}
				</span>
				{isCover && (
					<span className="bg-ceu/10 text-ceu inline-flex items-center gap-1 self-start rounded-full px-2 py-0.5 text-xs font-semibold">
						<StarIcon aria-hidden className="size-3 fill-current" />
						Capa
					</span>
				)}
			</div>

			<button
				type="button"
				onClick={onRemove}
				aria-label={`Remover foto ${index + 1}`}
				className="text-vidro/50 hover:bg-destructive/10 hover:text-destructive focus-visible:ring-ring/50 flex size-10 items-center justify-center rounded-md focus-visible:ring-3 focus-visible:outline-none"
			>
				<Trash2Icon className="size-4" />
			</button>
		</li>
	);
}
