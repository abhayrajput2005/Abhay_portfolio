import { memo, useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode, type MouseEvent } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValue, useInView, AnimatePresence, type Variants } from "framer-motion";
import { PROJECTS as PORTFOLIO_PROJECTS } from "../lib/projects";

const PROFILE_LINKS = {
  github: "https://github.com/abhayrajput2005",
  linkedin: "https://www.linkedin.com/in/abhay-kumar-2005-",
  email: "mailto:abhayrajputg0007@gmail.com",
  resume: "/resume/Abhay_Kumar_Resume.pdf",
  projectLive: "https://edu-vault-nine.vercel.app/",
  projectSource: "https://github.com/abhayrajput2005/EduVault-Backend",
};

const CONTACT_EMAIL = "abhayrajputg0007@gmail.com";

const FOCUS_RING_CLASS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.85_0.18_200)] focus-visible:ring-offset-2 focus-visible:ring-offset-background";
import {
  Github, Linkedin, Mail, Download, ArrowDown, ExternalLink, Code2, Database, Cpu,
  Wrench, Layers, Brain, Award, Briefcase, GraduationCap, Sparkles, ArrowUp,
  MapPin, Send, Terminal, Zap, Star, GitFork, LoaderCircle, AlertCircle,
} from "lucide-react";

