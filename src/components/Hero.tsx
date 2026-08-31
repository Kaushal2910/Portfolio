'use client';

import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import Typewriter from './Typewriter';
import { FloatingPaths } from './ui/background-paths';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated background paths (shadcn BackgroundPaths) */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,0,0,0.3), transparent 80%)',
        }}
      />

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
            Kaushal Sonawane
          </h1>
          <p className="mt-4 text-xl md:text-2xl font-medium text-white/70">
            <Typewriter />
          </p>
          <p className="mt-8 text-sm text-amber-400/70 font-mono tracking-wider uppercase">
            Cloud · DevOps · AI/ML · Full Stack
          </p>
          <p className="mt-4 text-white/50 max-w-xl mx-auto leading-relaxed">
            I design, build, and operate cloud infrastructure and full-stack applications from Pune, India.
          </p>
        </motion.div>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-400/[0.08] border border-amber-400/30 text-amber-300 text-sm font-medium hover:bg-amber-400/[0.15] hover:border-amber-400/50 transition-all duration-300 backdrop-blur-sm"
          >
            View Projects
            <FiArrowUpRight size={16} />
          </a>
          <a
            href="mailto:sonawanekaushal05@gmail.com"
            className="px-6 py-3 rounded-lg border border-white/[0.08] text-white/50 text-sm font-medium hover:bg-white/[0.05] hover:border-white/[0.15] hover:text-white/70 transition-all duration-300"
          >
            Get in Touch
          </a>
        </motion.div>

      </div>
    </section>
  );
}