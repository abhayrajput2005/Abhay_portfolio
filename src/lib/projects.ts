import eduvault01 from "../assets/projects/eduvault/eduvault-01-login.png.png";
import eduvault02 from "../assets/projects/eduvault/eduvault-02-dashboard.png.png";
import eduvault03 from "../assets/projects/eduvault/eduvault-03-quiz-generator.png.png";
import eduvault04 from "../assets/projects/eduvault/eduvault-04-admin-dashboard.png.png";
import eduvault05 from "../assets/projects/eduvault/eduvault-05-contact.png.png";
import disk01 from "../assets/projects/disk-scheduler/disk-01-dashboard.png.png";
import disk02 from "../assets/projects/disk-scheduler/disk-02-head-movement.png.png";
import disk03 from "../assets/projects/disk-scheduler/disk-03-seek-distance.png.png";
import heart01 from "../assets/projects/heart-disease/heart-01-home.png.png";
import heart02 from "../assets/projects/heart-disease/heart-02-patient-details.png.png";
import heart03 from "../assets/projects/heart-disease/heart-03-prediction-result.png.png";

const createPreviewSvg = (title: string, subtitle: string, accent: string) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
      <rect width="1200" height="800" rx="36" fill="#060816" />
      <rect x="40" y="40" width="1120" height="720" rx="28" fill="url(#bg)" />
      <circle cx="272" cy="254" r="180" fill="${accent}" fill-opacity="0.24" />
      <circle cx="932" cy="210" r="220" fill="#ffffff" fill-opacity="0.08" />
      <rect x="92" y="120" width="260" height="24" rx="12" fill="#ffffff" fill-opacity="0.14" />
      <rect x="92" y="176" width="420" height="44" rx="22" fill="#ffffff" fill-opacity="0.12" />
      <rect x="92" y="252" width="180" height="22" rx="11" fill="#ffffff" fill-opacity="0.1" />
      <rect x="92" y="310" width="160" height="160" rx="20" fill="#ffffff" fill-opacity="0.08" />
      <rect x="280" y="310" width="300" height="160" rx="20" fill="#ffffff" fill-opacity="0.08" />
      <rect x="610" y="310" width="320" height="220" rx="24" fill="#ffffff" fill-opacity="0.08" />
      <rect x="92" y="520" width="840" height="140" rx="24" fill="#ffffff" fill-opacity="0.08" />
      <text x="92" y="648" fill="#ffffff" font-family="Inter, Arial, sans-serif" font-size="56" font-weight="700">${title}</text>
      <text x="92" y="694" fill="#C7D2FE" font-family="Inter, Arial, sans-serif" font-size="28">${subtitle}</text>
      <defs>
        <linearGradient id="bg" x1="80" y1="80" x2="1120" y2="760" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#111631" />
          <stop offset="100%" stop-color="#090C1E" />
        </linearGradient>
      </defs>
    </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const createScreenshotSvg = (title: string, subtitle: string, accent: string, variant: number) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000">
      <rect width="1600" height="1000" rx="40" fill="#060816" />
      <rect x="40" y="40" width="1520" height="920" rx="32" fill="url(#bg)" />
      <rect x="90" y="90" width="420" height="820" rx="28" fill="#ffffff" fill-opacity="0.06" />
      <rect x="560" y="90" width="950" height="140" rx="24" fill="#ffffff" fill-opacity="0.08" />
      <rect x="560" y="270" width="430" height="300" rx="24" fill="${accent}" fill-opacity="0.24" />
      <rect x="1030" y="270" width="480" height="300" rx="24" fill="#ffffff" fill-opacity="0.08" />
      <rect x="560" y="610" width="950" height="300" rx="24" fill="#ffffff" fill-opacity="0.08" />
      <rect x="120" y="140" width="260" height="22" rx="11" fill="#ffffff" fill-opacity="0.14" />
      <rect x="120" y="192" width="190" height="16" rx="8" fill="#ffffff" fill-opacity="0.1" />
      <rect x="120" y="232" width="140" height="16" rx="8" fill="#ffffff" fill-opacity="0.08" />
      <rect x="120" y="330" width="320" height="120" rx="20" fill="#ffffff" fill-opacity="0.08" />
      <rect x="120" y="480" width="320" height="140" rx="20" fill="#ffffff" fill-opacity="0.08" />
      <text x="560" y="780" fill="#ffffff" font-family="Inter, Arial, sans-serif" font-size="56" font-weight="700">${title}</text>
      <text x="560" y="828" fill="#C7D2FE" font-family="Inter, Arial, sans-serif" font-size="30">${subtitle}</text>
      <text x="140" y="880" fill="#ffffff" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="600">Variant ${variant}</text>
      <defs>
        <linearGradient id="bg" x1="80" y1="80" x2="1520" y2="960" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#111631" />
          <stop offset="100%" stop-color="#090C1E" />
        </linearGradient>
      </defs>
    </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export type ProjectItem = {
  slug: string;
  name: string;
  category: string;
  desc: string;
  features: string[];
  metrics: string[];
  stack: string[];
  gradient: string;
  accent: string;
  image?: string;
  liveHref: string;
  sourceHref: string;
  timeline: string;
  role: string;
  status: string;
  problem: string;
  solution: string;
  objectives: string[];
  architecture: Array<{ title: string; description: string }>;
  featureHighlights: Array<{ title: string; description: string; icon: string }>;
  screenshots: Array<{ title: string; alt: string; src: string }>;
  challenges: Array<{ title: string; description: string }>;
  technologies: string[];
  lessons: string[];
  future: string[];
  relatedProjectSlugs: string[];
};

