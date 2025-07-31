// src/components/Contact.tsx
"use client";

import { motion } from "framer-motion";
import { forwardRef, useEffect, useState } from "react";
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from "react-icons/fi";
import { AnimatePresence } from "framer-motion";


const Contact = forwardRef<HTMLElement>(function Contact(_, ref) {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  const iconLinks = [
    { Icon: FiGithub, href: "https://github.com/Kaushal2910", label: "GitHub" },
    { Icon: FiLinkedin, href: "https://linkedin.com/in/kaushal-sonawane", label: "LinkedIn" },
    { Icon: FiMail, href: "mailto:kaushal.sonawane@example.com", label: "Email" },
  ];

  return (
    <footer
      ref={ref}
      id="contact"
      className="relative bg-slate-950 px-6 py-20 text-slate-100 md:px-12"
    >
      {/* Let’s Connect */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="flex flex-col items-center"
      >
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
          Let&apos;s Connect
        </h2>

        {/* Social Icons */}
        <div className="mt-8 flex gap-8">
          {iconLinks.map(({ Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.9 }}
              className="text-3xl text-slate-400 transition-colors hover:text-sky-400"
            >
              <Icon />
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Footer Text */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-12 text-center text-sm text-slate-500"
      >
        <p>© {new Date().getFullYear()} Kaushal Sonawane. All rights reserved.</p>
      </motion.div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            aria-label="Back to top"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-6 z-40 rounded-full bg-sky-500/10 p-3 text-sky-400 ring-1 ring-sky-500/40 backdrop-blur-sm transition-all hover:bg-sky-500/20 hover:shadow-lg hover:shadow-sky-500/50"
          >
            <FiArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
});

export default Contact;