import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Cpu, Database, ExternalLink, Github, Layers, Monitor, Sparkles, Wrench, X, Zap, Brain } from "lucide-react";
import { useEffect, useState } from "react";
import type { ProjectItem } from "../lib/projects";

const FOCUS_RING_CLASS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.85_0.18_200)] focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const iconMap = {
  sparkles: Sparkles,
  layers: Layers,
  brain: Brain,
  monitor: Monitor,
  zap: Zap,
  wrench: Wrench,
  cpu: Cpu,
  database: Database,
};

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <div className="max-w-2xl">
      <div className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[oklch(0.85_0.18_200)]">{eyebrow}</div>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-[15px]">{copy}</p>
    </div>
  );
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[oklch(0.12_0.03_270/0.6)] px-4 py-3 text-sm">
      <div className="font-display text-lg font-semibold text-white">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">{label}</div>
    </div>
  );
}

export function ProjectCaseStudyPage({ project }: { project: ProjectItem }) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedImage === null) {
        if (event.key === "Escape") setSelectedImage(null);
        return;
      }
      if (event.key === "Escape") setSelectedImage(null);
      if (event.key === "ArrowRight") setSelectedImage((current) => (current === null ? 0 : (current + 1) % project.screenshots.length));
      if (event.key === "ArrowLeft") setSelectedImage((current) => (current === null ? project.screenshots.length - 1 : (current - 1 + project.screenshots.length) % project.screenshots.length));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project.screenshots.length, selectedImage]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,oklch(0.72_0.2_260/0.16),transparent_32%),radial-gradient(circle_at_bottom_right,oklch(0.85_0.18_200/0.16),transparent_28%),linear-gradient(180deg,rgba(8,10,20,0.94),rgba(8,10,20,1))] text-foreground">
      <div className="absolute inset-0 bg-grid opacity-25" />
      <div className="relative mx-auto flex max-w-6xl flex-col px-5 py-8 sm:px-6 lg:px-8 lg:py-12">
        <a href="/" className={`inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-white/15 hover:text-foreground ${FOCUS_RING_CLASS}`}>
          <ArrowLeft className="h-4 w-4" /> Back to portfolio
        </a>

        <main className="mt-8 space-y-24 pb-16">
          <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="rounded-[2rem] border border-white/10 bg-[oklch(0.11_0.025_270/0.72)] p-6 shadow-[0_24px_70px_rgba(5,10,20,0.28)] backdrop-blur-2xl sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <div className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-muted-foreground">
                  {project.category}
                </div>
                <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">{project.name}</h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">{project.desc}</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <StatPill label="Timeline" value={project.timeline} />
                  <StatPill label="Role" value={project.role} />
                  <StatPill label="Status" value={project.status} />
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <motion.a href={project.liveHref} target="_blank" rel="noreferrer" whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }} className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[image:var(--gradient-aurora)] px-5 py-2.8 text-sm font-semibold text-background shadow-[0_0_35px_oklch(0.72_0.2_260/0.35)] ${FOCUS_RING_CLASS}`}>
                    <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.35),transparent)] transition-transform duration-700 group-hover:translate-x-full" />
                    <ExternalLink className="relative h-4 w-4" />
                    <span className="relative">Live Demo</span>
                  </motion.a>
                  <motion.a href={project.sourceHref} target="_blank" rel="noreferrer" whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }} className={`group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-2.8 text-sm font-semibold text-foreground/95 backdrop-blur-xl transition-all duration-300 hover:bg-[oklch(0.72_0.2_260/0.16)] ${FOCUS_RING_CLASS}`}>
                    <Github className="h-4 w-4" />
                    <span>GitHub</span>
                  </motion.a>
                </div>
              </div>
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-[oklch(0.12_0.025_270/0.78)] p-3">
                <img src={project.image} alt={`${project.name} preview`} className="h-full w-full rounded-[1.25rem] object-cover" loading="eager" />
              </motion.div>
            </div>
          </motion.section>

          <Reveal>
            <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-[1.6rem] border border-white/10 bg-[oklch(0.11_0.025_270/0.72)] p-7">
                <SectionHeading eyebrow="Overview" title="What problem it solved" copy="A focused look at the challenge, the product thinking, and the outcomes that shaped the build." />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.6rem] border border-white/10 bg-[oklch(0.11_0.025_270/0.72)] p-6">
                  <div className="text-sm font-semibold text-white">Problem statement</div>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{project.problem}</p>
                </div>
                <div className="rounded-[1.6rem] border border-white/10 bg-[oklch(0.11_0.025_270/0.72)] p-6">
                  <div className="text-sm font-semibold text-white">Solution</div>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{project.solution}</p>
                </div>
                <div className="sm:col-span-2 rounded-[1.6rem] border border-white/10 bg-[oklch(0.12_0.03_270/0.72)] p-6">
                  <div className="text-sm font-semibold text-white">Objectives</div>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
                    {project.objectives.map((objective) => (
                      <li key={objective} className="flex items-start gap-2"><span className="mt-2 h-2 w-2 rounded-full bg-[oklch(0.85_0.18_200)]" />{objective}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </Reveal>

          <Reveal delay={0.05}>
            <section className="rounded-[1.8rem] border border-white/10 bg-[oklch(0.11_0.025_270/0.72)] p-6 sm:p-8">
              <SectionHeading eyebrow="Architecture" title="How the system fits together" copy="A modern, modular approach that keeps the experience smooth and maintainable." />
              <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                {project.architecture.map((step, index) => (
                  <div key={step.title} className="flex flex-1 flex-col items-center text-center lg:flex-row lg:text-left">
                    <div className="rounded-[1.2rem] border border-white/10 bg-[oklch(0.14_0.03_270/0.7)] p-5 shadow-[0_10px_30px_rgba(5,10,20,0.18)]">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[oklch(0.85_0.18_200)]">{step.title}</div>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{step.description}</p>
                    </div>
                    {index < project.architecture.length - 1 ? <div className="my-3 h-10 w-px bg-white/10 lg:mx-4 lg:my-0 lg:h-px lg:w-10" /> : null}
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal delay={0.08}>
            <section className="rounded-[1.8rem] border border-white/10 bg-[oklch(0.11_0.025_270/0.72)] p-6 sm:p-8">
              <SectionHeading eyebrow="Features" title="What makes it feel premium" copy="The experience is shaped around clarity, speed, and delight." />
              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {project.featureHighlights.map((feature, index) => {
                  const Icon = iconMap[feature.icon as keyof typeof iconMap] ?? Sparkles;
                  return (
                    <motion.div key={feature.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: 0.5, delay: index * 0.06 }} className="group rounded-[1.4rem] border border-white/10 bg-[oklch(0.13_0.03_270/0.72)] p-6 shadow-[0_12px_40px_rgba(5,10,20,0.18)] transition-all hover:-translate-y-1 hover:border-[oklch(0.72_0.2_260)]">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[image:var(--gradient-aurora)] text-background">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-5 font-display text-xl font-semibold text-white">{feature.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">{feature.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          </Reveal>

          <Reveal delay={0.1}>
            <section className="rounded-[1.8rem] border border-white/10 bg-[oklch(0.11_0.025_270/0.72)] p-6 sm:p-8">
              <SectionHeading eyebrow="Screenshots" title="A closer look at the experience" copy="Responsive visuals designed to feel cinematic and clear across devices." />
              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {project.screenshots.map((screenshot, index) => (
                  <motion.button key={screenshot.title} type="button" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: 0.5, delay: index * 0.06 }} onClick={() => setSelectedImage(index)} className={`group overflow-hidden rounded-[1.3rem] border border-white/10 bg-[oklch(0.13_0.03_270/0.72)] p-2 text-left ${FOCUS_RING_CLASS}`}>
                    <img src={screenshot.src} alt={screenshot.alt} className="h-56 w-full rounded-[1rem] object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    <div className="px-2 pb-1 pt-3 text-sm font-medium text-foreground">{screenshot.title}</div>
                  </motion.button>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal delay={0.12}>
            <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
              <div className="rounded-[1.8rem] border border-white/10 bg-[oklch(0.11_0.025_270/0.72)] p-6 sm:p-8">
                <SectionHeading eyebrow="Technical challenges" title="What was hard and how it was solved" copy="The engineering work behind the polished experience." />
                <div className="mt-7 space-y-4">
                  {project.challenges.map((challenge) => (
                    <div key={challenge.title} className="rounded-[1.2rem] border border-white/10 bg-[oklch(0.13_0.03_270/0.7)] p-4">
                      <div className="text-sm font-semibold text-white">{challenge.title}</div>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">{challenge.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[1.8rem] border border-white/10 bg-[oklch(0.11_0.025_270/0.72)] p-6 sm:p-8">
                <SectionHeading eyebrow="Technologies" title="The tools that shaped it" copy="Selected technologies used to deliver the experience with speed and reliability." />
                <div className="mt-7 flex flex-wrap gap-3">
                  {project.technologies.map((technology) => (
                    <motion.button key={technology} whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }} className="rounded-full border border-white/10 bg-[oklch(0.14_0.03_270/0.75)] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground transition-all hover:border-[oklch(0.72_0.2_260)] hover:text-foreground">
                      {technology}
                    </motion.button>
                  ))}
                </div>
              </div>
            </section>
          </Reveal>

          <Reveal delay={0.14}>
            <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
              <div className="rounded-[1.8rem] border border-white/10 bg-[oklch(0.11_0.025_270/0.72)] p-6 sm:p-8">
                <SectionHeading eyebrow="Lessons learned" title="What this project taught me" copy="The skills and knowledge I gained while building it." />
                <ul className="mt-7 space-y-3 text-sm leading-7 text-muted-foreground">
                  {project.lessons.map((lesson) => (
                    <li key={lesson} className="flex items-start gap-2"><span className="mt-2 h-2 w-2 rounded-full bg-[oklch(0.85_0.18_200)]" />{lesson}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[1.8rem] border border-white/10 bg-[oklch(0.11_0.025_270/0.72)] p-6 sm:p-8">
                <SectionHeading eyebrow="Future improvements" title="What comes next" copy="The next enhancements I’d ship to make the experience even stronger." />
                <ul className="mt-7 space-y-3 text-sm leading-7 text-muted-foreground">
                  {project.future.map((future) => (
                    <li key={future} className="flex items-start gap-2"><span className="mt-2 h-2 w-2 rounded-full bg-[oklch(0.85_0.18_200)]" />{future}</li>
                  ))}
                </ul>
              </div>
            </section>
          </Reveal>

          <Reveal delay={0.16}>
            <section className="rounded-[1.8rem] border border-white/10 bg-[oklch(0.11_0.025_270/0.72)] p-6 sm:p-8">
              <SectionHeading eyebrow="Related projects" title="Continue exploring" copy="A few adjacent builds that share the same product and engineering thinking." />
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {project.relatedProjectSlugs.map((slug) => {
                  const related = project.relatedProjectSlugs.includes(slug) ? null : null;
                  return (
                    <a key={slug} href={`/projects/${slug}`} className={`group rounded-[1.2rem] border border-white/10 bg-[oklch(0.13_0.03_270/0.72)] p-5 transition-all hover:border-[oklch(0.72_0.2_260)] hover:bg-[oklch(0.16_0.04_280/0.75)] ${FOCUS_RING_CLASS}`}>
                      <div className="flex items-center justify-between gap-3">
                        <div className="font-display text-lg font-semibold text-white">{slug.replace(/-/g, " ")}</div>
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">See the full case study for this adjacent project.</p>
                    </a>
                  );
                })}
              </div>
            </section>
          </Reveal>
        </main>
      </div>

      <AnimatePresence>
        {selectedImage !== null ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] flex items-center justify-center bg-[rgba(2,6,23,0.8)] px-4 py-6 backdrop-blur-xl">
            <div className="relative w-full max-w-5xl rounded-[1.5rem] border border-white/10 bg-[oklch(0.11_0.025_270/0.88)] p-3 shadow-[0_35px_120px_rgba(0,0,0,0.45)]">
              <button type="button" onClick={() => setSelectedImage(null)} className={`absolute right-3 top-3 z-10 rounded-full border border-white/10 bg-white/10 p-2 text-white transition hover:bg-white/15 ${FOCUS_RING_CLASS}`}>
                <X className="h-4 w-4" />
              </button>
              <img src={project.screenshots[selectedImage].src} alt={project.screenshots[selectedImage].alt} className="max-h-[75vh] w-full rounded-[1.1rem] object-contain" />
              <div className="flex items-center justify-between gap-3 px-2 pb-1 pt-4">
                <div>
                  <div className="text-sm font-semibold text-white">{project.screenshots[selectedImage].title}</div>
                  <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Use ← and → to navigate</div>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => setSelectedImage((current) => (current === null ? project.screenshots.length - 1 : (current - 1 + project.screenshots.length) % project.screenshots.length))} className={`rounded-full border border-white/10 bg-white/10 p-2 text-white transition hover:bg-white/15 ${FOCUS_RING_CLASS}`}>
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={() => setSelectedImage((current) => (current === null ? 0 : (current + 1) % project.screenshots.length))} className={`rounded-full border border-white/10 bg-white/10 p-2 text-white transition hover:bg-white/15 ${FOCUS_RING_CLASS}`}>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