/* ---------- Cursor follower + spotlight ---------- */
function CursorFX() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const spot = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let rx = 0, ry = 0, dx = 0, dy = 0;
    const onMove = (e: PointerEvent) => {
      dx = e.clientX; dy = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${dx - 4}px,${dy - 4}px,0)`;
      if (spot.current) spot.current.style.background = `radial-gradient(600px circle at ${dx}px ${dy}px, oklch(0.72 0.2 260 / 0.12), transparent 40%)`;
    };
    const loop = () => {
      rx += (dx - rx) * 0.15; ry += (dy - ry) * 0.15;
      if (ring.current) ring.current.style.transform = `translate3d(${rx - 18}px,${ry - 18}px,0)`;
      raf = requestAnimationFrame(loop);
    };
    let raf = requestAnimationFrame(loop);
    window.addEventListener("pointermove", onMove);
    return () => { window.removeEventListener("pointermove", onMove); cancelAnimationFrame(raf); };
  }, []);
  return (
    <>
      <div ref={spot} className="pointer-events-none fixed inset-0 z-[60] hidden md:block" />
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[70] hidden md:block h-2 w-2 rounded-full bg-white mix-blend-difference" />
      <div ref={ring} className="pointer-events-none fixed left-0 top-0 z-[70] hidden md:block h-9 w-9 rounded-full border border-[oklch(0.72_0.2_260)] transition-[width,height] duration-200" />
    </>
  );
}

/* ---------- Background: aurora + grid + particles ---------- */
function Background() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const stars = useMemo(() => Array.from({ length: 22 }, (_, index) => ({
    id: index,
    left: `${(index * 17) % 100}%`,
    top: `${(index * 23) % 100}%`,
    size: 1 + (index % 3) * 0.6,
    delay: (index % 7) * 0.8,
    duration: 3 + (index % 5) * 0.8,
  })), []);
  useEffect(() => {
    const c = canvas.current!; const ctx = c.getContext("2d")!;
    let w = (c.width = window.innerWidth), h = (c.height = window.innerHeight);
    const dots = Array.from({ length: 70 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.6 + 0.4,
    }));
    const onResize = () => { w = c.width = window.innerWidth; h = c.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
        ctx.beginPath();
        const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 4);
        g.addColorStop(0, "rgba(150,180,255,0.8)");
        g.addColorStop(1, "rgba(150,180,255,0)");
        ctx.fillStyle = g;
        ctx.arc(d.x, d.y, d.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i], b = dots[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(150,180,255,${(1 - dist / 120) * 0.15})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,oklch(0.72_0.2_250/0.18),transparent_32%),radial-gradient(circle_at_80%_5%,oklch(0.68_0.25_300/0.20),transparent_28%),radial-gradient(circle_at_50%_100%,oklch(0.85_0.18_200/0.16),transparent_24%),radial-gradient(circle_at_10%_80%,oklch(0.72_0.2_260/0.12),transparent_24%),radial-gradient(circle_at_90%_85%,oklch(0.68_0.25_300/0.11),transparent_22%)]" />
      <div className="absolute -left-24 top-[18%] h-[36rem] w-[36rem] rounded-full bg-[oklch(0.5_0.25_260/0.24)] blur-[140px] animate-aurora" />
      <div className="absolute right-0 top-0 h-[35rem] w-[35rem] rounded-full bg-[oklch(0.55_0.28_300/0.22)] blur-[140px] animate-aurora" style={{ animationDelay: "5s" }} />
      <div className="absolute bottom-0 left-1/3 h-[30rem] w-[30rem] rounded-full bg-[oklch(0.7_0.2_200/0.18)] blur-[140px] animate-aurora" style={{ animationDelay: "10s" }} />
      <div className="absolute inset-x-[10%] top-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:180px_180px]" />
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.45)_50%,transparent_100%)]" />
      <div className="absolute inset-0 opacity-[0.03] mix-blend-screen [background-image:radial-gradient(rgba(255,255,255,0.6)_0.7px,transparent_0.7px)] [background-size:3px_3px]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,20,0.12),rgba(8,10,20,0.48))]" />
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white/80"
          style={{ left: star.left, top: star.top, width: star.size, height: star.size }}
          animate={{ opacity: [0.25, 0.8, 0.25], scale: [0.9, 1.25, 0.9] }}
          transition={{ duration: star.duration, delay: star.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <canvas ref={canvas} className="absolute inset-0 h-full w-full opacity-60" />
    </div>
  );
}

/* ---------- Scroll progress ---------- */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return (
    <motion.div
      style={{ scaleX: x, transformOrigin: "0% 50%" }}
      className="fixed left-0 right-0 top-0 z-[80] h-[2px] bg-gradient-to-r from-[oklch(0.72_0.2_250)] via-[oklch(0.68_0.25_300)] to-[oklch(0.85_0.18_200)]"
    />
  );
}

/* ---------- Navbar ---------- */
const NAV = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#github", label: "GitHub" },
  { href: "#contact", label: "Contact" },
];
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 30);
    f(); window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);

  const handleContactClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5">
        <a href="#top" aria-label="Back to top" className={`flex items-center gap-2 rounded-full px-4 py-2 ${scrolled ? "glass-strong" : ""} ${FOCUS_RING_CLASS}`}>
          <div className="grid h-7 w-7 place-items-center rounded-md bg-[image:var(--gradient-aurora)] text-[11px] font-bold text-background">AK</div>
          <span className="font-display text-sm font-semibold tracking-wide">Abhay Kumar</span>
        </a>
        <nav aria-label="Primary navigation" className={`hidden items-center gap-1 rounded-full px-2 py-1.5 md:flex ${scrolled ? "glass-strong" : "glass"}`}>
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className={`rounded-full px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-[oklch(0.72_0.2_260/0.15)] hover:text-foreground ${FOCUS_RING_CLASS}`}>
              {n.label}
            </a>
          ))}
        </nav>
        <a href="#contact" onClick={handleContactClick} aria-label="Contact me" className={`hidden rounded-full bg-[image:var(--gradient-aurora)] px-4 py-2 text-xs font-semibold text-background shadow-[0_0_20px_oklch(0.72_0.2_260/0.5)] transition-transform hover:scale-105 md:inline-block ${FOCUS_RING_CLASS}`}>
          Let's Connect
        </a>
      </div>
    </header>
  );
}

/* ---------- Magnetic button ---------- */
function Magnetic({ children, className = "", href, onClick, whileHover, whileTap, transition, ariaLabel, type = "button" }: { children: ReactNode; className?: string; href?: string; onClick?: () => void; whileHover?: any; whileTap?: any; transition?: any; ariaLabel?: string; type?: "button" | "submit" | "reset" }) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  const onMove = (e: MouseEvent) => {
    const r = (ref.current as HTMLElement).getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.3);
    y.set((e.clientY - r.top - r.height / 2) * 0.3);
  };
  const onLeave = () => { x.set(0); y.set(0); };
  const Comp: any = href ? motion.a : motion.button;
  return (
    <Comp
      ref={ref as any} href={href} onClick={onClick} aria-label={ariaLabel} type={href ? undefined : type}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      onMouseMove={onMove as any} onMouseLeave={onLeave}
      whileHover={whileHover}
      whileTap={whileTap}
      transition={transition}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </Comp>
  );
}

/* ---------- 3D tilt wrapper ---------- */
function Tilt({ children, className = "", intensity = 10 }: { children: ReactNode; className?: string; intensity?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0); const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });
  const onMove = (e: MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * intensity); rx.set(-py * intensity);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };
  return (
    <motion.div
      ref={ref} onMouseMove={onMove as any} onMouseLeave={onLeave}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Reveal ---------- */
function Reveal({ children, delay = 0, y = 30, className = "" }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >{children}</motion.div>
  );
}

/* ---------- Animated counter ---------- */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now(); const dur = 1500;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setV(Math.round(to * e));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

/* ---------- Typewriter ---------- */
function Typewriter({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[i % words.length];
    const t = setTimeout(() => {
      if (!del) {
        const next = word.slice(0, text.length + 1);
        setText(next);
        if (next === word) setTimeout(() => setDel(true), 1400);
      } else {
        const next = word.slice(0, text.length - 1);
        setText(next);
        if (next === "") { setDel(false); setI(i + 1); }
      }
    }, del ? 40 : 80);
    return () => clearTimeout(t);
  }, [text, del, i, words]);
  return (
    <span className="text-gradient">{text}<span className="animate-blink">|</span></span>
  );
}

const TECH_BADGES = [
  { label: "Python", icon: Cpu },
  { label: "React", icon: Code2 },
  { label: "Flask", icon: Layers },
  { label: "MongoDB", icon: Database },
  { label: "TensorFlow", icon: Brain },
  { label: "Node.js", icon: Terminal },
  { label: "TypeScript", icon: Zap },
];
const ACHIEVEMENT_CARDS = [
  { value: "15+ Projects", label: "Hands-on product work", position: "left-0 top-8 hidden md:block" },
  { value: "AI/ML Intern", label: "Applied intelligence", position: "right-0 top-8 hidden md:block" },
  { value: "Full Stack Developer", label: "End-to-end delivery", position: "left-6 bottom-6 hidden md:block" },
  { value: "20+ Technologies", label: "Modern stack fluency", position: "right-6 bottom-6 hidden md:block" },
];

const GlassBadge = memo(function GlassBadge({ children, className = "", icon: Icon }: { children: ReactNode; className?: string; icon?: typeof Cpu }) {
  return (
    <motion.span
      whileHover={{ y: -4, scale: 1.03, boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 16px 42px rgba(112,121,255,0.22)" }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className={`group relative isolate inline-flex items-center rounded-full ${className}`}
    >
      <span className="absolute inset-0 rounded-full bg-[conic-gradient(from_120deg,rgba(255,255,255,0.65),rgba(123,132,255,0.55),rgba(34,211,238,0.5),rgba(255,255,255,0.65))] opacity-75 blur-[0.5px] transition-all duration-500 group-hover:opacity-100" />
      <span className="absolute inset-[1px] rounded-full bg-[oklch(0.14_0.03_270/0.88)] backdrop-blur-xl" />
      <span className="absolute inset-0 rounded-full bg-[linear-gradient(110deg,transparent_0%,transparent_35%,rgba(255,255,255,0.14)_50%,transparent_65%,transparent_100%)] bg-[length:220%_220%] opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:[background-position:200%_100%]" />
      <span className="relative z-10 inline-flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-2 text-sm font-medium text-foreground/90 shadow-[0_10px_35px_rgba(15,23,42,0.24)]">
        {Icon ? <Icon className="h-3.5 w-3.5 text-[oklch(0.85_0.18_200)]" /> : null}
        <span>{children}</span>
      </span>
    </motion.span>
  );
});

const FloatingStatCard = memo(function FloatingStatCard({ value, label, className = "", index = 0 }: { value: string; label: string; className?: string; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: [0, -8, 0], x: [0, 4, -4, 0], rotate: [0, 1.5, -1.5, 0], scale: [1, 1.01, 1] }}
      transition={{ duration: 4.8 + index * 0.7, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
      className={`rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-center shadow-[0_15px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl ${className}`}
    >
      <div className="text-sm font-semibold text-white">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">{label}</div>
    </motion.div>
  );
});

/* ---------- Particle sphere ---------- */
const ParticleSphere = memo(function ParticleSphere({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!; const ctx = c.getContext("2d")!;
    const size = () => { const s = Math.min(c.parentElement!.clientWidth, 520); c.width = s * 2; c.height = s * 2; c.style.width = s + "px"; c.style.height = s + "px"; };
    size(); window.addEventListener("resize", size);
    const N = 700; const R = 220;
    const pts = Array.from({ length: N }, () => {
      const t = Math.acos(2 * Math.random() - 1);
      const p = 2 * Math.PI * Math.random();
      return { x: R * Math.sin(t) * Math.cos(p), y: R * Math.sin(t) * Math.sin(p), z: R * Math.cos(t) };
    });
    let ry = 0, rx = 0, mx = 0, my = 0;
    const onMove = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      mx = (e.clientX - r.left - r.width / 2) / r.width;
      my = (e.clientY - r.top - r.height / 2) / r.height;
    };
    window.addEventListener("pointermove", onMove);
    let raf = 0;
    const draw = () => {
      const w = c.width, h = c.height;
      ctx.clearRect(0, 0, w, h);
      ry += 0.003 + mx * 0.01;
      rx += my * 0.005;
      const cy = Math.cos(rx), sy_ = Math.sin(rx);
      const cz = Math.cos(ry), sz = Math.sin(ry);
      const proj = pts.map((p) => {
        const x1 = p.x * cz - p.z * sz;
        const z1 = p.x * sz + p.z * cz;
        const y1 = p.y * cy - z1 * sy_;
        const z2 = p.y * sy_ + z1 * cy;
        const f = 600 / (600 + z2);
        return { x: w / 2 + x1 * f * 2, y: h / 2 + y1 * f * 2, z: z2, f };
      });
      proj.sort((a, b) => a.z - b.z);
      for (const p of proj) {
        const alpha = (p.z + 250) / 500;
        const hue = 220 + p.f * 40;
        ctx.fillStyle = `hsla(${hue}, 90%, ${50 + alpha * 30}%, ${0.3 + alpha * 0.7})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6 * p.f, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", size); window.removeEventListener("pointermove", onMove); };
  }, []);
  return (
    <div className={`relative grid place-items-center ${className}`}>
      <motion.div
        className="absolute inset-[-8%] -z-10 rounded-full border border-white/10 bg-[radial-gradient(circle,oklch(0.72_0.2_260/0.25),transparent_70%)]"
        animate={{ scale: [0.94, 1.04, 0.94], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle,oklch(0.72_0.2_260/0.45),transparent_60%)] blur-2xl" />
      <canvas ref={ref} className="rounded-full" />
    </div>
  );
});

