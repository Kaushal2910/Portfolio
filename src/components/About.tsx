// AboutMe.tsx
"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";

const AboutMe = forwardRef<HTMLElement>(function AboutMe(_, ref) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      ref={ref}
      id="about"
      className="min-h-screen bg-slate-900 px-6 py-24 text-slate-100 md:px-12"
    >
      <motion.div
        className="mx-auto max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Section Title */}
        <motion.h2
          variants={itemVariants}
          className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl"
        >
          About Me
        </motion.h2>

        {/* Decorative underline */}
        <motion.div
          variants={itemVariants}
          className="mx-auto mt-4 h-1 w-24 rounded-full bg-sky-500"
        />

        {/* Bio */}
        <motion.p
          variants={itemVariants}
          className="mt-8 text-center text-base leading-relaxed text-slate-300 sm:text-lg"
        >
          I’m Kaushal Sonawane, a final-year Computer Engineering student who
          loves turning ideas into pixel-perfect, high-performance web apps.
          Over the past few years I’ve delivered 8+ responsive sites for clients
          across the UK and US, focusing on accessibility, SEO, and delightful
          user experiences.
        </motion.p>

        {/* Skills Grid */}
        <motion.div variants={itemVariants} className="mt-10">
          <h3 className="mb-6 text-center text-xl font-semibold text-slate-200">
            Core Skills
          </h3>
          <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-3 md:grid-cols-4">
            {[
              "Next.js",
              "TypeScript",
              "Tailwind CSS",
              "Node.js",
              "AWS",
              "CI/CD",
              "Figma",
              "Agile",
            ].map((skill) => (
              <motion.div
                key={skill}
                whileHover={{ scale: 1.05 }}
                className="rounded-lg bg-slate-800/60 px-4 py-3 font-medium text-slate-200 shadow-lg transition-colors hover:bg-sky-500/20"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div variants={itemVariants} className="mt-12 text-center">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-sky-500/30 transition-all hover:bg-sky-600 hover:shadow-lg hover:shadow-sky-600/40"
          >
            See my work
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
});

export default AboutMe;