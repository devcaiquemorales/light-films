// Imported Components
import Image from "next/image";

// Types
interface ItemType {
	title: string;
	img: string;
	text: string;
}

// Functional Component
export default function Item(props: ItemType) {
	// Rendering
	return (
		<li className="flex flex-col gap-4">
			<Image
				src={props.img}
				alt=""
				width={1024}
				height={687}
				sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
				className="aspect-[3/2] rounded-sm object-cover"
			/>
			<div>
				<h3 className="text-medium text-vidro font-bold font-stretch-expanded">
					{props.title}
				</h3>
				<p className="text-muted-foreground mt-1.5 text-base text-pretty">
					{props.text}
				</p>
			</div>
		</li>
	);
}
