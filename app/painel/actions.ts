"use server";

// Imports
import { updateTag } from "next/cache";
import { PROJECTS_TAG } from "@/lib/projects";

// Called by the panel after saving or deleting, so the public site shows the change right away.
// It only drops cached project data; worst case for an outside caller is an extra Convex read.
export async function refreshSite() {
	updateTag(PROJECTS_TAG);
}
