'use client';

import { motion } from "framer-motion";
import { FiArrowUpRight, FiCopy, FiCheck, FiMapPin } from "react-icons/fi";
import { useEffect, useState } from "react";

const line = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/** Profile candidates in order — transparent PNG first, then JPG/JPEG.
 *  Uploads land here via /api/upload (folder=site, target=profile) which
 *  preserves the real extension, so any of these may exist. */
const PROFILE_CANDIDATES = ["/profile.png", "/profile.jpg", "/profile.jpeg"];

function Portrait() {
  const [idx, setIdx] = useState(0);
  const exhausted = idx >= PROFILE_CANDIDATES.length;

  return (
    <div className="relative">
      {/* soft floor light — sits behind the cutout, never on the face */}
      <div
        aria-hidden
        className="portrait-glow absolute inset-x-8 bottom-0 top-1/3 rounded-full"
      />
      <div className="relative aspect-[4/5] w-full">
        {!exhausted ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={PROFILE_CANDIDATES[idx]}
            alt="Portrait of Kaushal Sonawane"
            width={840}
            height={1050}
            decoding="async"
            /* Tweak crop per photo: object-[50%_22%] keeps eyes in frame */
            className="portrait-img h-full w-full object-cover object-[50%_22%] transition-transform duration-500 ease-out hover:scale-[1.015]"
            onError={() => setIdx((i) => i + 1)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-display text-7xl font-bold tracking-tight text-[#edeae2]/25">
              KS
            </span>
          </div>
        )}
      </div>
      {/* stamp sits over the lower third (torso), clear of the face */}
      <div className="absolute bottom-3 left-3 -rotate-3 rounded-sm bg-[#ff4d00] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-white shadow-lg">
        Thynk · DevOps
      </div>
    </div>
  );
}

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const [clock, setClock] = useState("");
  const email = "sonawanekaushal05@gmail.com";

  useEffect(() => {
    const f = () =>
      setClock(
        new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
    f();
    const t = setInterval(f, 1000);
    return () => clearInterval(t);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch { /* clipboard unavailable */ }
  };

  return (
    <header className="dotgrid relative overflow-hidden pb-10 pt-24 md:pb-14 md:pt-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_20%,rgba(255,77,0,0.08),transparent_70%)]" />
      {/* 55/45 split, vertically centered — no 100vh forcing */}
      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 md:grid-cols-[55fr_45fr] md:gap-10">
        {/* left: type */}
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(237,234,226,0.15)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-[#edeae2]/70"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Open to SDE / Full-stack roles · {clock} IST
          </motion.p>
          <h1 className="font-display text-[clamp(2.8rem,6.5vw,4.75rem)] font-bold leading-[0.95] tracking-tight text-[#edeae2]">
            {["Kaushal", "Sonawane"].map((w, i) => (
              <span key={w} className="block overflow-hidden">
                <motion.span custom={i} variants={line} initial="hidden" animate="show" className="block">
                  {w}
                  {i === 1 && <span className="text-[#ff4d00]">.</span>}
                </motion.span>
              </span>
            ))}
          </h1>
          <p className="mt-4 max-w-xl text-[clamp(1rem,1.4vw,1.125rem)] leading-relaxed text-[#edeae2]/70">
            Software engineer — I build <span className="font-serif-accent text-[#edeae2]">full-stack
            & mobile apps</span> and the <span className="font-serif-accent text-[#edeae2]">cloud
            infrastructure</span> they run on. Ex-DevOps @ Thynk · React Native · Next.js.
          </p>
          {/* JLPT qualification badge — intentional credential, not inline text */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-5"
          >
            <span
              role="img"
              aria-label="Japanese language proficiency: JLPT N4 certified"
              className="inline-flex max-w-full flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border border-[rgba(237,234,226,0.15)] bg-white/[0.03] px-4 py-2.5"
            >
              <span className="font-jp text-xl font-bold leading-none tracking-wide text-[#edeae2]">日本語</span>
              <span aria-hidden className="h-5 w-px bg-[rgba(237,234,226,0.18)]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#edeae2]/60">
                Japanese · <span className="font-bold text-[#ff4d00]">N4</span> Certified
              </span>
            </span>
          </motion.div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="/#work"
              className="group inline-flex items-center gap-2 rounded-md bg-[#edeae2] px-5 py-3 font-mono text-xs font-bold uppercase tracking-widest text-[#16130e] transition-transform hover:-translate-y-0.5"
            >
              Selected work
              <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <button
              onClick={copy}
              className="inline-flex items-center gap-2 rounded-md border border-[rgba(237,234,226,0.2)] px-5 py-3 font-mono text-xs uppercase tracking-widest text-[#edeae2]/80 hover:border-[#ff4d00] hover:text-[#edeae2]"
            >
              {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
              {copied ? "Copied!" : "Copy email"}
            </button>
          </div>
          <p className="mt-5 flex items-center gap-1.5 font-mono text-xs text-[#edeae2]/40">
            <FiMapPin size={12} /> Pune, India — working worldwide, async-friendly
          </p>
        </div>

        {/* right: cinematic portrait + terminal in flow (never over the face) */}
        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto w-full max-w-[420px]"
        >
          <Portrait />
          <div className="mt-3 rounded-lg border border-[rgba(237,234,226,0.15)] bg-[#141412]/90 p-3 font-mono text-[11px] leading-relaxed text-[#edeae2]/70 shadow-2xl">
            <p className="text-[#edeae2]/40">$ whoami</p>
            <p>kaushal — ships apps + infra <span className="text-emerald-400">✓</span></p>
            <p className="text-[#edeae2]/40">$ uptime</p>
            <p>4 roles · 23 certs · 11 projects</p>
          </div>
          <p className="font-hand mt-3 -rotate-1 text-right text-xl text-[#edeae2]/50">
            yes, I actually answer emails ↓
          </p>
        </motion.aside>
      </div>
    </header>
  );
}
