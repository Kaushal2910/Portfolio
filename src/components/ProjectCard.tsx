'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import type { Project } from '@/types';

interface Props {
  project: Project;
  index: number;
}

const gradientColors: Record<string, string> = {
  'RelationOS': 'from-violet-500/20 to-blue-500/10',
  'LoopHire': 'from-blue-500/20 to-cyan-500/10',
  'NeuroBiz': 'from-indigo-500/20 to-purple-500/10',
  'MediTrack': 'from-emerald-500/20 to-teal-500/10',
  'Trendzz': 'from-rose-500/20 to-orange-500/10',
  'Sanz Café': 'from-amber-500/20 to-yellow-500/10',
};

export default function ProjectCard({ project, index }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [imgError, setImgError] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <motion.div
      ref={cardRef}
      className="group relative rounded-2xl overflow-hidden bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-all duration-500"
      style={{ transform, transition: 'transform 0.3s ease-out' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Image Area */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-500/5 to-transparent">
        {!imgError ? (
          <img
            src={project.image}
            alt={project.title}
            className={`w-full h-full ${
            project.title === 'RelationOS' || project.title === 'NeuroBiz'
              ? 'object-contain p-2'
              : 'object-cover'
          } opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500`}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${gradientColors[project.title] || 'from-blue-500/10 to-gray-500/10'}`}>
            <span className="text-5xl font-bold text-white/10 select-none">
              {project.title.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        {project.featured && (
          <span className="absolute top-3 right-3 text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 font-mono border border-blue-500/20">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((t) => (
            <span key={t} className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 font-mono">
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-blue-400 transition-colors font-mono"
          >
            <FiGithub size={14} /> Code
          </a>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-blue-400 transition-colors font-mono"
            >
              <FiExternalLink size={14} /> Live
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
