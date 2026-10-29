import type { Metadata } from "next";
import Benefits from "./(home)/Benefits";
import Hero from "./(home)/Hero";
import Occupation from "./(home)/Occupation";
import Projects from "./(home)/Projects";
import Testimonials from "./(home)/Testimonials";
import Contact from "./(home)/Contact";
import Process from "./(home)/Process";
import Films from "./(home)/Films";
import BeforeAfter from "./(home)/BeforeAfter";
import Faq from "./(home)/Faq";

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
			<Films />
			<BeforeAfter />
			<Projects />
			<Process />
			<Testimonials />
			<Faq />
			<Contact />
		</main>
	);
}
