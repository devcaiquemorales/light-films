// Imports
import { getProjects } from "@/lib/projects";

// Imported Components
import ProjectsCarousel from "./Carousel";

// Server part: reads the published projects, the carousel itself runs on the client
export default async function Projects() {
	const projects = await getProjects();
	if (projects.length === 0) return null;
	return <ProjectsCarousel projects={projects} />;
}
