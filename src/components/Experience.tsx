'use client';
import { motion } from "framer-motion";
import SectionHead from "./SectionHead";

const roles = [
  { role: "Associate DevOps Engineer", co: "Thynk Technology India", when: "Sep 2025 — Mar 2026", body: "Own AWS estates, Jenkins pipelines, Docker builds and Linux deploys. Cut release friction by containerizing services and standardizing CI.", tags: ["AWS", "Jenkins", "Docker", "K8s"] },
  { role: "Web Development Intern", co: "Young Web Solutions", when: "Feb — Jul 2025", body: "Shipped 8+ client sites for UK/US markets on Wix Studio & WordPress — responsive, SEO-clean, handed off with docs.", tags: ["WordPress", "Wix Studio", "SEO"] },
  { role: "Cloud & Linux Trainee", co: "CodeZone", when: "Dec 2024 — Mar 2025", body: "EC2/S3/IAM fundamentals, virtualization and networking labs. Lived in the terminal for 3 months.", tags: ["EC2", "S3", "IAM", "Linux"] },
  { role: "Data Science & AI/ML Intern", co: "YBI Foundation", when: "Sep — Oct 2024", body: "Pandas/NumPy pipelines, first ML models, matplotlib storytelling. Where the Python habit started.", tags: ["Python", "Pandas", "ML"] },
];

export default function Experience() {
  return (
    <section id="about" className="bg-[#edeae2] py-20 text-[#16130e] md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead light kicker="01 · Profile" title="Engineer who" accent="ships." meta="Pune, India" />
        <div className="ruled grid gap-10 rounded-2xl border border-[#16130e]/10 bg-[#edeae2] p-6 md:grid-cols-[0.9fr_1.1fr] md:p-10">
          <div>
            <p className="text-lg leading-relaxed text-[#16130e]/85">
              I&apos;m Kaushal — a software engineer from Pune who works across the stack:
              <em className="font-serif-accent"> mobile & full-stack apps</em> up front,
              cloud and CI/CD underneath. Bilingual English · 日本語 (JLPT N4).
            </p>
            <p className="mt-4 leading-relaxed text-[#16130e]/65">
              I&apos;ve shipped Expo apps (RelationshipOS, MediTrack), Next.js platforms,
              and the Jenkins/Docker/AWS pipelines that deploy them — most recently as a
              DevOps engineer at Thynk Technology. Open to SDE, full-stack, mobile, or
              DevOps roles: I like owning a feature from commit to production.
            </p>
            <p className="font-hand mt-6 -rotate-1 text-2xl text-[#16130e]/70">
              “boring deploys are the goal” — me, after a 2am page
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[{ n: "11", l: "projects" }, { n: "23", l: "certs" }, { n: "4", l: "roles" }].map((s) => (
                <div key={s.l} className="rounded-xl border border-[#16130e]/10 bg-white/40 p-3 text-center">
                  <p className="font-display text-2xl font-bold">{s.n}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#16130e]/50">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
          <ol className="relative space-y-0 border-l-2 border-[#16130e]/15 pl-0">
            {roles.map((r, i) => (
              <motion.li
                key={r.role}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="group relative pb-8 pl-6 last:pb-0"
              >
                <span className="absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 border-[#edeae2] bg-[#ff4d00]" />
                <p className="font-mono text-[11px] uppercase tracking-widest text-[#16130e]/45">{r.when}</p>
                <h3 className="font-display mt-1 font-bold">{r.role} <span className="font-normal text-[#16130e]/55">@ {r.co}</span></h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#16130e]/70">{r.body}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {r.tags.map((t) => (
                    <span key={t} className="rounded-full border border-[#16130e]/15 px-2 py-0.5 font-mono text-[11px] text-[#16130e]/60">{t}</span>
                  ))}
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
