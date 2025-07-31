// Projects.tsx
"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";
import { FiGithub, FiExternalLink } from "react-icons/fi";

export type Project = {
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
  demoUrl?: string;
};

const projects: Project[] = [
  {
    title: "E-commerce Dashboard",
    description:
      "Full-stack admin panel with real-time analytics, inventory & order management.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Prisma", "PostgreSQL"],
    githubUrl: "https://github.com/kaushal/shop-admin",
    demoUrl: "https://shop-admin-demo.vercel.app",
  },
  {
    title: "WeatherLens",
    description:
      "Progressive web app delivering hyper-local forecasts with interactive maps.",
    tech: ["React", "Vite", "OpenWeather API", "PWA", "Chart.js"],
    githubUrl: "https://github.com/kaushal/weather-lens",
    demoUrl: "https://weatherlens.netlify.app",
  },
  {
    title: "Portfolio CMS",
    description:
      "Headless CMS powering this portfolio; content updates via Sanity Studio.",
    tech: ["Next.js", "Sanity", "Tailwind", "Framer Motion"],
    githubUrl: "https://github.com/kaushal/portfolio-cms",
  },
  {
    title: "TaskFlow",
    description:
      "Kanban-style task manager with drag-and-drop, dark mode & team invitations.",
    tech: ["React", "Firebase", "React DnD", "Zustand"],
    githubUrl: "https://github.com/kaushal/taskflow",
    demoUrl: "https://taskflow-ks.vercel.app",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const Projects = forwardRef<HTMLElement>(function Projects(_, ref) {
  return (
    <section
      ref={ref}
      id="projects"
      className="min-h-screen bg-slate-950 px-6 py-24 text-slate-100 md:px-12"
    >
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl"
      >
        Featured Projects
      </motion.h2>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto mt-16 grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            custom={i}
            variants={cardVariants}
            whileHover={{ y: -8 }}
            className="group flex flex-col rounded-xl bg-slate-900/70 p-6 shadow-lg ring-1 ring-slate-800 transition-shadow hover:ring-sky-500/60"
          >
            <h3 className="text-xl font-bold text-sky-400">{p.title}</h3>
            <p className="mt-3 flex-grow text-sm leading-relaxed text-slate-300">
              {p.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-4">
              <a
                href={p.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex items-center gap-1 text-slate-400 transition-colors hover:text-sky-400"
              >
                <FiGithub size={18} />
                <span className="text-sm">Code</span>
              </a>
              {p.demoUrl && (
                <a
                  href={p.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Live Demo"
                  className="flex items-center gap-1 text-slate-400 transition-colors hover:text-sky-400"
                >
                  <FiExternalLink size={18} />
                  <span className="text-sm">Live</span>
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
});

export default Projects;