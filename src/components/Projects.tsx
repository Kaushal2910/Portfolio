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

const projects: Project[] = [
  {
    title: "RelationshipOS",
    description: "Mobile App: A centralized mobile operating system for managing personal relationships, communication logs, reminders, and life events.",
    tech: ["React Native", "TypeScript", "Expo", "SQLite"],
    githubUrl: "https://github.com/Kaushal2910/RelationshipOS",
    image: "/projectsImages/relationshipOS.png",
  },
  {
    title: "MediTrack",
    description: "Mobile App: A decentralized Personal Health Record (PHR) mobile system leveraging blockchain for secure medical record tracking and data privacy.",
    tech: ["React Native", "Blockchain", "Node.js", "Cryptography"],
    githubUrl: "https://github.com/Kaushal2910/MediTrack",
    image: "/projectsImages/meditrack.png",
  },
  {
    title: "LoopHire",
    description: "An automated career pipeline assistant that scrapes developer job postings, scores profile matches, and dynamically generates ATS-optimized CVs and cover letters.",
    tech: ["Python", "AI", "BeautifulSoup", "docx"],
    githubUrl: "https://github.com/Kaushal2910/LoopHire",
    image: "/projectsImages/LoopHire.png",
  },
  {
    title: "NeuroBiz",
    description: "AI-powered business platform featuring analytics, automation, and intelligent insights designed to streamline enterprise workflows.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
    githubUrl: "https://github.com/Kaushal2910/NeuroBiz",
    image: "/projectsImages/neurobiz.png",
  },
  {
    title: "Sanz Café",
    description: "Paid client freelance project – A fully responsive website for a local café featuring custom menus and optimized layouts.",
    tech: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/Kaushal2910/sanz-cafe",
    demoUrl: "https://sanzcafe.netlify.app/",
    image: "/projectsImages/sanzcafe.png",
  },
  {
    title: "TourHouse Website",
    description: "A sleek travel-booking website offering custom packages, stays, and tour itineraries with a strong focus on high-end UI/UX polish.",
    tech: ["Next.js", "Tailwind CSS", "React.js", "JavaScript"],
    githubUrl: "https://github.com/Kaushal2910/TourHouse-Website",
    demoUrl: "https://tour-house-website.vercel.app/",
    image: "/projectsImages/Tourhouse.png",
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