export const PROJECTS: ProjectItem[] = [
  {
    slug: "eduvault-ai",
    name: "EduVault AI",
    category: "AI Powered Learning Platform",
    desc: "A smart educational platform that helps students organize study materials, summarize PPTs using AI, generate quizzes, and interact with an AI tutor.",
    features: ["AI Tutor", "PPT Summarizer", "MCQ Generator", "Smart Notes", "Subject Library", "Admin Dashboard"],
    metrics: ["AI Powered", "Role Based Authentication", "Modern Dashboard"],
    stack: ["React", "Flask", "MongoDB", "Gemini API", "Tailwind CSS"],
    gradient: "from-[oklch(0.72_0.2_250)] via-[oklch(0.68_0.25_300)] to-[oklch(0.85_0.18_200)]",
    accent: "#7C8BFF",
    image: eduvault01,
    liveHref: "https://edu-vault-nine.vercel.app/",
    sourceHref: "https://github.com/abhayrajput2005",
    timeline: "2024 — 2025",
    role: "Product Engineer • AI Experience Builder",
    status: "Prototype",
    problem: "Students often struggled to review dense study materials, stay organized, and turn lectures into practical revision tools.",
    solution: "EduVault AI combines note organization, AI-powered summaries, quiz generation, and conversational tutoring into one focused learning workspace.",
    objectives: ["Reduce study friction", "Convert lectures into digestible study assets", "Make revision more interactive and personalized"],
    architecture: [
      { title: "Frontend", description: "A polished React experience for study flows, dashboards, and AI interactions." },
      { title: "Backend", description: "Flask services orchestrate content parsing, AI prompts, auth, and file handling." },
      { title: "Database", description: "MongoDB stores notes, user state, subjects, and AI-generated learning artifacts." },
      { title: "AI Model", description: "Gemini-powered workflows power summarization, tutoring, and quiz generation." },
    ],
    featureHighlights: [
      { title: "AI tutor", description: "Conversational study support that adapts to the current subject context.", icon: "sparkles" },
      { title: "Smart note deck", description: "Structured notes and summaries generated from uploaded content.", icon: "layers" },
      { title: "Adaptive revision", description: "Personalized quizzes and learning checkpoints to improve retention.", icon: "brain" },
    ],
    screenshots: [
      { title: "Study dashboard", alt: "EduVault AI dashboard preview", src: eduvault01 },
      { title: "AI assistant", alt: "EduVault AI tutor preview", src: eduvault02 },
      { title: "Revision flow", alt: "EduVault AI revision experience", src: eduvault03 },
      { title: "Admin console", alt: "EduVault AI admin experience", src: eduvault04 },
      { title: "Contact experience", alt: "EduVault AI contact view", src: eduvault05 },
    ],
    challenges: [
      { title: "Prompt reliability", description: "Designed clear guardrails and response templates so the AI outputs stayed useful and structured." },
      { title: "Chunked content handling", description: "Built a pipeline that pre-processed uploaded material into concise, review-friendly summaries." },
    ],
    technologies: ["React", "Flask", "MongoDB", "Gemini API", "Tailwind CSS", "REST APIs"],
    lessons: ["Designing for trust in AI outputs", "Balancing automation with user control", "Creating onboarding flows that lower cognitive load"],
    future: ["Collaborative study rooms", "Personalized learning paths", "Offline note sync"],
    relatedProjectSlugs: ["disk-scheduling-simulator", "heart-disease-prediction"],
  },
  {
    slug: "disk-scheduling-simulator",
    name: "Disk Scheduling Simulator",
    category: "Operating System Visualization",
    desc: "An interactive simulator that visualizes disk scheduling algorithms and compares seek time and head movement with real-time animations.",
    features: ["FCFS", "SSTF", "SCAN", "LOOK", "C-SCAN", "C-LOOK"],
    metrics: ["Real-time Animations", "Seek Time Comparison", "Interactive Controls"],
    stack: ["React", "Flask", "Chart.js", "Python"],
    gradient: "from-[oklch(0.85_0.18_200)] via-[oklch(0.72_0.2_250)] to-[oklch(0.68_0.25_300)]",
    accent: "#4FD6E8",
    image: disk01,
    liveHref: "https://github.com/abhayrajput2005",
    sourceHref: "https://github.com/abhayrajput2005",
    timeline: "2023 — 2024",
    role: "Frontend Engineer • Visualization Designer",
    status: "Educational tool",
    problem: "Disk scheduling concepts are often taught abstractly, making it hard to see how different algorithms behave under real input patterns.",
    solution: "The simulator turns scheduling logic into a vivid, interactive experience where users can compare head movement and seek time in motion.",
    objectives: ["Make OS theory tangible", "Compare scheduling strategies side by side", "Improve learner comprehension through interaction"],
    architecture: [
      { title: "Frontend", description: "A React experience that renders the disk head, queue states, and animated transitions." },
      { title: "Simulation Engine", description: "The logic layer computes seek distance and updates the visual state in real time." },
      { title: "Visualization Layer", description: "Charting and motion components make the behavior of each algorithm easier to understand." },
      { title: "Feedback Loop", description: "Users can adjust inputs and immediately compare performance outcomes." },
    ],
    featureHighlights: [
      { title: "Interactive controls", description: "Users can manipulate request queues and head positions to compare outcomes instantly.", icon: "monitor" },
      { title: "Animated motion", description: "Each scheduling strategy is visualized through responsive, real-time state transitions.", icon: "zap" },
      { title: "Performance insights", description: "Seek time comparisons support fast decision-making and deeper learning.", icon: "wrench" },
    ],
    screenshots: [
      { title: "Queue view", alt: "Disk scheduling queue preview", src: disk01 },
      { title: "Algorithm comparison", alt: "Disk scheduling comparison preview", src: disk02 },
      { title: "Performance chart", alt: "Disk scheduling chart preview", src: disk03 },
    ],
    challenges: [
      { title: "Motion clarity", description: "Balanced animation timing so the simulator remained readable while still feeling dynamic." },
      { title: "Algorithm parity", description: "Validated each scheduling strategy against the same input sets to keep comparisons fair." },
    ],
    technologies: ["React", "Flask", "Chart.js", "Python", "Framer Motion"],
    lessons: ["Designing for educational clarity", "Reducing cognitive overload in technical tools", "Creating motion that supports rather than distracts"],
    future: ["More algorithms", "Audio-assisted walkthroughs", "Exportable simulation reports"],
    relatedProjectSlugs: ["eduvault-ai", "heart-disease-prediction"],
  },
  {
    slug: "heart-disease-prediction",
    name: "Heart Disease Prediction",
    category: "Machine Learning",
    desc: "A machine learning web application that predicts heart disease risk from patient health parameters using trained classification models.",
    features: ["Classification Models", "Health Parameters", "Risk Prediction", "REST API"],
    metrics: ["Trained Model", "Fast Inference", "Clinical Use Case"],
    stack: ["Python", "Flask", "Scikit-learn", "Pandas", "NumPy"],
    gradient: "from-[oklch(0.75_0.25_350)] via-[oklch(0.68_0.25_300)] to-[oklch(0.72_0.2_250)]",
    accent: "#FF7BA6",
    image: heart01,
    liveHref: "https://abhayrajput2005-heart-disease-risk-prediction-ml-app-9hrdzw.streamlit.app/",
    sourceHref: "https://github.com/abhayrajput2005",
    timeline: "2023",
    role: "ML Engineer • Full Stack Builder",
    status: "Research prototype",
    problem: "Healthcare risk assessment tools need to be interpretable and easy to use, especially for non-technical users.",
    solution: "The app packages a trained classifier into a simple web experience that turns health inputs into a clear risk prediction.",
    objectives: ["Deliver fast inference", "Keep the interface approachable", "Explain the prediction outcome clearly"],
    architecture: [
      { title: "Frontend", description: "A lightweight interface that collects patient inputs and presents the prediction result clearly." },
      { title: "API Layer", description: "Flask endpoints receive form data and return prediction results with confidence indicators." },
      { title: "Model Layer", description: "A trained scikit-learn classifier powers inference with deterministic preprocessing." },
      { title: "Data Layer", description: "Pandas and NumPy pipelines normalize inputs and keep the predict step consistent." },
    ],
    featureHighlights: [
      { title: "Predictive workflow", description: "A clear form-based experience turns raw health data into an actionable result.", icon: "cpu" },
      { title: "Health inputs", description: "Supports structured medical parameters and input validation for practical use.", icon: "database" },
      { title: "Interpretable output", description: "Prediction output is framed in a way that is easy to understand and discuss.", icon: "sparkles" },
    ],
    screenshots: [
      { title: "Risk form", alt: "Heart disease prediction form preview", src: heart01 },
      { title: "Prediction view", alt: "Heart disease prediction report preview", src: heart02 },
      { title: "Model overview", alt: "Heart disease prediction model preview", src: heart03 },
    ],
    challenges: [
      { title: "Model explainability", description: "Used a simple, transparent output strategy so users could understand the prediction without being overwhelmed by technical jargon." },
      { title: "Input quality", description: "Added sensible validation to reduce poor input quality and make inference more dependable." },
    ],
    technologies: ["Python", "Flask", "Scikit-learn", "Pandas", "NumPy", "Tailwind CSS"],
    lessons: ["Bridging research prototypes and user experiences", "Designing for trust in healthcare contexts", "Keeping feedback loops short during experimentation"],
    future: ["Risk trend history", "Model confidence explainer", "Multi-model comparison"],
    relatedProjectSlugs: ["eduvault-ai", "disk-scheduling-simulator"],
  },
];
