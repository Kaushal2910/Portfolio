'use client';
import { motion } from "framer-motion";
import { FiDownload, FiAward } from "react-icons/fi";
import type { Certificate } from "@/types";
import SectionHead from "./SectionHead";
import CertImg from "./CertImage";

function RankBadge({ rank, gold = false }: { rank: number; gold?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-sm px-2 py-1 font-mono text-[11px] font-bold ${gold ? "bg-[#c9a227] text-black" : "bg-black/70 text-[#edeae2]"}`}>
      <FiAward size={12} /> #{rank}{gold ? " · TOP CRED" : ""}
    </span>
  );
}

/** Landscape documents are shown whole: contain + dark matte, never cropped. */
function CertImage({ c, ratio = "aspect-[16/10]" }: { c: Certificate; ratio?: string }) {
  return (
    <div className={`relative bg-[#0a0a09] ${ratio}`}>
      <CertImg src={c.imageUrl} title={c.title} className="absolute inset-0 h-full w-full object-contain" />
    </div>
  );
}

function FeatureCard({ c }: { c: Certificate }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group grid overflow-hidden rounded-xl border border-[#c9a227]/60 bg-[#141412] transition-transform hover:-translate-y-1 md:grid-cols-[1.5fr_1fr]"
    >
      <div className="relative">
        <CertImage c={c} ratio="aspect-[16/10] md:aspect-auto md:h-full md:min-h-[320px]" />
        <span className="absolute left-3 top-3">
          <RankBadge rank={c.rank} gold />
        </span>
      </div>
      <div className="flex min-w-0 flex-col justify-center border-t border-dashed border-[rgba(237,234,226,0.2)] p-5 md:border-l md:border-t-0 md:p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#edeae2]/40">{c.issuer}{c.year ? ` · ${c.year}` : ""}</p>
        <h3 className="font-display mt-2 text-xl font-bold leading-snug text-[#edeae2] md:text-2xl">{c.title}</h3>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-[#c9a227]">{c.category} · most valuable</p>
        <a href={c.downloadUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-md bg-[#edeae2] px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-[#16130e] hover:bg-white">
          <FiDownload size={13} /> Verify / PDF
        </a>
      </div>
    </motion.article>
  );
}

function Ticket({ c }: { c: Certificate }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group overflow-hidden rounded-xl border border-[rgba(237,234,226,0.12)] bg-[#141412] transition-all hover:-translate-y-1 hover:border-[#ff4d00]/40"
    >
      <div className="relative">
        <CertImage c={c} />
        <span className="absolute left-3 top-3">
          <RankBadge rank={c.rank} />
        </span>
      </div>
      <div className="border-t border-dashed border-[rgba(237,234,226,0.2)] p-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#edeae2]/40">{c.issuer}{c.year ? ` · ${c.year}` : ""}</p>
        <h3 className="font-display mt-1 font-bold leading-snug text-[#edeae2]">{c.title}</h3>
        <a href={c.downloadUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-[#edeae2]/60 hover:text-[#ff4d00]">
          <FiDownload size={13} /> Verify / PDF
        </a>
      </div>
    </motion.article>
  );
}

export default function FeaturedCerts({ certs }: { certs: Certificate[] }) {
  const top3 = [...certs].sort((a, b) => a.rank - b.rank).slice(0, 3);
  return (
    <section id="certs" className="scroll-mt-28 border-y border-[rgba(237,234,226,0.12)] bg-[#111110] md:scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-28">
        <SectionHead kicker="03 · Credentials" title="Most valuable" accent="first." meta={`${certs.length} certs → /certificates`} />
        {/* rank 1: full-width feature (image left, details right).
            rank 2–3: equal cards below. All landscape, none cropped. */}
        <div className="space-y-4">
          {top3[0] && <FeatureCard c={top3[0]} />}
          <div className="grid gap-4 sm:grid-cols-2">
            {top3[1] && <Ticket c={top3[1]} />}
            {top3[2] && <Ticket c={top3[2]} />}
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <a href="/certificates" className="u-link font-mono text-sm uppercase tracking-widest text-[#edeae2]/70 hover:text-white">
            View all {certs.length} certificates →
          </a>
        </div>
      </div>
    </section>
  );
}
