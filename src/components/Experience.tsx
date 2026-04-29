"use client";

import { motion } from "framer-motion";

export default function Experience() {
  const experiences = [
    { company: "REPPED SPORTS", role: "FULL_STACK", timeline: "2024" },
    { company: "GEORGIA STATE UNIV", role: "RESEARCH_ASSISTANT", timeline: "2023" },
    { company: "CODEPATH", role: "SCHOLAR", timeline: "2023" },
    { company: "ALUMNI ASSOC", role: "PROGRAM_LEAD", timeline: "2022" },
  ];

  return (
    <section className="hairline-b bg-alabaster">
      <div className="p-6 md:p-12 hairline-b bg-espresso text-alabaster">
        <span className="font-sans text-xs uppercase tracking-widest font-bold">
          [ LOG_ENTRIES ]
        </span>
      </div>

      <div className="flex flex-col">
        {experiences.map((exp, i) => (
          <motion.div
             key={i}
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5, delay: i * 0.1 }}
             className="grid grid-cols-1 md:grid-cols-12 p-6 md:p-12 hairline-b group hover:bg-blueprint hover:text-alabaster transition-colors duration-300"
          >
            <div className="md:col-span-3 font-sans text-sm tracking-widest uppercase opacity-70 mb-4 md:mb-0">
               {exp.timeline}
            </div>
            <div className="md:col-span-6 font-serif text-3xl md:text-4xl uppercase tracking-tight text-espresso group-hover:text-alabaster transition-colors">
               {exp.company}
            </div>
            <div className="md:col-span-3 font-sans text-xs tracking-widest uppercase text-right opacity-90 hidden md:block mt-auto pb-2">
               {exp.role}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
