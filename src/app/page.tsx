'use client';

import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import GithubGraph from '@/components/GithubGraph';
import Footer from '@/components/Footer';
import BackToTopButton from '@/components/BackToTopButton';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0f1e] text-white">
      <Hero />
      <About />
      <Projects />
      <Certifications />
      <GithubGraph />
      <Footer />
      <BackToTopButton />
    </main>
  );
}
