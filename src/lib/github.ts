import type { CuratedOverride, GitHubRepo, ProjectView } from "@/types";
import curated from "../../data/curated-projects.json";

const API = "https://api.github.com";
const USER = process.env.GITHUB_USERNAME || "Kaushal2910";

function headers(): Record<string, string> {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "portfolio-muse",
  };
  if (process.env.GITHUB_TOKEN) h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return h;
}

function techFromRepo(r: GitHubRepo): string[] {
  const tech: string[] = [];
  if (r.language) tech.push(r.language);
  for (const t of r.topics ?? []) {
    if (tech.length >= 5 && !tech.includes(t)) break;
    const pretty = t.replace(/-/g, " ");
    if (!tech.map((x) => x.toLowerCase()).includes(pretty.toLowerCase())) tech.push(pretty);
  }
  return tech.slice(0, 5);
}

/** Merge GitHub truth (stars/lang/pushed) with curated presentation overrides. */
export function mergeRepos(repos: GitHubRepo[]): ProjectView[] {
  const map = curated as Record<string, CuratedOverride>;
  return repos.map((r) => {
    const o = map[r.name.toLowerCase()] ?? {};
    return {
      ...r,
      displayTitle: o.title ?? prettify(r.name),
      displayBlurb: o.blurb ?? r.description ?? "No description yet — README has details.",
      displayTech: o.tech ?? techFromRepo(r),
      demoUrl: o.demoUrl ?? (r.homepage || null),
      image: o.image ?? `https://opengraph.githubassets.com/1/${r.full_name}`,
      featuredRank: o.featuredRank ?? null,
      hidden: o.hide ?? r.fork ?? r.archived ?? false,
    };
  });
}

export function prettify(name: string): string {
  return name.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Server-side fetch with hourly ISR. Never throws — returns [] on failure. */
export async function getProjects(): Promise<ProjectView[]> {
  try {
    const res = await fetch(
      `${API}/users/${USER}/repos?per_page=100&sort=pushed`,
      { headers: headers(), next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const repos = (await res.json()) as GitHubRepo[];
    return mergeRepos(repos)
      .filter((p) => !p.hidden)
      .sort((a, b) => {
        if ((a.featuredRank ?? 99) !== (b.featuredRank ?? 99))
          return (a.featuredRank ?? 99) - (b.featuredRank ?? 99);
        return b.stargazers_count - a.stargazers_count;
      });
  } catch {
    return [];
  }
}

export async function getReadme(owner: string, repo: string): Promise<string | null> {
  try {
    const res = await fetch(`${API}/repos/${owner}/${repo}/readme`, {
      headers: { ...headers(), Accept: "application/vnd.github.raw" },
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const text = await res.text();
    return text.slice(0, 4000);
  } catch {
    return null;
  }
}
