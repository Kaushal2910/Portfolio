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

  const filterCounts = filters.reduce<Record<string, number>>((acc, f) => {
    acc[f] = f === 'All'
      ? projectsData.length
      : projectsData.filter((p) => getFilterCategory(p).includes(f)).length;
    return acc;
  }, {});

  return (
    <section id="projects" className="py-24 px-4 bg-black relative scroll-mt-16">
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
              aria-pressed={activeFilter === f}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono transition-all duration-300 border ${
                activeFilter === f
                  ? 'bg-white/[0.12] text-white border-amber-400/40'
                  : 'bg-white/5 text-gray-400 border-white/5 hover:border-white/10 hover:text-white'
              }`}
            >
              {f}
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeFilter === f ? 'bg-white/[0.08] text-white/70' : 'bg-white/5 text-gray-500'
                }`}
              >
                {filterCounts[f]}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16 text-gray-500 font-mono text-sm">
              No projects in this category yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}