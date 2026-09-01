'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import Image from 'next/image';
import type { Project } from '@/types';

interface Props {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const tiltFrame = useRef<number | null>(null);
  const [imgError, setImgError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Tilt: direct style writes via rAF (no per-move re-render), skipped for
  // touch devices and users who prefer reduced motion
  useEffect(() => {
    if (prefersReducedMotion) return;
    const card = cardRef.current;
    if (!card || !window.matchMedia('(pointer: fine)').matches) return;

    const handleMove = (e: MouseEvent) => {
      if (tiltFrame.current !== null) return;
      tiltFrame.current = requestAnimationFrame(() => {
        tiltFrame.current = null;
        const rect = card.getBoundingClientRect();
        const rotateX = (e.clientY - rect.top - rect.height / 2) / 20;
        const rotateY = (rect.width / 2 - (e.clientX - rect.left)) / 20;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });
    };

    const handleLeave = () => {
      if (tiltFrame.current !== null) {
        cancelAnimationFrame(tiltFrame.current);
        tiltFrame.current = null;
      }
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    card.addEventListener('mousemove', handleMove);
    card.addEventListener('mouseleave', handleLeave);
    return () => {
      card.removeEventListener('mousemove', handleMove);
      card.removeEventListener('mouseleave', handleLeave);
      if (tiltFrame.current !== null) cancelAnimationFrame(tiltFrame.current);
    };
  }, [prefersReducedMotion]);

  return (
    <motion.div
      ref={cardRef}
      className="group relative rounded-2xl overflow-hidden bg-white/[0.02] border border-white/5 hover:border-amber-400/30 transition-all duration-500"
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.3s ease-out, border-color 0.5s' }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Image Area */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-white/[0.06] to-black">
        {!imgError ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-2 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/[0.06] to-black">
            <span className="text-5xl font-bold text-white/10 select-none">
              {project.title.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        {project.featured && (
          <span className="absolute top-3 right-3 text-xs px-2 py-1 rounded-full bg-amber-400/20 text-amber-400 font-mono border border-amber-400/30">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Stretched link: whole card is clickable, inner links sit above it */}
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 rounded-2xl"
          aria-label={`${project.title} — view source code on GitHub`}
        >
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
            {project.title}
          </h3>
        </a>
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
        <div className="relative z-10 flex items-center gap-4">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-amber-400 transition-colors font-mono"
          >
            <FiGithub size={14} /> Code
          </a>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-amber-400 transition-colors font-mono"
            >
              <FiExternalLink size={14} /> Live
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
