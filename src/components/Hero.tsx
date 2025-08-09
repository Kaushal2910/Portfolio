// Hero.tsx
"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

const titles = ["Software Engineer", "Cloud Enthusiast", "Freelancer"];

export default function Hero() {
  const [currentTitle, setCurrentTitle] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(120);

  useEffect(() => {
    const handleTyping = () => {
      const fullTitle = titles[titleIndex];
      if (isDeleting) {
        setCurrentTitle(fullTitle.substring(0, currentTitle.length - 1));
        setTypingSpeed(60);
      } else {
        setCurrentTitle(fullTitle.substring(0, currentTitle.length + 1));
        setTypingSpeed(120);
      }

      if (!isDeleting && currentTitle === fullTitle) {
        setTimeout(() => setIsDeleting(true), 1200);
      } else if (isDeleting && currentTitle === "") {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % titles.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentTitle, isDeleting, typingSpeed, titleIndex]);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 px-6 py-24 text-slate-100 md:px-12">
      {/* Animated Background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Glowing orbs */}
        <motion.div
          className="absolute -left-1/4 -top-1/4 h-[40rem] w-[40rem] rounded-full bg-sky-500/20 blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            y: [0, 40, 0],
            x: [0, 60, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-1/4 -right-1/4 h-[40rem] w-[40rem] rounded-full bg-purple-500/20 blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            y: [0, -40, 0],
            x: [0, -60, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex max-w-4xl flex-col items-center text-center"
      >
        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl font-extrabold tracking-tight text-slate-100 sm:text-5xl md:text-6xl"
        >
          Kaushal Sonawane
        </motion.h1>

        {/* Animated Role */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-4 h-12 text-2xl font-medium text-sky-400 sm:text-3xl"
        >
          {currentTitle}
          <span className="ml-1 inline-block h-full w-1 animate-pulse bg-sky-400" />
        </motion.h2>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg"
        >
          I am Kaushal Sonawane, a final-year Computer Engineering student with
          hands-on experience building 8+ responsive websites for UK and US
          clients. I specialize in boosting SEO and user experience, with skills
          in HTML, CSS, Java, Python, WordPress, Wix Studio, and cloud platforms
          like AWS and Azure. I thrive in international Agile teams, creating
          high-performance, accessible web apps.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          className="mt-10"
        >
          <Link
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-lg font-semibold text-white shadow-lg shadow-sky-500/30 transition-all hover:bg-sky-600 hover:shadow-xl hover:shadow-sky-600/40 sm:px-8"
          >
            <span className="transition-transform group-hover:translate-x-1">
              Download Resume
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}