/* ---------- Hero ---------- */
function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, 120]);
  const op = useTransform(scrollY, [0, 400], [1, 0]);

  const fadeUp = {
    hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    }),
  } satisfies Variants;

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-24 sm:pt-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 pb-24 sm:gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:px-6 xl:gap-16">
        <motion.div style={{ y: y1, opacity: op }} initial="hidden" animate="visible" className="relative z-10">
          <motion.div custom={0.05} variants={fadeUp} initial="hidden" animate="visible" className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground/90">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span>Available for opportunities</span>
          </motion.div>
          <motion.h1 custom={0.12} variants={fadeUp} initial="hidden" animate="visible" className="mt-7 max-w-3xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[6rem]">
            Building AI That
            <br />
            <span className="text-gradient">Solves Real-World Problems.</span>
          </motion.h1>
          <motion.div custom={0.2} variants={fadeUp} initial="hidden" animate="visible" className="mt-6 flex flex-col gap-2">
            <p className="text-lg font-medium text-[oklch(0.88_0.02_270)] sm:text-xl">Hi, I'm Abhay Kumar</p>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground/80 sm:text-base">AI/ML Engineer • Full Stack Developer</p>
          </motion.div>
          <motion.div custom={0.28} variants={fadeUp} initial="hidden" animate="visible">
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              Passionate about building AI-powered applications, scalable backend systems, and modern web experiences.
            </p>
            <p className="mt-3 max-w-2xl text-base leading-8 text-muted-foreground/90 sm:text-lg">
              I enjoy transforming complex ideas into intuitive products using Machine Learning, Full Stack Development, and Generative AI, with a focus on solving real-world problems.
            </p>
          </motion.div>
          <motion.div custom={0.36} variants={fadeUp} initial="hidden" animate="visible" className="mt-8 flex flex-wrap gap-2.5">
            {TECH_BADGES.map((badge, index) => (
              <motion.div key={badge.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 + index * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                <GlassBadge icon={badge.icon}>{badge.label}</GlassBadge>
              </motion.div>
            ))}
          </motion.div>
          <motion.div custom={0.48} variants={fadeUp} initial="hidden" animate="visible" className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
            <Magnetic href="#projects" whileHover={{ scale: 1.03, y: -3, boxShadow: "0 0 70px rgba(112,121,255,0.45)" }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 260, damping: 20 }} className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[image:var(--gradient-aurora)] px-6 py-3.5 text-sm font-semibold text-background shadow-[0_0_50px_oklch(0.72_0.2_260/0.45)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_70px_oklch(0.72_0.2_260/0.6)]">
              <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.3),transparent)] transition-transform duration-700 group-hover:translate-x-full" />
              <Sparkles className="relative h-4 w-4" />
              <span className="relative">View Projects</span>
            </Magnetic>
            <Magnetic href={PROFILE_LINKS.resume} whileHover={{ scale: 1.03, y: -3, boxShadow: "0 16px 45px rgba(15,23,42,0.24)" }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 260, damping: 20 }} className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-6 py-3.5 text-sm font-semibold text-foreground/95 shadow-[0_10px_35px_rgba(15,23,42,0.24)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[oklch(0.72_0.2_260/0.18)]">
              <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-[-1px]" /> Request Resume
            </Magnetic>
            <Magnetic href={PROFILE_LINKS.github} ariaLabel="View GitHub profile" whileHover={{ scale: 1.03, y: -3 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 240, damping: 16 }} className={`grid h-11 w-11 place-items-center rounded-full glass transition-all duration-300 hover:-translate-y-1 hover:text-[oklch(0.85_0.18_200)] ${FOCUS_RING_CLASS}`}>
              <Github className="h-4 w-4" />
            </Magnetic>
            <Magnetic href={PROFILE_LINKS.linkedin} ariaLabel="View LinkedIn profile" whileHover={{ scale: 1.03, y: -3 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 240, damping: 16 }} className={`grid h-11 w-11 place-items-center rounded-full glass transition-all duration-300 hover:-translate-y-1 hover:text-[oklch(0.72_0.2_250)] ${FOCUS_RING_CLASS}`}>
              <Linkedin className="h-4 w-4" />
            </Magnetic>
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.96, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }} className="mx-auto w-full max-w-[560px]">
          <motion.div animate={{ y: [0, -10, 0], rotate: [0, 1, -1, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="relative">
            <div className="absolute inset-0 rounded-[2rem] bg-[conic-gradient(from_90deg,rgba(255,255,255,0.16),rgba(112,121,255,0.45),rgba(34,211,238,0.45),rgba(255,255,255,0.16))] p-[1px] opacity-80" />
            <div className="relative rounded-[2rem] border border-white/10 bg-[oklch(0.115_0.025_270/0.75)] p-4 shadow-[0_25px_90px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
              <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_30%)]" />
              <div className="relative mb-4 flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-2.5">
                <span className="text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground">AI Neural Core</span>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
              </div>
              <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top,oklch(0.18_0.035_270/0.65),oklch(0.12_0.025_270/0.95))] p-6 sm:p-8">
                <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.14),transparent_38%)]" />
                <div className="relative flex flex-col items-center justify-center">
                  <ParticleSphere className="mx-auto" />
                  <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                    {['AI', 'Machine Learning', 'Backend', 'React', 'Flask'].map((item) => (
                      <span key={item} className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">{item}</span>
                    ))}
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0">
                  {ACHIEVEMENT_CARDS.map((card, index) => (
                    <FloatingStatCard key={card.value} index={index} value={card.value} label={card.label} className={card.position} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent via-[oklch(0.09_0.02_270/0.35)] to-[oklch(0.09_0.02_270)]" />
      <motion.a href="#about" aria-label="Scroll to the About section"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground ${FOCUS_RING_CLASS}`}>
        <div className="flex flex-col items-center gap-2">
          <div className="h-9 w-5 rounded-full border border-border p-1">
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.6, repeat: Infinity }}
              className="h-1.5 w-full rounded-full bg-foreground/60" />
          </div>
          <ArrowDown className="h-3 w-3 animate-bounce" />
        </div>
      </motion.a>
    </section>
  );
}

/* ---------- Section header ---------- */
const SectionHeader = memo(function SectionHeader({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      <Reveal>
        <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
          <Zap className="h-3 w-3 text-[oklch(0.85_0.18_200)]" /> {kicker}
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          {title.split(" ").map((w, i, a) =>
            i === a.length - 1 ? <span key={i} className="text-gradient">{w}</span> : <span key={i}>{w} </span>
          )}
        </h2>
      </Reveal>
      {sub && <Reveal delay={0.2}><p className="mt-4 text-muted-foreground">{sub}</p></Reveal>}
    </div>
  );
});

/* ---------- About ---------- */
const STATS = [
  { label: "Projects Completed", value: 15, suffix: "+" },
  { label: "Technologies", value: 20, suffix: "+" },
  { label: "Internships", value: 2, suffix: "" },
  { label: "Certifications", value: 6, suffix: "+" },
  { label: "Years Learning", value: 4, suffix: "+" },
];
function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeader kicker="About" title="A glimpse into me" />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <Tilt className="glass-strong relative overflow-hidden rounded-3xl p-8" intensity={6}>
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,oklch(0.72_0.2_260/0.25),transparent_60%)]" />
              <div className="flex items-center gap-4">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-[image:var(--gradient-aurora)] font-display text-2xl font-bold text-background shadow-glow">AK</div>
                <div>
                  <div className="font-display text-lg font-semibold">Abhay Kumar</div>
                  <div className="text-xs text-muted-foreground">AI/ML Engineer · Full Stack Dev</div>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" /> India · Remote-friendly
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {["Python", "React", "TensorFlow", "Flask"].map((t) => (
                  <div key={t} className="rounded-xl border border-border bg-[oklch(0.14_0.03_270/0.5)] px-3 py-2 text-center text-xs font-medium">{t}</div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-border bg-[oklch(0.1_0.03_270/0.7)] p-4 font-mono text-xs">
                <div className="text-[oklch(0.85_0.18_200)]">$ whoami</div>
                <div className="text-muted-foreground">builder · learner · problem-solver</div>
                <div className="mt-2 text-[oklch(0.85_0.18_200)]">$ status</div>
                <div className="text-muted-foreground">shipping <span className="text-foreground">EduVault AI</span> ✨</div>
              </div>
            </Tilt>
          </Reveal>
          <div>
            <Reveal>
              <div className="flex items-center gap-3 text-sm font-semibold text-[oklch(0.85_0.18_200)]">
                <GraduationCap className="h-5 w-5" /> B.Tech · Computer Science Engineering (AI/ML)
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-lg leading-relaxed text-foreground/85">
                Passionate about <span className="text-gradient font-semibold">Artificial Intelligence</span>, Full Stack
                Development, Backend Engineering, and Machine Learning. I blend rigorous engineering with creative
                product thinking to ship software that actually moves the needle.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-4 text-muted-foreground">
                Always learning, always building. Currently exploring LLM applications, vector databases, and
                distributed backend systems.
              </p>
            </Reveal>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {STATS.map((s, i) => (
                <Reveal key={s.label} delay={0.05 * i}>
                  <Tilt className="group relative overflow-hidden rounded-2xl glass p-4 text-center" intensity={8}>
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,oklch(0.72_0.2_260/0.25),transparent_70%)] opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="font-display text-3xl font-bold text-gradient">
                      <Counter to={s.value} suffix={s.suffix} />
                    </div>
                    <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
                  </Tilt>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Skills ---------- */
const SKILLS = [
  {
    icon: Code2,
    title: "Programming Languages",
    summary: "Core languages for product logic and AI systems.",
    badge: "Syntax & systems",
    items: [
      { name: "Python", icon: Code2 },
      { name: "Java", icon: Code2 },
      { name: "C++", icon: Code2 },
      { name: "JavaScript", icon: Zap },
      { name: "TypeScript", icon: Terminal },
    ],
  },
  {
    icon: Layers,
    title: "Frontend",
    summary: "Interfaces that feel fast, refined and intuitive.",
    badge: "UI craft",
    items: [
      { name: "React", icon: Layers },
      { name: "HTML", icon: Layers },
      { name: "CSS", icon: Sparkles },
      { name: "Tailwind CSS", icon: Sparkles },
    ],
  },
  {
    icon: Cpu,
    title: "Backend",
    summary: "Reliable services and API architecture.",
    badge: "Services",
    items: [
      { name: "Flask", icon: Cpu },
      { name: "Node.js", icon: Cpu },
      { name: "REST APIs", icon: ArrowUp },
    ],
  },
  {
    icon: Database,
    title: "Databases",
    summary: "Data structures and storage patterns that scale.",
    badge: "Data",
    items: [
      { name: "MongoDB", icon: Database },
      { name: "MySQL", icon: Database },
    ],
  },
  {
    icon: Brain,
    title: "Machine Learning",
    summary: "Models, experimentation and practical inference.",
    badge: "AI",
    items: [
      { name: "TensorFlow", icon: Brain },
      { name: "Scikit-learn", icon: Brain },
      { name: "Pandas", icon: Database },
      { name: "NumPy", icon: Cpu },
    ],
  },
  {
    icon: Wrench,
    title: "Tools",
    summary: "Developer workflow, automation and shipping velocity.",
    badge: "Workflow",
    items: [
      { name: "Git", icon: Wrench },
      { name: "GitHub", icon: Github },
      { name: "Linux", icon: Terminal },
      { name: "VS Code", icon: Code2 },
    ],
  },
];

function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeader
          kicker="Skills"
          title="Technical Arsenal"
          sub="Technologies I use to design, build and deploy modern AI-powered applications."
        />

        <div className="relative mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="pointer-events-none absolute inset-0 hidden lg:block"
          >
            <div className="absolute left-[8%] top-10 h-40 w-40 rounded-full bg-[oklch(0.5_0.25_260/0.16)] blur-[100px]" />
            <div className="absolute right-[10%] top-24 h-48 w-48 rounded-full bg-[oklch(0.55_0.28_300/0.14)] blur-[110px]" />
            <div className="absolute bottom-0 left-1/3 h-36 w-36 rounded-full bg-[oklch(0.7_0.2_200/0.12)] blur-[95px]" />
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-2 w-2 rounded-full bg-white/40"
                style={{ left: `${12 + i * 10}%`, top: `${18 + (i % 4) * 16}%` }}
                animate={{ y: [0, -10, 0], opacity: [0.25, 0.8, 0.25] }}
                transition={{ duration: 3 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
              />
            ))}
          </motion.div>

          {SKILLS.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.article
                key={skill.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, rotate: 0.8, scale: 1.01 }}
                className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[oklch(0.11_0.024_270/0.76)] p-6 shadow-[0_20px_65px_rgba(0,0,0,0.28)] backdrop-blur-xl"
              >
                <div className="absolute inset-0 rounded-[1.75rem] bg-[radial-gradient(circle_at_top_left,oklch(0.72_0.2_260/0.18),transparent_38%),radial-gradient(circle_at_bottom_right,oklch(0.85_0.18_200/0.14),transparent_38%)]" />
                <div className="absolute inset-0 rounded-[1.75rem] border border-transparent transition-all duration-500 group-hover:border-white/15" />
                <div className="absolute inset-[1px] rounded-[1.7rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.1),transparent_40%,rgba(112,121,255,0.12))] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{ y: [0, -4, 0], rotate: [0, 2, 0] }}
                        transition={{ duration: 3.2 + index * 0.25, repeat: Infinity, ease: "easeInOut" }}
                        className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),rgba(255,255,255,0.04))] shadow-[0_12px_35px_rgba(0,0,0,0.2)]"
                      >
                        <Icon className="h-6 w-6 text-[oklch(0.85_0.18_200)]" />
                      </motion.div>
                      <div>
                        <h3 className="font-display text-xl font-semibold text-white">{skill.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">{skill.summary}</p>
                      </div>
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                      {skill.badge}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {skill.items.map((item, pillIndex) => {
                      const ItemIcon = item.icon;
                      return (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{ duration: 0.35, delay: index * 0.05 + pillIndex * 0.04, ease: "easeOut" }}
                          whileHover={{ scale: 1.06, y: -2, boxShadow: "0 0 22px rgba(112,121,255,0.2)" }}
                          className="group/tech relative overflow-hidden rounded-full border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.04))] px-3.5 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                        >
                          <div className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.24),transparent)] opacity-0 transition-opacity duration-500 group-hover/tech:opacity-100" />
                          <div className="relative z-10 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/85">
                            <div className="grid h-5 w-5 place-items-center rounded-full bg-white/10 text-[oklch(0.85_0.18_200)]">
                              <ItemIcon className="h-3 w-3" />
                            </div>
                            <span>{item.name}</span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Projects ---------- */
const PROJECTS = PORTFOLIO_PROJECTS;

const ProjectPreview = memo(function ProjectPreview({ project, image }: { project: (typeof PROJECTS)[number]; image?: string }) {
  return (
    <div className={`relative aspect-[16/9] overflow-hidden rounded-[1.35rem] border border-white/10 bg-[oklch(0.14_0.03_270/0.9)] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-90`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.34),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.16),transparent_25%)]" />
      <div className="absolute inset-0 bg-grid opacity-25 mix-blend-overlay" />
      {image ? (
        <img src={image} alt={`${project.name} preview`} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div className="relative z-10 flex h-full flex-col justify-between rounded-[1rem] border border-white/15 bg-[oklch(0.11_0.025_270/0.72)] p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </div>
            <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/80">
              {project.category}
            </span>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[0.9rem] border border-white/10 bg-white/10 p-3">
              <div className="h-2 w-20 rounded-full bg-white/70" />
              <div className="mt-3 space-y-2">
                <div className="h-2 w-full rounded-full bg-white/40" />
                <div className="h-2 w-4/5 rounded-full bg-white/30" />
                <div className="h-2 w-3/4 rounded-full bg-white/20" />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="h-10 rounded-lg bg-white/15" />
                <div className="h-10 rounded-lg bg-white/15" />
                <div className="h-10 rounded-lg bg-white/15" />
              </div>
            </div>
            <div className="space-y-3 rounded-[0.9rem] border border-white/10 bg-[oklch(0.16_0.03_270/0.7)] p-3">
              <div className="h-10 rounded-lg bg-white/10" />
              <div className="h-16 rounded-lg bg-[linear-gradient(135deg,rgba(255,255,255,0.18),rgba(255,255,255,0.06))]" />
              <div className="h-10 rounded-lg bg-white/10" />
            </div>
          </div>
        </div>
      )}
      <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-[oklch(0.11_0.025_270/0.7)] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.35em] text-white/80 backdrop-blur-xl">
        0{project.name === "EduVault AI" ? 1 : project.name === "Disk Scheduling Simulator" ? 2 : 3}
      </div>
      <div className="absolute right-4 top-4 rounded-full border border-white/15 bg-[oklch(0.11_0.025_270/0.7)] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.3em] text-white/80 backdrop-blur-xl">
        {project.accent}
      </div>
    </div>
  );
});

const ProjectCard = memo(function ProjectCard({ project, reverse = false, index }: { project: (typeof PROJECTS)[number]; reverse?: boolean; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Tilt className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[oklch(0.11_0.025_270/0.72)] p-3 shadow-[0_24px_70px_rgba(5,10,20,0.28)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_35px_90px_rgba(5,10,20,0.38)]" intensity={10}>
        <div className="absolute inset-0 rounded-[1.6rem] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(112,121,255,0.14),transparent_35%)] opacity-100 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute inset-0 rounded-[1.6rem] bg-[conic-gradient(from_90deg,rgba(255,255,255,0.08),rgba(112,121,255,0.14),rgba(34,211,238,0.12),rgba(255,255,255,0.08))] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute inset-0 rounded-[1.6rem] border border-transparent transition-all duration-500 group-hover:border-white/20" />
        <div className="relative grid items-center gap-7 rounded-[1.35rem] border border-white/10 bg-[oklch(0.12_0.025_270/0.78)] p-4 lg:grid-cols-[1.05fr_0.95fr] lg:px-5 lg:py-5 xl:gap-10">
          <div className={`relative ${reverse ? "lg:order-2" : "lg:order-1"}`}>
            <motion.div whileHover={{ scale: 1.03, y: -4 }} transition={{ duration: 0.45, ease: "easeOut" }} className="relative overflow-hidden rounded-[1.3rem]">
              <ProjectPreview project={project} image={project.image} />
              <div className="pointer-events-none absolute inset-0 rounded-[1.3rem] bg-[linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.1)_30%,transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>
          </div>
          <div className={`relative z-10 ${reverse ? "lg:order-1" : "lg:order-2"}`}>
            <motion.div initial={{ opacity: 0, x: reverse ? 16 : -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.15 + index * 0.05, ease: [0.22, 1, 0.36, 1] }}>
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-muted-foreground">
                {project.category}
              </div>
              <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">{project.name}</h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-[15px]">{project.desc}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.features.map((feature) => (
                  <span key={feature} className="rounded-full border border-white/10 bg-[oklch(0.18_0.05_280/0.75)] px-2.8 py-1 text-[11px] font-medium text-foreground/85">
                    {feature}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.metrics.map((metric) => (
                  <span key={metric} className="rounded-full border border-[oklch(0.4_0.1_280/0.4)] bg-[oklch(0.14_0.03_270/0.7)] px-2.7 py-1 text-[11px] font-mono text-[oklch(0.85_0.18_200)]">
                    {metric}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {project.stack.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <motion.a href={`/projects/${project.slug}`} aria-label={`Open ${project.name} case study`} whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }} className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[image:var(--gradient-aurora)] px-5 py-2.5 text-sm font-semibold text-background shadow-[0_0_35px_oklch(0.72_0.2_260/0.35)] ${FOCUS_RING_CLASS}`}>
                  <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.35),transparent)] transition-transform duration-700 group-hover:translate-x-full" />
                  <ExternalLink className="relative h-4 w-4" />
                  <span className="relative">Read case study</span>
                </motion.a>
                <motion.a href={project.sourceHref} aria-label={`Open ${project.name} source code`} whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }} className={`group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-2.5 text-sm font-semibold text-foreground/95 backdrop-blur-xl transition-all duration-300 hover:bg-[oklch(0.72_0.2_260/0.16)] ${FOCUS_RING_CLASS}`}>
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </Tilt>
    </motion.article>
  );
});

