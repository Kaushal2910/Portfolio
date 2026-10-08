'use client';
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import type { ProjectView } from "@/types";
import SectionHead from "./SectionHead";

export function ProjectRow({ p, i }: { p: ProjectView; i: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.07 }}
      className="group grid gap-4 rounded-2xl border border-[rgba(237,234,226,0.12)] bg-white/[0.02] p-5 transition-colors hover:border-[#ff4d00]/50 md:grid-cols-[56px_1fr_auto] md:items-center md:p-6"
    >
      <span className="font-display text-3xl font-bold text-[#edeae2]/15 transition-colors group-hover:text-[#ff4d00]">
        {String(i + 1).padStart(2, "0")}
      </span>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-display text-lg font-bold text-[#edeae2] md:text-xl">{p.displayTitle}</h3>
          {p.featuredRank && (
            <span className="rounded-full bg-[#ff4d00]/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[#ff4d00]">
              Featured #{p.featuredRank}
            </span>
          )}
          <span className="font-mono text-[11px] text-[#edeae2]/40">
            Updated {new Date(p.pushed_at).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
          </span>
        </div>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-[#edeae2]/60">{p.displayBlurb}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {p.displayTech.map((t) => (
            <span key={t} className="rounded bg-white/5 px-2 py-0.5 font-mono text-[11px] text-[#edeae2]/55">{t}</span>
          ))}
        </div>
      </div>
      <div className="flex gap-2 md:flex-col">
        <a href={p.html_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-md border border-[rgba(237,234,226,0.15)] px-3 py-2 font-mono text-xs text-[#edeae2]/70 hover:border-[#ff4d00] hover:text-white">
          <FiGithub size={13} /> Code
        </a>
        {p.demoUrl && (
          <a href={p.demoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-md bg-[#edeae2] px-3 py-2 font-mono text-xs font-bold text-[#16130e] hover:bg-white">
            <FiExternalLink size={13} /> Live
          </a>
        )}
      </div>
    </motion.article>
  );
}

export default function FeaturedProjects({ projects }: { projects: ProjectView[] }) {
  const top = projects.filter((p) => p.featuredRank).sort((a, b) => (a.featuredRank ?? 9) - (b.featuredRank ?? 9)).slice(0, 3);
  const list = (top.length ? top : projects.slice(0, 3)).map((p, i) => ({ p, i }));
  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-14 md:scroll-mt-20 md:py-28">
      <SectionHead kicker="02 · Selected work" title="Three worth" accent="your click." meta={`${projects.length} total → /projects`} />
      <div className="space-y-4">
        {list.map(({ p, i }) => (
          <ProjectRow key={p.id} p={p} i={i} />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <a href="/projects" className="u-link font-mono text-sm uppercase tracking-widest text-[#edeae2]/70 hover:text-white">
          Browse all {projects.length} projects — with READMEs →
        </a>
      </div>
    </section>
  );
}
