"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Contact() {
  const links = [
    { label: "Email", target: "mailto:pandeysaksham450@gmail.com" },
    { label: "LinkedIn", target: "https://linkedin.com/in/saksham-pandey-01515b286" },
    { label: "GitHub", target: "https://github.com/sakshampandey1901" },
  ];

  return (
    <section className="p-6 md:p-12 min-h-[30vh] flex flex-col justify-end">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h3 className="font-serif text-3xl mb-6 text-espresso">Let&apos;s Connect</h3>
          <p className="font-sans text-base text-espresso/70 max-w-sm leading-relaxed mb-8">
            I am always open to discussing AI systems architecture, new projects, and full-time opportunities.
          </p>
        </div>
        <div className="flex flex-col gap-4 items-start md:items-end w-full">
          {links.map((lnk, i) => (
            <motion.a
              key={i}
              href={lnk.target}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.1 }}
              className="group flex justify-between tracking-wide font-sans text-sm uppercase items-center py-4 px-6 hairline hover:bg-espresso hover:text-alabaster transition-colors duration-500 w-full max-w-xs"
            >
              <span>{lnk.label}</span>
              <ArrowUpRight size={16} className="opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.a>
          ))}
        </div>
      </div>
      
      <div className="mt-24 pt-6 hairline-t flex justify-between font-sans text-xs uppercase tracking-widest opacity-50">
        <span>© {new Date().getFullYear()} Saksham Pandey</span>
        <span>Systems Engineering</span>
      </div>
    </section>
  );
}
