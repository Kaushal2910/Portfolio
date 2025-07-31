'use client';
import React from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import { certificates } from '@/data/certificates'; // ✅ import here
import GitHubGraph from '@/components/GithubGraph';
import Footer from '@/components/Footer';


export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Hero />
      <About />
      <Projects />
      <Certifications certificates={certificates} /> {/* ✅ pass as prop */}
      <GitHubGraph />
      <Footer />
    </main>
  );
}
