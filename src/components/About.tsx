"use client";

import { motion } from "framer-motion";

export default function About() {
  const dataNodes = [
    { label: "FOCUS", value: "APPLIED AI" },
    { label: "SYS_ACCURACY", value: "85%+" },
    { label: "HALLUCINATIONS", value: "0" },
    { label: "API_REDUCTION", value: "70%" },
    { label: "EDUCATION", value: "GSU_IT" },
    { label: "DOMAIN", value: "AGENTS" },
  ];

  return (
    <section className="hairline-b bg-alabaster">
      <div className="grid grid-cols-2 md:grid-cols-3">
        {dataNodes.map((node, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="aspect-square flex flex-col justify-between p-6 md:p-8 hairline-r hairline-b hover:bg-espresso hover:text-alabaster transition-colors duration-500 group"
          >
            <div className="flex justify-between items-start">
              <span className="font-sans text-[10px] tracking-widest uppercase opacity-50 group-hover:opacity-80">
                [ {i < 9 ? `0${i+1}` : i+1} ]
              </span>
              <div className="w-1.5 h-1.5 bg-terracotta rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            
            <div>
              <span className="block font-sans text-xs tracking-widest opacity-70 mb-2">
                {node.label}
              </span>
              <h3 className="font-serif text-3xl md:text-5xl text-blueprint group-hover:text-alabaster uppercase tracking-tighter">
                {node.value}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
