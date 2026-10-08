'use client';

import { useEffect, useRef, useState } from "react";
import { IMAGE_ACCEPT, validateImageFile } from "@/lib/images";

interface Props {
  label: string;
  /** folder sent to /api/upload: "site" | "projects" | "certificates" */
  folder: "site" | "projects" | "certificates";
  /** only for folder=site: "profile" | "resume" */
  target?: "profile" | "resume";
  value: string;
  onChange: (path: string) => void;
  accept?: string;
  hint?: string;
}

/**
 * Reusable upload field: preview (aspect preserved) → validate ext+MIME →
 * upload → replace / remove. Used for profile, project and certificate images.
 */
export default function ImageUpload({
  label,
  folder,
  target,
  value,
  onChange,
  accept = IMAGE_ACCEPT,
  hint = "PNG, JPG or JPEG · max 10 MB",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const pick = async (file: File) => {
    setError("");
    const problem = validateImageFile(file);
    if (problem) {
      setError(problem);
      return;
    }
    setPreview(URL.createObjectURL(file)); // instant preview, original ratio
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", folder);
      if (target) fd.append("target", target);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      onChange(data.path);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
      setPreview(null);
    } finally {
      setBusy(false);
    }
  };

  const src = preview ?? value;

  return (
    <div>
      <p className="mb-1.5 font-mono text-[11px] uppercase tracking-widest text-[#edeae2]/50">{label}</p>
      {src ? (
        <div className="relative mb-2 overflow-hidden rounded-lg border border-[rgba(237,234,226,0.15)] bg-black/30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={`${label} preview`} className="max-h-44 w-full object-contain" />
          <button
            type="button"
            onClick={() => {
              setPreview(null);
              onChange("");
            }}
            className="absolute right-2 top-2 rounded-md bg-black/70 px-2.5 py-1 font-mono text-[11px] text-[#edeae2]/80 hover:text-red-400"
          >
            Remove
          </button>
        </div>
      ) : null}
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) pick(f);
            e.target.value = ""; // allow re-picking the same file
          }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="whitespace-nowrap rounded-md border border-[rgba(237,234,226,0.15)] px-3 py-2 font-mono text-xs text-[#edeae2]/70 hover:border-[#ff4d00] hover:text-white disabled:opacity-60"
        >
          {busy ? "Uploading…" : src ? "Replace image" : "Choose image"}
        </button>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/certificates/file.jpg — or paste a URL"
          className="flex-1 rounded-md border border-[rgba(237,234,226,0.15)] bg-white/[0.03] px-3 py-2 font-mono text-xs text-[#edeae2] outline-none placeholder:text-[#edeae2]/30 focus:border-[#ff4d00]"
        />
      </div>
      <p className="mt-1 font-mono text-[11px] text-[#edeae2]/35">{hint}</p>
      {error && <p className="mt-1 font-mono text-xs text-red-400">{error}</p>}
    </div>
  );
}
