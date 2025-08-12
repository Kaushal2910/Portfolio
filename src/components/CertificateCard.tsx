//src/components/CertificateCard.tsx

"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface CertificateCardProps {
  title: string;
  image: string; // path in /public
  downloadUrl: string; // direct PDF or image link
}

export default function CertificateCard({ title, image, downloadUrl }: CertificateCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="rounded-lg bg-slate-800 shadow-lg overflow-hidden border border-slate-700"
    >
      <div className="relative w-full h-56">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
        <a
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-sky-400 hover:underline"
        >
          View / Download
        </a>
      </div>
    </motion.div>
  );
}