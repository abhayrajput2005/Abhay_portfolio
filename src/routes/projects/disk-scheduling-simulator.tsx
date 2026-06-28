import { createFileRoute } from "@tanstack/react-router";
import { ProjectCaseStudyPage } from "../../components/ProjectCaseStudy";
import { PROJECTS } from "../../lib/projects";

export const Route = createFileRoute("/projects/disk-scheduling-simulator")({
  component: () => {
    const project = PROJECTS.find((item) => item.slug === "disk-scheduling-simulator");
    if (!project) return null;
    return <ProjectCaseStudyPage project={project} />;
  },
});
