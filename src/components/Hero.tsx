'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiFileText, FiChevronDown, FiGithub, FiLinkedin, FiInstagram, FiMail } from 'react-icons/fi';
import Typewriter from './Typewriter';
import { FloatingPaths } from './ui/background-paths';

const socials = [
  { name: 'GitHub', url: 'https://github.com/Kaushal2910', icon: FiGithub },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/kaushal0510', icon: FiLinkedin },
  { name: 'Instagram', url: 'https://www.instagram.com/kaushal_0510_/', icon: FiInstagram },
  { name: 'Email', url: 'mailto:sonawanekaushal05@gmail.com', icon: FiMail },
];

interface HeroProps {
  profilePhoto?: string;
  resumeUrl?: string;
}

export default function Hero({ profilePhoto, resumeUrl = '/resume.pdf' }: HeroProps) {
  const [avatarError, setAvatarError] = useState(false);
  const avatarSrc = profilePhoto || '/profile.jpg';

  return (
    <section className="relative min-h-svh flex items-center justify-center overflow-hidden bg-black pt-28 pb-20">
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
          {/* Avatar — set via admin Site Assets tab (or drop /profile.jpg into public/) */}
          <div className="mx-auto mb-6 w-24 h-24 rounded-full overflow-hidden ring-2 ring-amber-400/40 ring-offset-4 ring-offset-black bg-white/[0.06]">
            {!avatarError ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={avatarSrc}
                alt="Kaushal Sonawane"
                width={96}
                height={96}
                className="w-full h-full object-cover"
                onError={() => setAvatarError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-400/20 to-white/[0.04]">
                <span className="text-3xl font-bold text-amber-300/80 tracking-tight select-none">KS</span>
              </div>
            )}
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
            Kaushal Sonawane
          </h1>
          <p className="mt-4 text-xl md:text-2xl font-medium text-white/70 min-h-[1.5em]">
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
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-amber-400/30 bg-amber-400/[0.08] text-amber-300 text-sm font-medium hover:bg-amber-400/[0.15] hover:border-amber-400/50 transition-all duration-300 backdrop-blur-sm"
          >
            <FiFileText size={16} />
            Resume
          </a>
        </motion.div>

        <motion.div
          className="mt-8 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
        >
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target={s.url.startsWith('mailto') ? undefined : '_blank'}
              rel={s.url.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              aria-label={s.name}
              title={s.name}
              className="p-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/50 hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-all duration-300"
            >
              <s.icon size={16} />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 p-2 text-white/40 hover:text-white/70 transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.8 }}
      >
        <FiChevronDown size={24} className="animate-bounce" />
      </motion.a>
    </section>
  );
}
