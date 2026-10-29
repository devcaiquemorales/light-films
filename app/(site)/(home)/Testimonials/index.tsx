// Imported Components
import Section from "@/components/Section";
import Testimonial from "./Testimonial";

import { TestimonialsData } from "./data";

// Functional Component
export default function Testimonials() {
	// Rendering
	return (
		<Section id="clientes" title="Quem já aplicou">
			<div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
				{TestimonialsData.map((testimonial) => (
					<Testimonial
						key={testimonial.name}
						name={testimonial.name}
						role={testimonial.role}
						testimonial={testimonial.testimonial}
						photoPath={testimonial.photoPath}
					/>
				))}
			</div>
		</Section>
	);
}
