'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiGithub, FiLinkedin, FiInstagram, FiCode } from 'react-icons/fi';

const navLinks = [
  { name: 'About', section: '#about' },
  { name: 'Projects', section: '#projects' },
  { name: 'Certifications', section: '#certifications' },
  { name: 'Activity', section: '#github' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const hrefFor = (section: string) => (isHome ? section : `/${section}`);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href={isHome ? '#' : '/'}
            aria-label="Back to top"
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:border-amber-400/40 hover:bg-amber-400/10 transition-all duration-300"
          >
            <FiCode size={18} />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={hrefFor(link.section)} className="text-sm text-gray-400 hover:text-gray-300 transition-colors font-mono">
                {link.name}
              </a>
            ))}
            <div className="flex items-center gap-4 ml-4 border-l border-white/10 pl-4">
              <a href="https://github.com/Kaushal2910" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300 transition-colors">
                <FiGithub size={18} />
              </a>
              <a href="https://www.linkedin.com/in/kaushal0510" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300 transition-colors">
                <FiLinkedin size={18} />
              </a>
              <a href="https://www.instagram.com/kaushal_0510_/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300 transition-colors">
                <FiInstagram size={18} />
              </a>
            </div>
          </div>

          <button className="md:hidden text-gray-400 hover:text-gray-300 transition-colors" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/[0.06]"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a key={link.name} href={hrefFor(link.section)} className="block text-gray-400 hover:text-gray-300 transition-colors font-mono text-sm py-2" onClick={() => setIsOpen(false)}>
                  {link.name}
                </a>
              ))}
              <div className="flex items-center gap-4 pt-3 border-t border-white/5">
                <a href="https://github.com/Kaushal2910" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300 transition-colors"><FiGithub size={18} /></a>
                <a href="https://www.linkedin.com/in/kaushal0510" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300 transition-colors"><FiLinkedin size={18} /></a>
                <a href="https://www.instagram.com/kaushal_0510_/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300 transition-colors"><FiInstagram size={18} /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}