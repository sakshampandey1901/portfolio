"use client";

import { motion } from "framer-motion";

export default function Philosophy() {
  return (
    <section className="hairline-b flex flex-col md:flex-row relative bg-alabaster min-h-[50vh]">
      
      {/* Dynamic Geometric Activity Box */}
      <div className="w-full md:w-[30vw] hairline-r hairline-b md:hairline-b-0 p-8 flex items-center justify-center bg-espresso text-alabaster overflow-hidden relative">
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(#F7F5F0_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 border-2 border-alabaster rounded-full flex items-center justify-center"
        >
           <div className="w-full h-px bg-alabaster absolute"></div>
           <div className="h-full w-px bg-alabaster absolute"></div>
        </motion.div>
      </div>

      {/* Brutalist Statement */}
      <div className="w-full md:w-[70vw] p-8 md:p-16 flex flex-col justify-center">
        <span className="font-sans text-xs tracking-widest uppercase mb-12 text-terracotta border-b border-terracotta inline-block max-w-[max-content] pb-2">
          Core Directive
        </span>
        
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true, margin: "-10%" }}
           transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl text-espresso tracking-tight leading-[1.1] uppercase">
            AI should assist <br/> decision-making, <br/> not <span className="italic text-terracotta">replace</span> it blindly.
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
