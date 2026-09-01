'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiX } from 'react-icons/fi';
import Image from 'next/image';
import type { Certificate } from '@/types';

interface Props {
  cert: Certificate;
  index: number;
}

export default function CertificateCard({ cert, index }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // Modal open behavior: focus trap, Escape to close, scroll lock, focus restore
  useEffect(() => {
    if (!showModal) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowModal(false);
        return;
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      previouslyFocused?.focus();
    };
  }, [showModal]);

  const fallbackTile = (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/[0.06] to-black">
      <span className="text-5xl font-bold text-white/10 select-none">
        {(cert.issuer || cert.title).charAt(0)}
      </span>
    </div>
  );

  return (
    <>
      <motion.div
        className="group relative rounded-2xl overflow-hidden bg-white/[0.02] border border-white/5 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 cursor-pointer"
        onClick={() => setShowModal(true)}
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-label={`View ${cert.title} certificate`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setShowModal(true);
          }
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        whileHover={{ y: -4 }}
      >
        {/* Image */}
        <div className="relative h-44 overflow-hidden bg-gradient-to-br from-white/[0.06] to-black">
          {!imgError ? (
            <Image
              src={cert.imageUrl}
              alt={cert.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              onError={() => setImgError(true)}
            />
          ) : (
            fallbackTile
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-4">
          <h4 className="text-sm font-semibold text-white transition-colors line-clamp-2 mb-1">
            {cert.title}
          </h4>
          {cert.issuer && (
            <p className="text-xs text-gray-500 font-mono">
              {cert.issuer}{cert.year ? ` · ${cert.year}` : ''}
            </p>
          )}
        </div>
      </motion.div>

      {/* Modal — portaled to <body> so transformed ancestors don't break fixed positioning */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {showModal && (
              <div
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                onClick={() => setShowModal(false)}
              >
                <motion.div
                  ref={dialogRef}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={`cert-modal-title-${cert.id}`}
                  tabIndex={-1}
                  className="relative max-w-3xl w-full bg-[#111] rounded-2xl border border-white/10 overflow-hidden shadow-2xl outline-none"
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 20 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Modal Header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                    <div>
                      <h3 id={`cert-modal-title-${cert.id}`} className="text-white font-semibold text-sm">
                        {cert.title}
                      </h3>
                      {cert.issuer && (
                        <p className="text-xs text-gray-500 font-mono mt-0.5">
                          {cert.issuer}{cert.year ? ` · ${cert.year}` : ''}
                        </p>
                      )}
                    </div>
                    <button
                      className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                      onClick={() => setShowModal(false)}
                      aria-label="Close certificate preview"
                    >
                      <FiX size={18} />
                    </button>
                  </div>

                  {/* Certificate Image */}
                  <div className="max-h-[60vh] overflow-y-auto">
                    {imgError ? (
                      <div className="flex items-center justify-center h-48 text-gray-600 font-mono text-sm">
                        Certificate image not available
                      </div>
                    ) : (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={cert.imageUrl}
                        alt={cert.title}
                        className="w-full object-contain bg-black/50"
                        onError={() => setImgError(true)}
                      />
                    )}
                  </div>

                  {/* Modal Footer */}
                  <div className="flex items-center justify-end px-6 py-4 border-t border-white/5">
                    <a
                      href={cert.downloadUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.06] text-white/80 border border-white/[0.12] hover:bg-white/[0.1] hover:border-white/20 transition-all text-sm font-mono"
                    >
                      <FiDownload size={14} /> Download PDF
                    </a>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
