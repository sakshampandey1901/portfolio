"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function Projects() {
  const projects = [
    { title: "CITE", tag: "RAG / 85%+ ACCURACY", image: "/images/cite_project.png" },
    { title: "STOCK_FLOW", tag: "EMA / DRIFT_DETECTION", image: "/images/stockflow_project.png" },
    { title: "TKN_TRKR", tag: "LIVE_MONITORING", image: "/images/token_tracker.png" },
    { title: "CRS_AGENTS", tag: "MULTI_AGENT_SIM", image: null },
  ];

  return (
    <section id="projects" className="hairline-b bg-alabaster">
      <div className="p-6 md:p-12 hairline-b">
        <span className="font-sans text-xs uppercase tracking-widest text-espresso font-bold">
          [ DEPLOYMENTS ]
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {projects.map((project, i) => (
          <div key={i} className={`relative min-h-[60vh] flex flex-col justify-between p-6 hairline-b ${i % 2 === 0 ? 'lg:hairline-r' : ''} group overflow-hidden cursor-pointer`}>
            
            {/* Parallax Image Background (Masked) */}
            {project.image && (
              <div className="absolute inset-4 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 bg-espresso border border-espresso">
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill 
                  className="object-cover scale-110 group-hover:scale-100 transition-transform duration-[1.5s] ease-out grayscale mix-blend-screen opacity-50"
                  quality={100}
                />
              </div>
            )}

            {/* Content Foreground */}
            <div className="relative z-10 flex justify-between items-start pointer-events-none">
              <span className="font-sans text-xs tracking-widest uppercase bg-alabaster px-2 py-1 hairline group-hover:bg-terracotta group-hover:text-alabaster transition-colors">
                {project.tag}
              </span>
              <div className="bg-alabaster hairline p-2 group-hover:bg-espresso group-hover:text-alabaster transition-colors">
                <ArrowUpRight size={16} />
              </div>
            </div>

            <div className="relative z-10 pointer-events-none">
               <motion.h4 
                 initial={{ y: 20, opacity: 0 }}
                 whileInView={{ y: 0, opacity: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8 }}
                 className="font-serif text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter text-espresso mix-blend-exclusion group-hover:text-alabaster transition-colors duration-700 pointer-events-none"
               >
                 {project.title}
               </motion.h4>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
