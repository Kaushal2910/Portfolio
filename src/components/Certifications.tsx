// Certifications.tsx
"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";
import { FiDownload } from "react-icons/fi";

export type Certificate = {
  id: string;
  title: string;
  imageUrl: string;
  downloadUrl: string;
};

type CertificationsProps = {
  certificates: Certificate[];
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" },
  }),
};

const Certifications = forwardRef<HTMLElement, CertificationsProps>(
  function Certifications({ certificates }, ref) {
    return (
      <section
        ref={ref}
        id="certifications"
        className="min-h-screen bg-slate-950 px-6 py-24 text-slate-100 md:px-12"
      >
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl"
        >
          Certifications
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto mt-16 grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.id}
              custom={i}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group relative rounded-xl bg-slate-900/70 p-4 shadow-lg ring-1 ring-slate-800 transition-shadow hover:shadow-sky-500/20 hover:ring-sky-500/60"
            >
              <div className="aspect-[16/10] overflow-hidden rounded-md bg-slate-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cert.imageUrl}
                  alt={cert.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <h3 className="mt-4 text-center text-lg font-semibold text-sky-400">
                {cert.title}
              </h3>

              <a
                href={cert.downloadUrl}
                download
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-sky-500/10 py-2.5 text-sm font-medium text-sky-400 ring-1 ring-inset ring-sky-500/20 transition-all hover:bg-sky-500/20 hover:text-sky-300"
              >
                <FiDownload size={16} />
                Download
              </a>
            </motion.div>
          ))}
        </motion.div>
      </section>
    );
  }
);

export default Certifications;