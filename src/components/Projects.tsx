"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { Variants, easeInOut } from "framer-motion";

export type Project = {
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
  demoUrl?: string;
  image?: string;
};

// ✅ Updated with your actual projects
const projects: Project[] = [
  {
    title: "TourHouse Website",
    description: "A travel and tour booking website with modern UI and responsive design.",
    tech: ["JavaScript", "HTML", "CSS", "NextJS"],
    githubUrl: "https://github.com/Kaushal2910/TourHouse-Website",
    demoUrl: "https://classy-tartufo-04ac54.netlify.app/",
    image: "/images/tourhouse.png",
  },
  {
    title: "Sanz cafe",
    description: "Paid client project – Full responsive website for a local cafe.",
    tech: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/Kaushal2910/sanz-cafe",
    demoUrl: "https://sanzcafe.netlify.app/",
    image: "/images/sanz-cafe.png",
  },
  {
    title: "Portfolio",
    description: "My personal portfolio website built with Next.js and Tailwind CSS.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    githubUrl: "https://github.com/Kaushal2910/Portfolio",
    demoUrl: "https://1mynewportfolio.netlify.app/",
    image: "/images/portfolio.png",
  },
  {
    title: "Trendzz",
    description: "A web project showcasing trending styles and products.",
    tech: ["JavaScript", "HTML", "CSS"],
    githubUrl: "https://github.com/Kaushal2910/Trendzz",
    image: "/images/trendzz.png",
  },

  {
    title: "Crio-do",
    description: "JavaScript & DSA practice codes from the Crio.do Fellowship program.",
    tech: ["JavaScript"],
    githubUrl: "https://github.com/Kaushal2910/Crio-do",
    image: "/images/crio-do.png",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: easeInOut,
    },
  }),
};

const Projects = forwardRef<HTMLElement>(function Projects(_, ref) {
  return (
    <section
      ref={ref}
      id="projects"
      className="min-h-screen bg-slate-950 px-6 py-20 text-slate-100 md:px-12" // reduced padding from py-24 to py-20
    >
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center text-4xl font-extrabold sm:text-5xl mb-12" // added mb-12 to space below title
      >
        Featured Projects
      </motion.h2>

      {/* Projects Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((p, i) => (
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
