"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  const marqueeText = "AI SYSTEMS ENGINEER / RAG / DECISION ENGINES / AI INFRASTRUCTURE / ";
  
  return (
    <section className="relative h-screen flex flex-col justify-between hairline-b bg-alabaster overflow-hidden">
      
      {/* Top Nav/Links */}
      <div className="flex justify-between items-center p-6 md:p-12 hairline-b">
        <span className="font-sans text-xs uppercase tracking-widest text-espresso font-bold">
          [ SP_2026 ]
        </span>
        <div className="flex gap-6 font-sans text-xs tracking-widest uppercase">
          {["Projects", "GitHub", "Resume"].map((label) => (
             <a key={label} href={`#${label.toLowerCase()}`} className="flex items-center gap-1 group">
               <span className="group-hover:text-terracotta transition-colors">{label}</span>
               <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
             </a>
          ))}
        </div>
      </div>

      {/* Massive Typography Center */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-12 relative z-10 w-full overflow-hidden">
        <div className="relative overflow-hidden">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[12vw] md:text-[14vw] leading-[0.8] tracking-tighter text-espresso uppercase whitespace-nowrap"
          >
            Saksham
          </motion.h1>
        </div>
        <div className="relative overflow-hidden border-t border-transparent mt-2">
          <motion.h1 
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-serif text-[12vw] md:text-[14vw] leading-[0.8] tracking-tighter text-espresso uppercase whitespace-nowrap lg:ml-24"
          >
            Pandey
          </motion.h1>
        </div>
      </div>

      {/* Activity Marquee Bottom */}
      <div className="hairline-t flex items-center bg-espresso text-alabaster overflow-hidden py-4">
        <motion.div
           animate={{ x: ["0%", "-50%"] }}
           transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
           className="whitespace-nowrap flex font-sans text-sm md:text-base tracking-widest uppercase font-bold"
        >
          {Array(4).fill(marqueeText).map((text, i) => (
            <span key={i} className="px-4">{text}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
