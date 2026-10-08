import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Experience from "@/components/Experience";
import FeaturedProjects from "@/components/FeaturedProjects";
import FeaturedCerts from "@/components/FeaturedCerts";
import GithubStrip from "@/components/GithubStrip";
import ContactBlock from "@/components/ContactBlock";
import { getProjects } from "@/lib/github";
import { certificates } from "@/data/certificates";

export const revalidate = 3600;

export default async function Home() {
  const projects = await getProjects();
  const stars = projects.reduce((s, p) => s + p.stargazers_count, 0);
  return (
    <main id="main" className="min-h-screen bg-[#0d0d0c] text-[#edeae2]">
      <Hero />
      <Marquee />
      <Experience />
      <FeaturedProjects projects={projects} />
      <FeaturedCerts certs={certificates} />
      <GithubStrip count={projects.length} stars={stars} />
      <ContactBlock />
    </main>
  );
}
