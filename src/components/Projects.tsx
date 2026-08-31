'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import projectsData from '../../data/projects.json';

const filters = ['All', 'Featured', 'Web', 'Mobile', 'AI/ML'];

function getFilterCategory(p: typeof projectsData[0]): string[] {
  const cats: string[] = [];
  if (p.featured) cats.push('Featured');
  const techStr = p.tech.join(' ').toLowerCase();
  if (techStr.includes('react native') || techStr.includes('expo')) cats.push('Mobile');
  if (techStr.includes('next.js') || techStr.includes('react') || techStr.includes('html') || techStr.includes('css')) cats.push('Web');
  if (techStr.includes('ai') || techStr.includes('python') || techStr.includes('blockchain')) cats.push('AI/ML');
  return cats;
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? projectsData
    : projectsData.filter((p) => getFilterCategory(p).includes(activeFilter));

  return (
    <section id="projects" className="py-24 px-4 bg-black relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-white/60 font-mono text-sm mb-2">02.</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Projects</h2>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex justify-center gap-2 mb-12 flex-wrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-mono transition-all duration-300 ${
                activeFilter === f
                  ? 'bg-white/[0.08] text-white/60 border border-white/[0.12]'
                  : 'bg-white/5 text-gray-400 border border-white/5 hover:border-white/10 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}