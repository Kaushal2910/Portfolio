import { certificates } from "@/data/certificates";
import CertImage from "@/components/CertImage";
import { FiDownload } from "react-icons/fi";

export const metadata = { title: "All Certificates — Kaushal Sonawane" };

export default function CertificatesPage() {
  const sorted = [...certificates].sort((a, b) => a.rank - b.rank);
  const cats = ["All", ...[...new Set(sorted.map((c) => c.category))]];
  return (
    <main id="main" className="mx-auto max-w-6xl px-4 pb-24 pt-28 md:pt-32">
      <a href="/" className="u-link font-mono text-xs uppercase tracking-widest text-[#edeae2]/50 hover:text-[#ff4d00]">
        ← Back home
      </a>
      <p className="mt-6 font-mono text-xs uppercase tracking-[0.25em] text-[#edeae2]/40">
        Credentials · {sorted.length} in rank order
      </p>
      <h1 className="font-display mt-2 text-3xl font-bold tracking-tight sm:text-4xl md:text-6xl">
        Proof, <span className="font-serif-accent font-normal">ranked.</span>
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-[#edeae2]/60">
        Rank 1 is the most valuable. To re-prioritize, change one number — the homepage
        top-3 and this page both follow <span className="font-mono text-sm">rank</span>.
        New certs: drop JPG+PDF in <span className="font-mono text-sm">public/certificates</span>, run{" "}
        <span className="font-mono text-sm">npm run sync:certs</span>.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {cats.map((c) => (
          <span key={c} className="rounded-full border border-[rgba(237,234,226,0.15)] px-3 py-1 font-mono text-[11px] text-[#edeae2]/55">{c}</span>
        ))}
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((c) => (
          <article key={c.id} className={`overflow-hidden rounded-xl border bg-[#141412] transition-colors ${c.rank === 1 ? "border-[#c9a227]/60" : "border-[rgba(237,234,226,0.12)]"}`}>
            <div className="relative aspect-[16/10] bg-[#0a0a09]">
              <CertImage src={c.imageUrl} title={c.title} className="absolute inset-0 h-full w-full object-contain" />
              <span className="absolute left-3 top-3 rounded-sm bg-black/70 px-2 py-1 font-mono text-[11px] font-bold">#{c.rank}</span>
            </div>
            <div className="border-t border-dashed border-[rgba(237,234,226,0.2)] p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#edeae2]/40">{c.issuer}{c.year ? ` · ${c.year}` : ""} · {c.category}</p>
              <h2 className="font-display mt-1 font-bold leading-snug">{c.title}</h2>
              <a href={c.downloadUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-[#edeae2]/60 hover:text-[#ff4d00]">
                <FiDownload size={13} /> Verify / PDF
              </a>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
