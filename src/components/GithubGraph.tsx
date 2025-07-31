// GitHubGraph.tsx (in src/components/)
"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Dynamically import react-github-calendar to avoid SSR issues
const GitHubCalendar = dynamic(() => import("react-github-calendar"), { ssr: false });

const GitHubGraph = () => {
  return (
    <section
      id="github"
      className="bg-black text-white py-24 px-6 md:px-12 min-h-[50vh]"
    >
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl"
      >
        GitHub Activity
      </motion.h2>

      <div className="mt-12 flex justify-center">
        <GitHubCalendar
          username="Kaushal2910"
          colorScheme="dark"
          blockSize={15}
          blockMargin={5}
          fontSize={16}
          
        />
      </div>
    </section>
  );
};

export default GitHubGraph;
