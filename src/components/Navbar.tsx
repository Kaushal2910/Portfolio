'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiGithub, FiLinkedin, FiInstagram, FiCode } from 'react-icons/fi';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Activity', href: '#github' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0f1e]/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href="#"
            aria-label="Back to top"
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-blue-400 hover:border-blue-500/40 hover:bg-blue-500/10 transition-all duration-300"
          >
            <FiCode size={18} />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm text-gray-400 hover:text-blue-400 transition-colors font-mono">
                {link.name}
              </a>
            ))}
            <div className="flex items-center gap-4 ml-4 border-l border-white/10 pl-4">
              <a href="https://github.com/Kaushal2910" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                <FiGithub size={18} />
              </a>
              <a href="https://www.linkedin.com/in/kaushal0510" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                <FiLinkedin size={18} />
              </a>
              <a href="https://www.instagram.com/kaushal_0510_/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                <FiInstagram size={18} />
              </a>
            </div>
          </div>

          <button className="md:hidden text-gray-400 hover:text-blue-400 transition-colors" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-[#0a0f1e]/95 backdrop-blur-xl border-b border-white/5"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="block text-gray-400 hover:text-blue-400 transition-colors font-mono text-sm py-2" onClick={() => setIsOpen(false)}>
                  {link.name}
                </a>
              ))}
              <div className="flex items-center gap-4 pt-3 border-t border-white/5">
                <a href="https://github.com/Kaushal2910" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors"><FiGithub size={18} /></a>
                <a href="https://www.linkedin.com/in/kaushal0510" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors"><FiLinkedin size={18} /></a>
                <a href="https://www.instagram.com/kaushal_0510_/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors"><FiInstagram size={18} /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}