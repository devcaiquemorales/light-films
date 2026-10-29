// Imported Components
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

// Types
interface ItemType {
	title: string;
	img: string;
}

// Functional Component
export default function Item(props: ItemType) {
	// Rendering
	return (
		<Card className="group gap-0 py-0">
			<div className="aspect-video overflow-hidden">
				<Image
					src={props.img}
					alt={props.title}
					width={343}
					height={171}
					className="h-full object-cover duration-300 ease-in-out group-hover:scale-110"
				/>
			</div>
			<CardContent className="py-4 text-center">
				<h3 className="text-sm font-bold text-primary-400 uppercase">
					{props.title}
				</h3>
			</CardContent>
		</Card>
	);
}
