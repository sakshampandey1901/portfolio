"use client";

import { motion } from "framer-motion";

export default function TechStack() {
  const row1 = "PYTHON / JAVASCRIPT / TYPESCRIPT / JAVA / SQL / C++ / HTML / CSS / ".repeat(3);
  const row2 = "REACT / NEXT.JS / NODE.JS / ANGULAR / FASTAPI / DOCKER / POSTGRESQL / ".repeat(3);
  const row3 = "PYTORCH / TENSORFLOW / RAG / PANDAS / NUMPY / PINECONE / RL / ".repeat(3);

  return (
    <section className="hairline-b bg-blueprint text-alabaster overflow-hidden">
      <div className="p-6 md:p-12 hairline-b border-alabaster">
        <span className="font-sans text-xs uppercase tracking-widest font-bold">
          [ TECH_STACK.LOG ]
        </span>
      </div>

      <div className="flex flex-col hairline-b border-alabaster relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-alabaster/20 z-10"></div>
        
        {/* Row 1 */}
        <div className="py-6 hairline-b border-alabaster/20 overflow-hidden flex items-center">
          <motion.div
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap font-sans font-bold text-4xl md:text-6xl tracking-tighter"
          >
            {row1}
          </motion.div>
        </div>

        {/* Row 2 (Reverse) */}
        <div className="py-6 hairline-b border-alabaster/20 overflow-hidden flex items-center">
          <motion.div
            animate={{ x: ["-33.33%", "0%"] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap font-serif italic text-4xl md:text-6xl tracking-tight text-alabaster/80"
          >
            {row2}
          </motion.div>
        </div>

        {/* Row 3 */}
        <div className="py-6 overflow-hidden flex items-center">
          <motion.div
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap font-sans font-bold text-4xl md:text-6xl tracking-tighter text-terracotta"
          >
            {row3}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
