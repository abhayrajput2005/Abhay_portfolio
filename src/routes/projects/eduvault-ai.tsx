import { createFileRoute } from "@tanstack/react-router";
import { ProjectCaseStudyPage } from "../../components/ProjectCaseStudy";
import { PROJECTS } from "../../lib/projects";

export const Route = createFileRoute("/projects/eduvault-ai")({
  component: () => {
    const project = PROJECTS.find((item) => item.slug === "eduvault-ai");
    if (!project) return null;
    return <ProjectCaseStudyPage project={project} />;
  },
});
