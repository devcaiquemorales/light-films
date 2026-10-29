import { ImageResponse } from "next/og";

// Share preview (WhatsApp, Facebook, etc.)
export const alt = "Light Films - Película para vidros em São Paulo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				padding: 80,
				background:
					"linear-gradient(135deg, #1b3748 0%, #243c5a 60%, #2a74a6 100%)",
				color: "white",
			}}
		>
			<div style={{ fontSize: 40, fontWeight: 800 }}>Light Films</div>
			<div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						fontSize: 76,
						lineHeight: 1.05,
					}}
				>
					<div>Menos calor.</div>
					<div>Mais privacidade.</div>
					<div>A mesma vista.</div>
				</div>
				<div style={{ fontSize: 36, color: "#8cc8ec" }}>
					Película para vidros em São Paulo
				</div>
			</div>
		</div>,
		size
	);
}
