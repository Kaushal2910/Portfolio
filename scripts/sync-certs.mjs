// Scans public/certificates for image+pdf pairs and updates
// data/certificates.json + data/certificates.meta.json (preserving rank/meta).
// Usage: npm run sync:certs
import { readdirSync, existsSync, readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pubDir = join(root, "public", "certificates");
const outPath = join(root, "data", "certificates.json");

const IMG = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const DOC = new Set([".pdf", ".jpg", ".jpeg", ".png"]);

// Existing rows (e.g. edited via /admin-muse) win over re-scans: match by
// image filename stem so titles/ranks/categories are never clobbered.
let existing = [];
if (existsSync(outPath)) {
  try {
    existing = JSON.parse(readFileSync(outPath, "utf8"));
  } catch { /* start fresh */ }
}
const known = new Map(
  existing.map((c) => [c.imageUrl.split("/").pop().split(".").slice(0, -1).join("."), c])
);

if (!existsSync(pubDir)) {
  console.log("No public/certificates yet — copy them from the main portfolio first.");
  process.exit(0);
}

const files = readdirSync(pubDir);
const stems = new Map();
for (const f of files) {
  const dot = f.lastIndexOf(".");
  if (dot < 0) continue;
  const stem = f.slice(0, dot);
  const ext = f.slice(dot).toLowerCase();
  const e = stems.get(stem) ?? {};
  if (IMG.has(ext) && !e.image) e.image = f;
  if (DOC.has(ext) && !e.doc) e.doc = f;
  stems.set(stem, e);
}

const rows = [];
let n = 1;
for (const [stem, e] of [...stems.entries()].sort()) {
  if (!e.image) continue;
  const prev = known.get(stem);
  if (prev) {
    // refresh file paths in case the pair was re-uploaded, keep everything else
    rows.push({ ...prev, imageUrl: `/certificates/${e.image}`, downloadUrl: `/certificates/${e.doc ?? e.image}` });
  } else {
    rows.push({
      id: String(Date.now() + n),
      rank: 90 + n,
      title: stem.replace(/[_-]+/g, " "),
      imageUrl: `/certificates/${e.image}`,
      downloadUrl: `/certificates/${e.doc ?? e.image}`,
      category: "Uncategorized",
      issuer: "",
      year: "",
    });
  }
  n++;
}

rows.sort((a, b) => a.rank - b.rank);
writeFileSync(outPath, JSON.stringify(rows, null, 2) + "\n");
console.log(`Synced ${rows.length} certificates → data/certificates.json`);
