// ─────────────────────────────────────────────────────────────
// PROJECTS DATA
// Add, remove, or reorder projects here. The first item is
// automatically rendered as the "Featured" project.
// ─────────────────────────────────────────────────────────────

export interface Project {
  num: string;
  title: string;
  subtitle: string;
  desc: string;
  tags: string[];
  url: string;
  accent: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    num: '01',
    title: 'Luxee Store',
    subtitle: 'Full Stack E-Commerce',
    desc: 'Modern e-commerce platform built with React, TypeScript, Supabase and Resend integration. Features auth, product management, and real-time updates.',
    tags: ['React', 'TypeScript', 'Supabase', 'Tailwind', 'Framer Motion'],
    url: 'https://luxee-store.vercel.app',
    accent: '#eccd1a',
    featured: true,
  },
  {
    num: '02',
    title: 'DilseBuy',
    subtitle: 'Online Store',
    desc: 'Responsive shopping experience with product browsing, cart functionality, and a clean mobile-first design built with vanilla HTML and CSS.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive'],
    url: 'https://dilsebuy.netlify.app',
    accent: '#6366f1',
  },
  {
    num: '03',
    title: 'Car Website',
    subtitle: 'Automotive Showcase',
    desc: 'Vehicle showcase website highlighting collections, specs, and features with a bold modern aesthetic and smooth scroll interactions.',
    tags: ['HTML', 'CSS', 'UI Design', 'Responsive'],
    url: 'https://carexperts.netlify.app/',
    accent: '#ff1818',
  },
  {
    num: '04',
    title: 'Starbucks Clone',
    subtitle: 'Landing Page',
    desc: 'Pixel-perfect recreation of the Starbucks landing experience — layout, typography, colors, and hover states all matched from the original.',
    tags: ['HTML', 'CSS', 'Clone'],
    url: 'https://starcoffee-by-umer.netlify.app/',
    accent: '#0ea5d9',
  },
  {
    num: '05',
    title: 'Quiz App',
    subtitle: 'Quiz App',
    desc: 'Interactive quiz application with dynamic questions and real-time score tracking.',
    tags: ['HTML', 'CSS'],
    url: 'https://quizzappbyumer.netlify.app',
    accent: '#f97316',
  },
  {
    num: '06',
    title: 'Calculator App',
    subtitle: 'Calculator',
    desc: 'Interactive calculator application with a modern UI and smooth animations.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Coding Maths', 'Responsive UI'],
    url: 'https://calculatorbyumer.netlify.app',
    accent: '#22d3ee',
  },
];
