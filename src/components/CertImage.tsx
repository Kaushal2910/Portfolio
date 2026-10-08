'use client';

import { useState } from "react";

/** Certificate image that degrades gracefully: if the file isn't uploaded yet
 *  (or fails to load), show a matte monogram instead of a broken-image icon. */
export default function CertImage({
  src,
  title,
  className = "",
}: {
  src: string;
  title: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`flex flex-col items-center justify-center gap-2 bg-[#0a0a09] p-6 text-center ${className}`}>
        <span className="font-display text-5xl font-bold text-[#edeae2]/20">
          {title.charAt(0)}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-widest text-[#edeae2]/35">
          Preview pending upload
        </span>
      </div>
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={title}
      loading="lazy"
      decoding="async"
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
