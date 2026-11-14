import { ImageResponse } from "next/og";

// Home-screen icon on iPhone: full square (iOS rounds the corners itself)
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
	return new ImageResponse(
		<svg width="180" height="180" viewBox="0 0 64 64">
			<rect width="64" height="64" fill="#2a74a6" />
			<path d="M14 16h8.5v24.5H31V48H14z" fill="#ffffff" />
			<path d="M34 16h17v7.5h-8.5v5.5h7v7h-7V48H34z" fill="#cfe6f5" />
		</svg>,
		size
	);
}
