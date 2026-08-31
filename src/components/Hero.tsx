'use client';

import { motion } from 'framer-motion';
import { FiArrowDown, FiArrowUpRight } from 'react-icons/fi';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0f1e]">
      {/* Subtle professional background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(96,165,250,0.08), transparent 70%), radial-gradient(ellipse 60% 50% at 90% 110%, rgba(99,102,241,0.05), transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
            Kaushal Sonawane
          </h1>
          <p className="mt-4 text-xl md:text-2xl font-medium text-slate-300">
            Software Engineer
          </p>
          <p className="mt-3 text-sm font-mono text-slate-500">
            Cloud · DevOps · AI/ML · Full Stack
          </p>
          <p className="mt-6 text-slate-400 max-w-xl mx-auto leading-relaxed">
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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm font-medium hover:bg-blue-500/20 hover:border-blue-500/50 transition-all duration-300"
          >
            View Projects
            <FiArrowUpRight size={16} />
          </a>
          <a
            href="mailto:sonawanekaushal05@gmail.com"
            className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-slate-200 text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            Get in Touch
          </a>
        </motion.div>

        <motion.div
          className="mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <a
            href="#about"
            className="inline-flex flex-col items-center gap-1 text-slate-500 hover:text-blue-400 transition-colors"
          >
            <span className="text-[11px] tracking-[0.2em] uppercase">Scroll</span>
            <FiArrowDown className="animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
