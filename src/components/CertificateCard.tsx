'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiX, FiExternalLink } from 'react-icons/fi';
import type { Certificate } from '@/types';

interface Props {
  cert: Certificate;
  index: number;
}

export default function CertificateCard({ cert, index }: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <motion.div
        className="group relative rounded-2xl overflow-hidden bg-white/[0.02] border border-white/5 hover:border-blue-500/20 hover:bg-white/[0.04] transition-all duration-300 cursor-pointer"
        onClick={() => setShowModal(true)}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        whileHover={{ y: -4 }}
      >
        {/* Image */}
        <div className="relative h-44 overflow-hidden bg-gradient-to-br from-blue-500/5 to-transparent">
          <img
            src={cert.imageUrl}
            alt={cert.title}
            className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-4">
          <h4 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-2 mb-1">
            {cert.title}
          </h4>
          {cert.issuer && (
            <p className="text-xs text-gray-500 font-mono">
              {cert.issuer}{cert.year ? ` · ${cert.year}` : ''}
            </p>
          )}
        </div>
      </motion.div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            className="relative max-w-3xl w-full bg-[#111] rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
              <div>
                <h3 className="text-white font-semibold text-sm">{cert.title}</h3>
                {cert.issuer && (
                  <p className="text-xs text-gray-500 font-mono mt-0.5">
                    {cert.issuer}{cert.year ? ` · ${cert.year}` : ''}
                  </p>
                )}
              </div>
              <button
                className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                onClick={() => setShowModal(false)}
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Certificate Image */}
            <div className="max-h-[60vh] overflow-y-auto">
              <img
                src={cert.imageUrl}
                alt={cert.title}
                className="w-full object-contain bg-black/50"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = '<div class="flex items-center justify-center h-48 text-gray-600 font-mono text-sm">Certificate image not available</div>';
                }}
              />
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/5">
              <a
                href={cert.downloadUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30 hover:bg-blue-500/25 hover:border-blue-500/50 transition-all text-sm font-mono"
              >
                <FiDownload size={14} /> Download PDF
              </a>
              <a
                href="https://kaushalsonawane.dev/#certifications"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 transition-all text-sm font-mono"
              >
                <FiExternalLink size={14} /> View Live
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}