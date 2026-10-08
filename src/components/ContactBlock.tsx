'use client';
import { useState } from "react";
import SectionHead from "./SectionHead";

export default function ContactBlock() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [state, setState] = useState<"idle" | "busy" | "ok" | "err">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("busy");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setState(res.ok ? "ok" : "err");
      if (res.ok) setForm({ name: "", email: "", message: "" });
    } catch {
      setState("err");
    }
  };

  const input =
    "w-full rounded-md border border-[rgba(237,234,226,0.15)] bg-white/[0.03] px-4 py-3 text-sm text-[#edeae2] placeholder:text-[#edeae2]/30 outline-none focus:border-[#ff4d00]";

  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-14 md:scroll-mt-20 md:py-28">
      <SectionHead kicker="04 · Contact" title="Say hello," accent="I reply." meta="~24h response" />
      <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-2xl border border-[rgba(237,234,226,0.12)] bg-white/[0.02] p-6 md:p-8">
          <p className="text-lg leading-relaxed text-[#edeae2]/75">
            Hiring for software, full-stack, or mobile roles? Need DevOps or cloud help?
            My inbox is open either way.
          </p>
          <ul className="mt-6 space-y-3 font-mono text-sm text-[#edeae2]/60">
            <li>✉︎ <a className="u-link break-all" href="mailto:sonawanekaushal05@gmail.com">sonawanekaushal05@gmail.com</a></li>
            <li>↗ <a className="u-link" href="https://www.linkedin.com/in/kaushal0510">linkedin.com/in/kaushal0510</a></li>
            <li>◷ Pune IST — usually replies within a day</li>
          </ul>
          <p className="font-hand mt-6 -rotate-1 text-xl text-[#edeae2]/50">no recruiters-spam, promise — well, mostly</p>
        </div>
        <form onSubmit={submit} className="rounded-2xl border border-[rgba(237,234,226,0.12)] bg-white/[0.02] p-6 md:p-8">
          {/* honeypot */}
          <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-widest text-[#edeae2]/50">Your name</span>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ada Lovelace" className={input} />
            </label>
            <label className="block">
              <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-widest text-[#edeae2]/50">Email / phone</span>
              <input required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="ada@example.com" className={input} />
            </label>
          </div>
          <label className="mt-4 block">
            <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-widest text-[#edeae2]/50">What&apos;s up?</span>
            <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Role, timeline, budget — or just hi." className={`${input} resize-y`} />
          </label>
          <button
            disabled={state === "busy"}
            className="mt-5 w-full rounded-md bg-[#ff4d00] py-3 font-mono text-xs font-bold uppercase tracking-widest text-white transition hover:brightness-110 disabled:opacity-60"
          >
            {state === "busy" ? "Sending…" : state === "ok" ? "Sent — talk soon ✓" : "Send message"}
          </button>
          {state === "err" && <p className="mt-3 text-sm text-red-400">Send failed — email me directly instead.</p>}
          {state === "ok" && <p className="mt-3 text-sm text-emerald-400">Sent — I&apos;ll get back within a day.</p>}
        </form>
      </div>
    </section>
  );
}
