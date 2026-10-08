'use client';
import { useMemo, useState } from "react";
import { ProjectRow } from "@/components/FeaturedProjects";
import type { ProjectView } from "@/types";

export default function ProjectsIndex({ projects }: { projects: ProjectView[] }) {
  const [q, setQ] = useState("");
  const [lang, setLang] = useState("All");
  const [sort, setSort] = useState<"featured" | "stars" | "updated">("featured");

  const langs = useMemo(() => {
    const s = new Set<string>();
    projects.forEach((p) => p.displayTech.forEach((t) => s.add(t)));
    return ["All", ...[...s].sort().slice(0, 14)];
  }, [projects]);

  const list = useMemo(() => {
    let l = [...projects];
    if (q) {
      const needle = q.toLowerCase();
      l = l.filter(
        (p) =>
          p.displayTitle.toLowerCase().includes(needle) ||
          p.displayBlurb.toLowerCase().includes(needle) ||
          p.displayTech.join(" ").toLowerCase().includes(needle)
      );
    }
    if (lang !== "All") l = l.filter((p) => p.displayTech.includes(lang));
    if (sort === "stars") l.sort((a, b) => b.stargazers_count - a.stargazers_count);
    else if (sort === "updated") l.sort((a, b) => +new Date(b.pushed_at) - +new Date(a.pushed_at));
    else l.sort((a, b) => (a.featuredRank ?? 99) - (b.featuredRank ?? 99) || b.stargazers_count - a.stargazers_count);
    return l;
  }, [projects, q, lang, sort]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search projects, tech, outcomes…"
          className="w-full rounded-md border border-[rgba(237,234,226,0.15)] bg-white/[0.03] px-4 py-2.5 text-sm outline-none placeholder:text-[#edeae2]/30 focus:border-[#ff4d00] md:max-w-sm"
        />
        <div className="flex gap-2">
          {(["featured", "stars", "updated"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              className={`rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest ${sort === s ? "border-[#ff4d00] bg-[#ff4d00]/10 text-white" : "border-[rgba(237,234,226,0.15)] text-[#edeae2]/55 hover:text-white"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-8 flex flex-wrap gap-2">
        {langs.map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`rounded-full border px-3 py-1 font-mono text-[11px] ${lang === l ? "border-[#edeae2] bg-[#edeae2] text-black" : "border-[rgba(237,234,226,0.15)] text-[#edeae2]/55 hover:text-white"}`}
          >
            {l}
          </button>
        ))}
      </div>
      <p className="mb-4 font-mono text-xs text-[#edeae2]/40">Showing {list.length} of {projects.length} · synced hourly from GitHub</p>
      <div className="space-y-4">
        {list.map((p, i) => (
          <ProjectRow key={p.id} p={p} i={i} />
        ))}
        {list.length === 0 && <p className="py-16 text-center font-mono text-sm text-[#edeae2]/40">No matches — try clearing filters.</p>}
      </div>
    </div>
  );
}
