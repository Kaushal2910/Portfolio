'use client';

import { useEffect, useState } from "react";
import ImageUpload from "@/components/ImageUpload";
import type { Certificate } from "@/types";

interface Msg {
  at: string;
  name: string;
  email: string;
  message: string;
}

const EMPTY_CERT = { title: "", issuer: "", year: "", category: "", rank: "", imageUrl: "", downloadUrl: "" };

const field =
  "w-full rounded-md border border-[rgba(237,234,226,0.15)] bg-white/[0.03] px-3 py-2 text-sm text-[#edeae2] outline-none placeholder:text-[#edeae2]/30 focus:border-[#ff4d00]";

function CertManager() {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [form, setForm] = useState(EMPTY_CERT);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const load = () =>
    fetch("/api/certificates")
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && setCerts(d))
      .catch(() => {});
  useEffect(() => { load(); }, []);

  const set = (k: keyof typeof EMPTY_CERT, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const startEdit = (c: Certificate) => {
    setEditingId(c.id);
    setForm({
      title: c.title,
      issuer: c.issuer ?? "",
      year: c.year ?? "",
      category: c.category ?? "",
      rank: String(c.rank),
      imageUrl: c.imageUrl,
      downloadUrl: c.downloadUrl,
    });
    setError("");
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancel = () => {
    setEditingId(null);
    setForm(EMPTY_CERT);
    setError("");
  };

  const save = async () => {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const payload = {
        ...form,
        rank: form.rank.trim() === "" ? undefined : Number(form.rank),
      };
      const res = await fetch(editingId ? `/api/certificates/${editingId}` : "/api/certificates", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setNotice(editingId ? "Updated. Commit + push to publish." : `Added at rank #${data.rank}. Commit + push to publish.`);
      cancel();
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setBusy(false);
    }
  };

  const remove = async (c: Certificate) => {
    if (!window.confirm(`Delete “${c.title}”? (Files stay on disk.)`)) return;
    const res = await fetch(`/api/certificates/${c.id}`, { method: "DELETE" });
    if (res.ok) {
      if (editingId === c.id) cancel();
      load();
    }
  };

  return (
    <section className="mt-8 rounded-2xl border border-[rgba(237,234,226,0.12)] bg-white/[0.02] p-6">
      <h2 className="font-display text-xl font-bold">
        Certificates <span className="font-mono text-xs font-normal text-[#edeae2]/40">{certs.length} total</span>
      </h2>
      <p className="mt-1 text-sm text-[#edeae2]/55">
        {editingId ? "Editing — change fields, re-upload files if needed, then save." : "New certs land at the bottom; set a rank to feature them (homepage shows #1–#3)."}
      </p>

      <div className="mt-4 space-y-4">
        <label className="block">
          <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-widest text-[#edeae2]/50">Name *</span>
          <input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. AWS Solutions Architect – Associate" className={field} />
        </label>
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block">
            <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-widest text-[#edeae2]/50">Issuer</span>
            <input value={form.issuer} onChange={(e) => set("issuer", e.target.value)} placeholder="AWS" className={field} />
          </label>
          <label className="block">
            <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-widest text-[#edeae2]/50">Year</span>
            <input value={form.year} onChange={(e) => set("year", e.target.value)} placeholder="2026" className={field} />
          </label>
          <label className="block">
            <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-widest text-[#edeae2]/50">Rank (blank = bottom)</span>
            <input value={form.rank} onChange={(e) => set("rank", e.target.value)} placeholder="auto" inputMode="numeric" className={field} />
          </label>
        </div>
        <label className="block">
          <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-widest text-[#edeae2]/50">Category</span>
          <input value={form.category} onChange={(e) => set("category", e.target.value)} placeholder="Cloud & DevOps" list="cert-cats" className={field} />
          <datalist id="cert-cats">
            {[...new Set(certs.map((c) => c.category))].map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </label>
        <ImageUpload label="Certificate image *" folder="certificates" value={form.imageUrl} onChange={(v) => set("imageUrl", v)} />
        <ImageUpload label="PDF / verify link" folder="certificates" mode="pdf" value={form.downloadUrl} onChange={(v) => set("downloadUrl", v)} hint="PDF only · optional — defaults to the image" />
        {error && <p className="font-mono text-xs text-red-400">{error}</p>}
        {notice && <p className="font-mono text-xs text-emerald-400">✓ {notice}</p>}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={save}
            disabled={busy || !form.title.trim() || !form.imageUrl.trim()}
            className="rounded-md bg-[#ff4d00] px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-white hover:brightness-110 disabled:opacity-50"
          >
            {busy ? "Saving…" : editingId ? "Save changes" : "Add certificate"}
          </button>
          {editingId && (
            <button type="button" onClick={cancel} className="rounded-md border border-[rgba(237,234,226,0.15)] px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-[#edeae2]/70 hover:text-white">
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 space-y-2 border-t border-[rgba(237,234,226,0.1)] pt-4">
        {certs.map((c) => (
          <div key={c.id} className="flex items-center gap-3 rounded-lg border border-[rgba(237,234,226,0.08)] p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.imageUrl} alt="" loading="lazy" className="h-10 w-16 shrink-0 rounded bg-black/40 object-contain" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-[#edeae2]">#{c.rank} · {c.title}</p>
              <p className="truncate font-mono text-[11px] text-[#edeae2]/40">{c.issuer}{c.year ? ` · ${c.year}` : ""} · {c.category}</p>
            </div>
            <button type="button" onClick={() => startEdit(c)} className="shrink-0 rounded-md border border-[rgba(237,234,226,0.15)] px-2.5 py-1.5 font-mono text-[11px] text-[#edeae2]/70 hover:border-[#ff4d00] hover:text-white">
              Edit
            </button>
            <button type="button" onClick={() => remove(c)} className="shrink-0 rounded-md border border-[rgba(237,234,226,0.15)] px-2.5 py-1.5 font-mono text-[11px] text-[#edeae2]/70 hover:border-red-500 hover:text-red-400">
              Del
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Hidden admin: /admin-muse — profile photo, certificates, contact inbox. No auth, obscure URL. */
export default function AdminMusePage() {
  const [profile, setProfile] = useState("/profile.jpg");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const h = window.location.hostname;
    setIsLive(h !== "localhost" && h !== "127.0.0.1");
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
      {isLive && (
        <p className="mt-4 rounded-lg border border-amber-400/40 bg-amber-400/10 p-3 text-sm leading-relaxed text-amber-200">
          You&apos;re on the live site — edits made here won&apos;t stick (server files are
          temporary). Make changes on <span className="font-mono text-xs">localhost:3000/admin-muse</span> instead,
          then commit + push to publish.
        </p>
      )}
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

      <CertManager />

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
