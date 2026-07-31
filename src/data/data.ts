export const personalInfo = {
  name: "Muhammad Umer",
  initials: "MU",
  brand: "UMER.DEV",
  roleLine1: "FULL-STACK",
  roleLine2: "DEVELOPER.",
  role: "Full-Stack Developer",
  tagline:
    "I build production-ready storefronts, dashboards, and checkout systems — end to end, from React front-ends to the databases underneath.",
  location: "Karachi",
  locationFull: "Karachi, Pakistan",
  timezone: "GMT+5",
  email: "codebyumer.dev@gmail.com",
  avatarUrl: "https://avatars.githubusercontent.com/u/178928829?v=4",
  // TODO: replace with a real, hosted PDF (e.g. /resume.pdf in /public, or a link to Drive/Notion)
  resumeUrl: "#",
  availableForWork: true,
  idBadgeNumber: "NO. 2026-UM-01",
  idBadgeCode: "UMER-DEV-2026-FULLSTACK",
};

export const socialLinks = {
  github: "https://github.com/umerjs",
  linkedin: "https://www.linkedin.com/in/umer-the-dev/",
  whatsapp: "https://wa.me/923161395147",
};

// TODO: update `url` once the site is deployed to its real domain
export const seo = {
  title: "Muhammad Umer — Full-Stack Developer | React, Node.js, TypeScript",
  description:
    "Full-stack developer specializing in React, Node.js, TypeScript, and MongoDB. Building production-ready web applications, e-commerce platforms, and scalable APIs. Based in Karachi, Pakistan.",
  url: "https://umer.dev",
  siteName: "UMER.DEV",
};

export const navLinks = [
  { id: "stack", label: "Stack", num: "01" },
  { id: "work", label: "Work", num: "02" },
  { id: "about", label: "About", num: "03" },
  { id: "experience", label: "Experience", num: "04" },
  { id: "contact", label: "Contact", num: "05" },
];

export const heroMarquee = {
  primary: [
    "REACT",
    "TYPESCRIPT",
    "NODE.JS",
    "MONGODB",
    "EXPRESS",
    "TAILWIND",
    "NEXT.JS",
    "SUPABASE",
  ],
  secondary: [
    "POSTGRESQL",
    "GRAPHQL",
    "REST APIs",
    "FIREBASE",
    "VERCEL",
    "GIT",
  ],
};

export const idCardChips = ["React", "Node", "TypeScript", "MongoDB"];

export const aboutBio = [
  "I'm a MERN Stack Developer and Full Stack Developer with 3+ years of experience building scalable web applications — turning ideas into production-ready digital products as a freelance web developer and software engineer.",
  "As a dedicated React Frontend Developer and Backend Developer, I'm passionate about clean code, elegant architectures, and creating seamless user experiences across the full stack. When I'm not coding, you'll find me exploring new technologies, contributing to open source, or writing technical articles.",
];

export const aboutTags = ["React", "Node.js", "TypeScript", "MongoDB"];

export const stats = [
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 50, suffix: "+", label: "Projects Built" },
  { value: 9, suffix: "+", label: "Happy Clients" },
  { value: 16, suffix: "+", label: "GitHub Stars" },
];

// icon keys map to lucide-react icons chosen in About.tsx
export const services = [
  { icon: "Code2", title: "Web Apps", desc: "Full-stack web applications" },
  { icon: "Server", title: "REST APIs", desc: "Scalable backend services" },
  {
    icon: "Database",
    title: "Database Design",
    desc: "Optimized data schemas",
  },
  { icon: "Rocket", title: "Deployment", desc: "CI/CD & cloud hosting" },
];

export const techStack = [
  {
    title: "Frontend",
    icon: "Monitor",
    items: [
      "HTML5 & CSS3",
      "JavaScript",
      "React.js",
      "Next.js",
      "Sass/SCSS",
      "Tailwind CSS",
      "TypeScript",
    ],
  },
  {
    title: "Backend",
    icon: "Server",
    items: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "SQL",
      "PostgreSQL",
      "GraphQL",
      "JWT Auth",
    ],
  },
  {
    title: "Database & Deploy",
    icon: "Database",
    items: [
      "MongoDB",
      "Vercel",
      "Netlify",
      "Supabase",
      "Firebase",
      "FireStore",
    ],
  },
  {
    title: "Tools",
    icon: "Wrench",
    items: ["Git & GitHub", "VS Code", "Vite", "ESLint", "Prettier", "Linux"],
  },
];

// TODO: swap these for your real employers/roles. Dates below are kept
// consistent with the "3+ years experience" stat above (2022 → present).
// Previously this listed a role starting 2018 while the stats said "3+ years" —
// that mismatch is exactly the kind of thing recruiters notice, so keep these two in sync.
export const experience = [
  {
    num: "01",
    title: "Full-Stack Developer (MERN)",
    company: "Freelance / Self-Employed",
    period: "2024 — Present",
    desc: "Building production storefronts, dashboards, and checkout systems for clients worldwide — React front-ends, Node/Express APIs, and MongoDB/PostgreSQL underneath. Owning projects end to end, from architecture to deployment.",
  },
  {
    num: "02",
    title: "Frontend Developer (React & TypeScript)",
    company: "Digital Solutions LLC",
    period: "2023 — 2024",
    desc: "Built and maintained responsive React + TypeScript interfaces, collaborated on component libraries, and integrated REST APIs for client-facing products.",
  },
  {
    num: "03",
    title: "Web Developer (Junior)",
    company: "Creative Agency",
    period: "2022 — 2023",
    desc: "Developed responsive, pixel-perfect landing pages and UI with HTML, CSS, and JavaScript, then transitioned into React-based projects.",
  },
];

export const footerAbout =
  "Full-stack developer based in Karachi, Pakistan. Building production-ready web apps with modern tech.";
