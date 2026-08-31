'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const GitHubCalendar = dynamic(() => import('react-github-calendar'), { ssr: false });

export default function GithubGraph() {
  return (
    <section id="github" className="py-24 px-4 bg-[#0a0f1e] relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-blue-400 font-mono text-sm mb-2">04.</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">GitHub Activity</h2>
        </motion.div>

        <motion.div
          className="flex justify-center p-6 rounded-2xl bg-white/[0.02] border border-white/5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GitHubCalendar
            username="Kaushal2910"
            colorScheme="dark"
            fontSize={12}
            blockSize={12}
            blockMargin={3}
            labels={{
              totalCount: '{{count}} contributions',
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}