function Projects() {
  return (
    <section id="projects" className="relative py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeader kicker="Selected Work" title="Featured projects" sub="Cherry-picked builds that blend AI, full-stack engineering, and craft." />
        <div className="space-y-8 lg:space-y-10">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.name} project={project} reverse={index % 2 === 1} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Experience ---------- */
const EXP = [
  {
    company: "Infosys Springboard",
    role: "AI & ML Internship",
    duration: "2025",
    description: "Built applied ML workflows, explored model evaluation, and contributed to data-driven product thinking.",
    tech: ["Python", "TensorFlow", "Pandas", "Flask"],
  },
  {
    company: "IBM SkillsBuild",
    role: "Backend Development Training",
    duration: "2024",
    description: "Focused on REST APIs, authentication, databases, and building reliable backend systems.",
    tech: ["Flask", "Node.js", "MongoDB", "REST APIs"],
  },
  {
    company: "B.Tech CSE (AI/ML)",
    role: "Student • AI & Software Engineering",
    duration: "2022 — Present",
    description: "Strengthened my foundation in AI, machine learning, OS, DBMS, and modern product engineering.",
    tech: ["Python", "React", "System Design", "ML"],
  },
];

function Experience() {
  return (
    <section id="experience" className="relative py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeader kicker="Experience" title="Selected experience" sub="A refined snapshot of the roles, projects, and learning moments that shaped my path." />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {EXP.map((item, index) => (
            <motion.article key={item.company} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }} className="group relative">
              <Tilt className="relative h-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-[oklch(0.11_0.025_270/0.72)] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl" intensity={8}>
                <div className="absolute inset-0 rounded-[1.5rem] bg-[conic-gradient(from_90deg,rgba(255,255,255,0.08),rgba(112,121,255,0.14),rgba(34,211,238,0.12),rgba(255,255,255,0.08))] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-0 rounded-[1.5rem] border border-transparent transition-all duration-500 group-hover:border-white/15" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-3">
                    <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                      {item.duration}
                    </div>
                    <div className="rounded-full bg-[image:var(--gradient-aurora)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-background">
                      {item.company}
                    </div>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-white">{item.role}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.tech.map((tech) => (
                      <span key={tech} className="rounded-full border border-white/10 bg-[oklch(0.16_0.03_270/0.7)] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/80">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Tilt>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Certifications ---------- */
const CERTS = [
  { title: "IBM SkillsBuild", desc: "Backend Development & Cloud Foundations", icon: Award },
  { title: "Infosys Springboard", desc: "AI & Machine Learning Internship", icon: Brain },
  { title: "AI & ML Internship", desc: "Real-world model development", icon: Cpu },
  { title: "Backend Development Training", desc: "APIs · Databases · Auth", icon: Terminal },
];
function Certifications() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeader kicker="Credentials" title="Certifications" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CERTS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05}>
              <Tilt className="group relative h-full overflow-hidden rounded-2xl glass-strong p-6 transition-shadow hover:shadow-glow" intensity={10}>
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[image:var(--gradient-aurora)] opacity-20 blur-2xl transition-opacity group-hover:opacity-50" />
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-[oklch(0.18_0.05_280/0.6)] text-[oklch(0.85_0.18_200)] transition-all group-hover:bg-[image:var(--gradient-aurora)] group-hover:text-background">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold">{c.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{c.desc}</p>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- GitHub data ---------- */
type GitHubUser = {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
};

type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
};

