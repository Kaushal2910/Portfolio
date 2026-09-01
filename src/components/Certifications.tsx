'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight, FiGrid, FiX } from 'react-icons/fi';
import CertificateCard from './CertificateCard';
import { certificates } from '@/data/certificates';
import categoryData from '../../data/certificate-categories.json';

const certificateCategories = [{ id: 'All', label: 'All' }, ...categoryData];

const TOP_COUNT = 3;

interface Props {
  mode?: 'preview' | 'full';
}

export default function Certifications({ mode = 'preview' }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [showAllPreview, setShowAllPreview] = useState(false);

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return certificates;
    return certificates.filter((c) => c.category === activeCategory);
  }, [activeCategory]);

  // Counts per category for the filter chips
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: certificates.length };
    certificates.forEach((c) => {
      counts[c.category] = (counts[c.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Determine what to show in the grid
  const visibleCerts = useMemo(() => {
    if (mode === 'full') return filtered;
    // preview mode (homepage): cap at TOP_COUNT (3) only when unfiltered,
    // otherwise show every match for the selected category
    if (activeCategory === 'All') return filtered.slice(0, TOP_COUNT);
    return filtered;
  }, [mode, filtered, activeCategory]);

  const showViewAllLink = mode === 'preview';

  return (
    <section id="certifications" className="py-24 px-4 bg-black relative scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-white/60 font-mono text-sm mb-2">
            {mode === 'full' ? 'All Credentials' : '03.'}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {mode === 'full' ? 'Certifications & Credentials' : 'Certifications'}
          </h2>
          <p className="text-gray-500 mt-3 font-mono text-sm">
            {certificates.length} certifications · {Object.keys(categoryCounts).length - 1} categories
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex justify-center gap-2 mb-10 flex-wrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {certificateCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = categoryCounts[cat.id] || 0;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setShowAllPreview(false);
                }}
                aria-pressed={isActive}
                className={`group inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono transition-all duration-300 border ${
                  isActive
                    ? 'bg-white/[0.12] text-white border-amber-400/40 shadow-[0_0_20px_-5px_rgba(255,255,255,0.2)]'
                    : 'bg-white/[0.02] text-gray-400 border-white/5 hover:border-white/15 hover:text-white'
                }`}
              >
                {cat.label}
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full transition-colors ${
                    isActive ? 'bg-white/[0.08] text-white/70' : 'bg-white/5 text-gray-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + (showAllPreview ? '-all' : '-top')}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            {visibleCerts.length > 0 ? (
              visibleCerts.map((cert, i) => (
                <CertificateCard key={cert.id} cert={cert} index={i} />
              ))
            ) : (
              <div className="col-span-full text-center py-16 text-gray-500 font-mono text-sm">
                No certifications in this category yet.
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Preview-mode: "View All" opens /certificates in a new tab */}
        {showViewAllLink && (
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <a
              href="/certificates"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.02] border border-white/10 text-gray-300 hover:text-white/60 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300 font-mono text-sm"
            >
              <FiGrid size={16} />
              View all {certificates.length} certificates
              <FiArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </motion.div>
        )}

        {/* Preview-mode + filtered: show a small "clear filter" link */}
        {mode === 'preview' && activeCategory !== 'All' && (
          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <button
              onClick={() => setActiveCategory('All')}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-500 hover:text-white/60 transition-colors"
            >
              <FiX size={12} /> Clear filter
            </button>
          </motion.div>
        )}

        {/* Full-mode: subtle count + back to home */}
        {mode === 'full' && (
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-14"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600 font-mono text-xs">
              Showing {visibleCerts.length} of {certificates.length} credentials
            </p>
            <span className="hidden sm:inline text-gray-700">·</span>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- anchor jump to homepage section */}
            <a
              href="/#certifications"
              className="text-xs font-mono text-gray-500 hover:text-white/60 transition-colors"
            >
              ← Back to home
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}