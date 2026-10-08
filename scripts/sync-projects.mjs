// Seeds data/curated-projects.json entries for any GitHub repos missing from it.
// New repos appear on /projects automatically; run this to add blurbs/ranks.
// Usage: GITHUB_USERNAME=Kaushal2910 npm run sync:projects
const user = process.env.GITHUB_USERNAME || "Kaushal2910";
const headers = { Accept: "application/vnd.github+json", "User-Agent": "portfolio-muse" };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

const res = await fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=pushed`, { headers });
if (!res.ok) throw new Error(`GitHub ${res.status}`);
const repos = await res.json();

const { readFileSync, writeFileSync, existsSync } = await import("fs");
const { join, dirname } = await import("path");
const { fileURLToPath } = await import("url");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const p = join(root, "data", "curated-projects.json");
const curated = existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : {};

let added = 0;
for (const r of repos) {
  const k = r.name.toLowerCase();
  if (!curated[k] && !r.fork && !r.archived) {
    curated[k] = { blurb: r.description ?? "" };
    added++;
  }
}
writeFileSync(p, JSON.stringify(curated, null, 2));
console.log(`${repos.length} repos on GitHub, +${added} new curated stubs.`);
