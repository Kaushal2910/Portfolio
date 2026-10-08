import ProjectsIndex from "@/components/ProjectsIndex";
import { getProjects } from "@/lib/github";

export const revalidate = 3600;
export const metadata = { title: "All Projects — Kaushal Sonawane" };

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <main id="main" className="mx-auto max-w-6xl px-4 pb-24 pt-28 md:pt-32">
      <a href="/" className="u-link font-mono text-xs uppercase tracking-widest text-[#edeae2]/50 hover:text-[#ff4d00]">
        ← Back home
      </a>
      <p className="mt-6 font-mono text-xs uppercase tracking-[0.25em] text-[#edeae2]/40">Index · {projects.length} repos, auto-synced</p>
      <h1 className="font-display mt-2 text-3xl font-bold tracking-tight sm:text-4xl md:text-6xl">
        Every project, <span className="font-serif-accent font-normal">explained.</span>
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-[#edeae2]/60">
        Pulled live from GitHub — languages and push dates are always current.
        Open any project to see what it does and how it&apos;s built.
      </p>
      <div className="mt-10">
        <ProjectsIndex projects={projects} />
      </div>
    </main>
  );
}
