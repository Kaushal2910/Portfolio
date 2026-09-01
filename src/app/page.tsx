import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import GithubGraph from '@/components/GithubGraph';
import Footer from '@/components/Footer';
import BackToTopButton from '@/components/BackToTopButton';
import settings from '../../data/settings.json';

export default function Home() {
  return (
    <main id="main" className="min-h-screen bg-black text-white">
      <Hero
        profilePhoto={settings.profilePhoto}
        resumeUrl={settings.resumeUrl}
      />
      <About />
      <Projects />
      <Certifications />
      <GithubGraph />
      <Footer />
      <BackToTopButton />
    </main>
  );
}
