'use client';

import { useEffect, useState } from "react";
import ImageUpload from "@/components/ImageUpload";

interface Msg {
  at: string;
  name: string;
  email: string;
  message: string;
}

/** Hidden admin: /admin-muse — profile photo + contact inbox. No auth, obscure URL. */
export default function AdminMusePage() {
  const [profile, setProfile] = useState("/profile.jpg");
  const [msgs, setMsgs] = useState<Msg[]>([]);

  useEffect(() => {
    fetch("/api/contact")
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && setMsgs(d))
      .catch(() => {});
  }, []);

  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-28 md:pt-32">
      <a href="/" className="u-link font-mono text-xs uppercase tracking-widest text-[#edeae2]/50 hover:text-[#ff4d00]">
        ← Back home
      </a>
      <h1 className="font-display mt-6 text-3xl font-bold tracking-tight md:text-4xl">
        Site <span className="font-serif-accent font-normal">assets.</span>
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-[#edeae2]/60">
        Profile photo accepts PNG, JPG and JPEG — the hero tries{" "}
        <span className="font-mono text-xs">/profile.png → .jpg → .jpeg</span> automatically,
        so any format works. Transparent PNGs blend straight into the dark background;
        for white-background photos see the README background-removal workflow.
      </p>

      <section className="mt-8 rounded-2xl border border-[rgba(237,234,226,0.12)] bg-white/[0.02] p-6">
        <ImageUpload
          label="Profile photograph"
          folder="site"
          target="profile"
          value={profile}
          onChange={(p) => setProfile(p)}
        />
        {profile && (
          <p className="mt-3 font-mono text-xs text-emerald-400">
            ✓ Live at <span className="text-[#edeae2]/70">{profile}</span> — hero picks it up on refresh.
          </p>
        )}
      </section>

      <section className="mt-8 rounded-2xl border border-[rgba(237,234,226,0.12)] bg-white/[0.02] p-6">
        <h2 className="font-display text-xl font-bold">Inbox <span className="font-mono text-xs font-normal text-[#edeae2]/40">{msgs.length} messages</span></h2>
        <div className="mt-4 space-y-3">
          {msgs.length === 0 && <p className="font-mono text-xs text-[#edeae2]/40">No messages yet.</p>}
          {msgs.map((m, i) => (
            <article key={i} className="rounded-lg border border-[rgba(237,234,226,0.1)] p-3">
              <p className="font-mono text-xs text-[#edeae2]/80">
                {m.name} <span className="text-[#edeae2]/40">· {m.email} · {new Date(m.at).toLocaleString("en-IN")}</span>
              </p>
              <p className="mt-1 text-sm text-[#edeae2]/70">{m.message}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
