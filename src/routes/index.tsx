import { createFileRoute } from "@tanstack/react-router";
import Portfolio from "@/components/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Abhay Kumar — AI/ML Engineer & Full Stack Developer" },
      { name: "description", content: "Portfolio of Abhay Kumar — AI/ML Engineer and Full Stack Developer building intelligent applications, scalable web platforms, and AI-powered products." },
      { property: "og:title", content: "Abhay Kumar — AI/ML Engineer & Full Stack Developer" },
      { property: "og:description", content: "AI engineer and full-stack developer crafting intelligent, beautiful software." },
    ],
  }),
  component: Portfolio,
});
