"use client";

import { motion } from "framer-motion";
import { forwardRef, useState } from "react";
import { FiGithub, FiExternalLink } from "react-icons/fi";

export type Project = {
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
  demoUrl?: string;
  image?: string;
};

const projects: Project[] = [
  {
    title: "E-commerce Dashboard",
    description: "Full-stack admin panel with real-time analytics, inventory & order management.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Prisma", "PostgreSQL"],
    githubUrl: "https://github.com/kaushal/shop-admin",
    demoUrl: "https://shop-admin-demo.vercel.app",
    image: "/images/shop-admin.png",
  },
  {
    title: "WeatherLens",
    description: "PWA delivering hyper-local forecasts with interactive maps.",
    tech: ["React", "Vite", "OpenWeather API", "PWA", "Chart.js"],
    githubUrl: "https://github.com/kaushal/weather-lens",
    demoUrl: "https://weatherlens.netlify.app",
    image: "/images/weatherlens.png",
  },
  {
    title: "Portfolio CMS",
    description: "Headless CMS powering this portfolio; content updates via Sanity Studio.",
    tech: ["Next.js", "Sanity", "Tailwind", "Framer Motion"],
    githubUrl: "https://github.com/kaushal/portfolio-cms",
    image: "/images/portfolio-cms.png",
  },
  {
    title: "TaskFlow",
    description: "Kanban-style task manager with drag-and-drop & team invites.",
    tech: ["React", "Firebase", "React DnD", "Zustand"],
    githubUrl: "https://github.com/kaushal/taskflow",
    demoUrl: "https://taskflow-ks.vercel.app",
    image: "/images/taskflow.png",
  },
];

const allTechs = Array.from(new Set(projects.flatMap((p) => p.tech)));

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const Projects = forwardRef<HTMLElement>(function Projects(_, ref) {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const filteredProjects = selectedTech
    ? projects.filter((p) => p.tech.includes(selectedTech))
    : projects;

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
        className="text-center text-4xl font-extrabold sm:text-5xl"
      >
        Featured Projects
      </motion.h2>

      {/* Filter buttons */}
      <div className="mt-10 mb-16 flex flex-wrap justify-center gap-3">
        {allTechs.map((tech) => (
          <button
            key={tech}
            onClick={() => setSelectedTech(tech === selectedTech ? null : tech)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              selectedTech === tech
                ? "bg-sky-500 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            {tech}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filteredProjects.map((p, i) => (
          <motion.div
            key={p.title}
            custom={i}
            variants={cardVariants}
            whileHover={{ y: -6 }}
            className="group flex flex-col overflow-hidden rounded-xl bg-slate-900/70 shadow-lg ring-1 ring-slate-800 transition-all hover:ring-sky-500/60"
          >
            {p.image && (
              <img
                src={p.image}
                alt={`${p.title} screenshot`}
                className="h-40 w-full object-cover transition duration-300 group-hover:scale-105"
              />
            )}

            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-sky-400">{p.title}</h3>
              <p className="mt-2 text-sm text-slate-300 flex-grow">{p.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-slate-800 px-2 py-1 text-xs font-medium text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex gap-4">
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex items-center gap-1 text-slate-400 hover:text-sky-400"
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
                    className="flex items-center gap-1 text-slate-400 hover:text-sky-400"
                  >
                    <FiExternalLink size={18} />
                    <span className="text-sm">Live</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
});

export default Projects;