type GitHubLanguageSummary = Array<{ name: string; count: number }>;

type GitHubData = {
  user: GitHubUser;
  repos: GitHubRepo[];
  languages: GitHubLanguageSummary;
  totalStars: number;
};

const GITHUB_CACHE_TTL_MS = 10 * 60 * 1000;
const GITHUB_USERNAME = "abhaykumar";

function formatCompactNumber(value: number) {
  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

function getCachedGitHubData() {
  if (typeof window === "undefined") return null;
  try {
    const item = window.localStorage.getItem(`github-data-${GITHUB_USERNAME}`);
    if (!item) return null;
    const parsed = JSON.parse(item) as { timestamp: number; data: GitHubData };
    if (Date.now() - parsed.timestamp > GITHUB_CACHE_TTL_MS) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function setCachedGitHubData(data: GitHubData) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(`github-data-${GITHUB_USERNAME}`, JSON.stringify({ timestamp: Date.now(), data }));
  } catch {
    // Ignore cache write failures.
  }
}

async function loadGitHubData(): Promise<GitHubData> {
  const [userResponse, reposResponse] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers: { Accept: "application/vnd.github+json" },
    }),
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
      headers: { Accept: "application/vnd.github+json" },
    }),
  ]);

  if (!userResponse.ok) {
    throw new Error("GitHub profile could not be loaded right now.");
  }
  if (!reposResponse.ok) {
    throw new Error("GitHub repositories could not be loaded right now.");
  }

  const user = (await userResponse.json()) as GitHubUser;
  const repos = (await reposResponse.json()) as GitHubRepo[];

  const rankedRepos = [...repos]
    .filter((repo) => !repo.name.startsWith(".") && repo.name !== "abhaykumar")
    .sort((a, b) => b.stargazers_count + b.forks_count - (a.stargazers_count + a.forks_count))
    .slice(0, 6);

  const languageTotals: Record<string, number> = {};
  for (const repo of rankedRepos) {
    const languageResponse = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/languages`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (languageResponse.ok) {
      const repoLanguages = (await languageResponse.json()) as Record<string, number>;
      for (const [language, bytes] of Object.entries(repoLanguages)) {
        languageTotals[language] = (languageTotals[language] ?? 0) + bytes;
      }
    }
  }

  const languages = Object.entries(languageTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));

  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

  return {
    user,
    repos: rankedRepos,
    languages,
    totalStars,
  };
}

function GitHubSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.25fr_0.95fr]">
      <div className="rounded-3xl glass-strong p-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
          <LoaderCircle className="h-4 w-4 animate-spin" /> Loading GitHub profile…
        </div>
        <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start">
          <div className="h-20 w-20 animate-pulse rounded-full bg-white/10" />
          <div className="flex-1 space-y-3">
            <div className="h-5 w-40 animate-pulse rounded-full bg-white/10" />
            <div className="h-4 w-56 animate-pulse rounded-full bg-white/10" />
            <div className="h-4 w-48 animate-pulse rounded-full bg-white/10" />
          </div>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-24 animate-pulse rounded-2xl border border-border bg-white/5" />
          ))}
        </div>
      </div>
      <div className="rounded-3xl glass-strong p-6">
        <div className="h-4 w-40 animate-pulse rounded-full bg-white/10" />
        <div className="mt-5 h-40 animate-pulse rounded-2xl bg-white/5" />
        <div className="mt-6 space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-10 animate-pulse rounded-2xl bg-white/5" />
          ))}
        </div>
      </div>
    </div>
  );
}

function GitHub() {
  const [state, setState] = useState<{ loading: boolean; data: GitHubData | null; error: string | null }>({
    loading: true,
    data: null,
    error: null,
  });

  useEffect(() => {
    const cached = getCachedGitHubData();
    if (cached) {
      setState({ loading: false, data: cached, error: null });
      return;
    }

    let active = true;
    const load = async () => {
      try {
        setState({ loading: true, data: null, error: null });
        const data = await loadGitHubData();
        if (!active) return;
        setCachedGitHubData(data);
        setState({ loading: false, data, error: null });
      } catch (error) {
        if (!active) return;
        setState({
          loading: false,
          data: null,
          error: error instanceof Error ? error.message : "Unable to load GitHub data right now.",
        });
      }
    };

    void load();
    return () => {
      active = false;
    };
  }, []);

  if (state.loading) {
    return (
      <section id="github" className="relative py-28">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeader kicker="Open Source" title="GitHub activity" sub="Live GitHub profile data, repositories, and language breakdown." />
          <GitHubSkeleton />
        </div>
      </section>
    );
  }

  if (state.error || !state.data) {
    return (
      <section id="github" className="relative py-28">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeader kicker="Open Source" title="GitHub activity" sub="Live GitHub profile data, repositories, and language breakdown." />
          <div className="rounded-3xl glass-strong p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[oklch(0.18_0.05_280/0.7)] text-[oklch(0.85_0.18_200)]">
              <AlertCircle className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold text-white">GitHub data is temporarily unavailable</h3>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-muted-foreground">{state.error ?? "The GitHub API could not be reached at the moment."}</p>
            <button
              type="button"
              onClick={() => {
                window.location.reload();
              }}
              className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-white/15 ${FOCUS_RING_CLASS}`}
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  const { user, repos, languages, totalStars } = state.data;

  return (
    <section id="github" className="relative py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeader kicker="Open Source" title="GitHub activity" sub="Live GitHub profile data, repositories, and language breakdown." />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.25fr_0.95fr]">
          <Reveal>
            <div className="rounded-3xl glass-strong p-6 sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                  <img src={user.avatar_url} alt={`${user.name ?? user.login} avatar`} className="h-16 w-16 rounded-2xl border border-white/10 object-cover" />
                  <div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Github className="h-4 w-4" /> {user.name ?? user.login}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{user.bio ?? "Building thoughtful products and practical AI experiences."}</p>
                    <a href={user.html_url} target="_blank" rel="noreferrer" className={`mt-3 inline-flex items-center gap-2 text-sm font-medium text-[oklch(0.85_0.18_200)] transition-colors hover:text-[oklch(0.9_0.2_200)] ${FOCUS_RING_CLASS}`}>
                      View profile <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
                <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                  @{user.login}
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { label: "Followers", value: formatCompactNumber(user.followers) },
                  { label: "Following", value: formatCompactNumber(user.following) },
                  { label: "Public repos", value: formatCompactNumber(user.public_repos) },
                  { label: "Stars", value: formatCompactNumber(totalStars) },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-border bg-[oklch(0.12_0.03_270/0.6)] p-4 text-center">
                    <div className="font-display text-2xl font-bold text-gradient">{stat.value}</div>
                    <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-sm font-semibold">Top repositories</div>
                  <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Recently updated</div>
                </div>
                <div className="space-y-3">
                  {repos.map((repo) => (
                    <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer" className={`group flex flex-col gap-2 rounded-2xl border border-border bg-[oklch(0.12_0.03_270/0.6)] p-4 transition-all hover:border-[oklch(0.72_0.2_260)] hover:bg-[oklch(0.16_0.04_280/0.75)] ${FOCUS_RING_CLASS}`}>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="font-medium text-foreground">{repo.name}</div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1"><Star className="h-3.5 w-3.5" /> {repo.stargazers_count}</span>
                          <span className="inline-flex items-center gap-1"><GitFork className="h-3.5 w-3.5" /> {repo.forks_count}</span>
                        </div>
                      </div>
                      <p className="text-sm leading-6 text-muted-foreground">{repo.description ?? "No description provided."}</p>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                        {repo.language ? <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1">{repo.language}</span> : null}
                        <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1">Updated recently</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl glass-strong p-6 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold">Contribution graph</div>
                <div className="font-mono text-xs text-muted-foreground">via GitHub contribution chart</div>
              </div>
              <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-[oklch(0.12_0.03_270/0.6)] p-3">
                <img
                  src={`https://ghchart.rschardt.com/${GITHUB_USERNAME}?theme=github-dark`}
                  alt={`${user.login} GitHub contribution graph`}
                  className="h-auto w-full rounded-xl"
                  loading="lazy"
                />
              </div>

              <div className="mt-6">
                <div className="text-sm font-semibold">Most used languages</div>
                <div className="mt-5 space-y-4">
                  {languages.length > 0 ? (
                    languages.map((language, index) => {
                      const totalBytes = languages.reduce((sum, item) => sum + item.count, 0);
                      const pct = totalBytes > 0 ? Math.round((language.count / totalBytes) * 100) : 0;
                      const colors = ["oklch(0.72 0.2 250)", "oklch(0.85 0.18 90)", "oklch(0.7 0.18 240)", "oklch(0.75 0.2 30)", "oklch(0.68 0.25 300)"];
                      return (
                        <div key={language.name}>
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-medium">{language.name}</span>
                            <span className="font-mono text-muted-foreground">{pct}%</span>
                          </div>
                          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[oklch(0.18_0.04_280/0.6)]">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${pct}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: index * 0.08, ease: "easeOut" }}
                              className="h-full rounded-full"
                              style={{ background: colors[index] ?? "oklch(0.72 0.2 250)", boxShadow: `0 0 12px ${colors[index] ?? "oklch(0.72 0.2 250)"}` }}
                            />
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-sm text-muted-foreground">No language data was available for the selected repositories yet.</p>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
type ContactFieldName = "name" | "email" | "subject" | "message";

type ContactFormValues = Record<ContactFieldName, string>;

type ContactFormErrors = Partial<Record<ContactFieldName, string>>;

const INITIAL_CONTACT_FORM_VALUES: ContactFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function Field({ label, type = "text", textarea = false, value, onChange, error, name }: { label: string; type?: string; textarea?: boolean; value: string; onChange: (value: string) => void; error?: string; name: string }) {
  const [focus, setFocus] = useState(false);
  const active = focus || value.length > 0;

  return (
    <div className="relative">
      <label className={`pointer-events-none absolute left-4 transition-all ${active ? "top-1.5 text-[10px] uppercase tracking-wider text-[oklch(0.85_0.18_200)]" : "top-1/2 -translate-y-1/2 text-sm text-muted-foreground"}`}>
        {label}
      </label>
      {textarea ? (
        <textarea name={name} value={value} rows={4} onChange={(e) => onChange(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} aria-label={label}
          className="w-full resize-none rounded-2xl border border-border bg-[oklch(0.12_0.03_270/0.6)] px-4 pb-3 pt-6 text-sm outline-none transition-all focus:border-[oklch(0.72_0.2_260)] focus:shadow-[0_0_20px_oklch(0.72_0.2_260/0.3)]" />
      ) : (
        <input name={name} type={type} value={value} onChange={(e) => onChange(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} aria-label={label}
          className={`w-full rounded-2xl border border-border bg-[oklch(0.12_0.03_270/0.6)] px-4 text-sm outline-none transition-all focus:border-[oklch(0.72_0.2_260)] focus:shadow-[0_0_20px_oklch(0.72_0.2_260/0.3)] ${active ? "pb-2 pt-6 h-14" : "h-14"}`} />
      )}
      {error ? <p className="mt-2 text-xs text-rose-300">{error}</p> : null}
    </div>
  );
}
function Contact() {
  const [formValues, setFormValues] = useState<ContactFormValues>(INITIAL_CONTACT_FORM_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});

  const updateField = (field: ContactFieldName) => (value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateForm = (values: ContactFormValues): ContactFormErrors => {
    const nextErrors: ContactFormErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (!values.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!values.subject.trim()) {
      nextErrors.subject = "Subject is required.";
    }

    if (!values.message.trim()) {
      nextErrors.message = "Message is required.";
    }

    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateForm(formValues);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const subject = encodeURIComponent(formValues.subject.trim());
    const body = encodeURIComponent(
      `Name:\n${formValues.name.trim()}\n\nEmail:\n${formValues.email.trim()}\n\nMessage:\n${formValues.message.trim()}`
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setFormValues(INITIAL_CONTACT_FORM_VALUES);
    setErrors({});
  };

  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-5xl px-5">
        <SectionHeader kicker="Contact" title="Let's build something great" sub="Have an idea, a role, or just want to say hi? My inbox is open." />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="rounded-3xl glass-strong p-7">
              <h3 className="font-display text-2xl font-bold">Get in touch</h3>
              <p className="mt-2 text-sm text-muted-foreground">I usually reply within a day. Let's chat about AI, products, or your next project.</p>
              <div className="mt-6 space-y-3">
                {[
                  [
  {
    icon: Mail,
    label: "Email",
    value: "abhayrajputg0007@gmail.com",
    href: PROFILE_LINKS.email,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/abhayrajput2005",
    href: PROFILE_LINKS.github,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/abhay-kumar-2005-",
    href: PROFILE_LINKS.linkedin,
  },
  {
    icon: Download,
    label: "Resume",
    value: "Download Resume",
    href: PROFILE_LINKS.resume,
  },
]
                 ,
                ].map((c) => (
                  <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" aria-label={`${c.label}: ${c.value}`} title={`${c.label}: ${c.value}`}
                    className={`group flex items-center gap-3 rounded-2xl border border-border bg-[oklch(0.12_0.03_270/0.5)] p-3 transition-all hover:border-[oklch(0.72_0.2_260)] hover:bg-[oklch(0.18_0.05_280/0.7)] ${FOCUS_RING_CLASS}`}>
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-[oklch(0.18_0.05_280/0.7)] text-[oklch(0.85_0.18_200)] transition-all group-hover:bg-[image:var(--gradient-aurora)] group-hover:text-background">
                      <c.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{c.label}</div>
                      <div className="text-sm font-medium">{c.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="rounded-3xl glass-strong p-7">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Your name" name="name" value={formValues.name} onChange={updateField("name")} error={errors.name} />
                <Field label="Email address" type="email" name="email" value={formValues.email} onChange={updateField("email")} error={errors.email} />
              </div>
              <div className="mt-4"><Field label="Subject" name="subject" value={formValues.subject} onChange={updateField("subject")} error={errors.subject} /></div>
              <div className="mt-4"><Field label="Tell me about your project" textarea name="message" value={formValues.message} onChange={updateField("message")} error={errors.message} /></div>
              <Magnetic
  type="submit"
  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[image:var(--gradient-aurora)] px-6 py-4 text-sm font-semibold text-background shadow-[0_0_25px_oklch(0.72_0.2_260/0.5)]"
>
  <Send className="h-4 w-4" />
  Send Message
</Magnetic>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(window.scrollY > 600);
    f(); window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <footer className="relative border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 sm:flex-row">
        <div className="flex items-center gap-2">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="grid h-8 w-8 place-items-center rounded-lg bg-[image:var(--gradient-aurora)] font-display text-xs font-bold text-background">
            AK
          </motion.div>
          <div className="text-sm">
            <div className="font-display font-semibold">Abhay Kumar</div>
            <div className="text-[10px] text-muted-foreground">Designed & built with ♥ · {new Date().getFullYear()}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {[
            { icon: Github, href: PROFILE_LINKS.github, label: "GitHub" },
            { icon: Linkedin, href: PROFILE_LINKS.linkedin, label: "LinkedIn" },
            { icon: Mail, href: PROFILE_LINKS.email, label: "Email" },
          ].map((s, i) => (
            <a key={i} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" aria-label={s.label} title={s.label}
              className={`grid h-9 w-9 place-items-center rounded-full glass transition-all hover:bg-[image:var(--gradient-aurora)] hover:text-background ${FOCUS_RING_CLASS}`}>
              <s.icon className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {show && (
          <motion.a
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}
            href="#top"
            className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-[image:var(--gradient-aurora)] text-background shadow-[0_0_30px_oklch(0.72_0.2_260/0.7)]">
            <ArrowUp className="h-4 w-4" />
          </motion.a>
        )}
      </AnimatePresence>
    </footer>
  );
}

export default function Portfolio() {
  return (
    <div className="relative min-h-screen text-foreground">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:ring-2 focus:ring-[oklch(0.85_0.18_200)]">
        Skip to content
      </a>
      <Background />
      <CursorFX />
      <ScrollProgress />
      <Nav />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <GitHub />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
