'use client';
import { motion } from "framer-motion";

export default function SectionHead({
  kicker,
  title,
  accent,
  meta,
  light = false,
}: {
  kicker: string;
  title: string;
  accent?: string;
  meta?: string;
  light?: boolean;
}) {
  const sub = light ? "text-[#16130e]/50" : "text-[#edeae2]/40";
  const ink = light ? "text-[#16130e]" : "text-[#edeae2]";
  const lineC = light ? "bg-[#16130e]/15" : "bg-[rgba(237,234,226,0.12)]";
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className="mb-10"
    >
      <div className="flex items-baseline justify-between gap-4">
        <p className={`font-mono text-xs uppercase tracking-[0.25em] ${sub}`}>{kicker}</p>
        {meta && <p className={`font-mono text-xs ${sub}`}>{meta}</p>}
      </div>
      <h2 className={`font-display mt-2 text-3xl font-bold tracking-tight md:text-5xl ${ink}`}>
        {title} {accent && <span className="font-serif-accent font-normal">{accent}</span>}
      </h2>
      <div className={`mt-5 h-px w-full ${lineC}`} />
    </motion.div>
  );
}
