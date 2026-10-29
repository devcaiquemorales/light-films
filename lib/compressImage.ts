// Shrinks phone photos before upload: max 2400px on the longest side, WebP
export async function compressImage(
	file: File,
	maxSize = 2400,
	quality = 0.85
): Promise<Blob> {
	const bitmap = await createImageBitmap(file);
	const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
	const width = Math.round(bitmap.width * scale);
	const height = Math.round(bitmap.height * scale);

	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	canvas.getContext("2d")!.drawImage(bitmap, 0, 0, width, height);
	bitmap.close();

	const blob = await new Promise<Blob | null>((resolve) =>
		canvas.toBlob(resolve, "image/webp", quality)
	);
	// Browsers without WebP encoding fall back to the original file
	return blob ?? file;
}
