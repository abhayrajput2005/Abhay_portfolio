import { createFileRoute } from "@tanstack/react-router";
import { ProjectCaseStudyPage } from "../../components/ProjectCaseStudy";
import { PROJECTS } from "../../lib/projects";

export const Route = createFileRoute("/projects/heart-disease-prediction")({
  component: () => {
    const project = PROJECTS.find((item) => item.slug === "heart-disease-prediction");
    if (!project) return null;
    return <ProjectCaseStudyPage project={project} />;
  },
});
