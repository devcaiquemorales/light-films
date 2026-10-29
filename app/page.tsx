import type { Metadata } from "next";
import Benefits from "./(home)/Benefits";
import Hero from "./(home)/Hero";
import Occupation from "./(home)/Occupation";
import Projects from "./(home)/Projects";
import Testimonials from "./(home)/Testimonials";
import Contact from "./(home)/Contact";
import Process from "./(home)/Process";

// SEO
export const metadata: Metadata = {
	alternates: { canonical: "/" },
};

// Functional Component
export default function Home() {
	return (
		<main>
			<Hero />
			<Occupation />
			<Benefits />
			<Projects />
			<Process />
			<Testimonials />
			<Contact />
		</main>
	);
}
