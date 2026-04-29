"use client";

import { GitFork, Link, Mail, MoveUpRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "StockFlow",
    label: "Decision Engine",
    description:
      "Human-in-the-loop inventory recommendations with auditable policy versions, drift detection, and weekly SKU-level planning.",
    link: "#",
  },
  {
    title: "Cite",
    label: "RAG Assistant",
    description:
      "Source-grounded cognitive assistant with citation-first responses, retrieval evaluation, and production API infrastructure.",
    link: "#",
  },
  {
    title: "AI Academic Advisor",
    label: "Rules + LLM",
    description:
      "Deterministic eligibility checks over catalog data with a presentation-only Gemini rewrite layer for clear student guidance.",
    link: "#",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function HtmlOverlay() {
  return (
    <main id="portfolio-scroll-root" className="relative z-10 text-espresso">
      {/* ─── HERO ─── */}
      <section className="min-h-screen px-6 py-8 md:px-14 md:py-10 flex flex-col justify-between">
        <nav className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.36em]">
          <a href="#portfolio-scroll-root" aria-label="Back to top" className="hover:text-terracotta transition-colors">
            SP_2026
          </a>
          <div className="hidden gap-8 md:flex">
            {["About", "Projects", "Contact"].map((label) => (
              <a
                key={label}
                className="group flex items-center gap-1.5 transition-colors hover:text-terracotta"
                href={`#${label.toLowerCase()}`}
              >
                {label}
                <ArrowUpRight
                  size={12}
                  className="opacity-0 -translate-y-0.5 transition-all group-hover:opacity-100 group-hover:translate-y-0"
                />
              </a>
            ))}
          </div>
        </nav>

        <div className="max-w-3xl pb-[16vh]">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="mb-5 text-[11px] font-semibold uppercase tracking-[0.4em] text-espresso/50"
          >
            AI Systems Engineer &mdash; Full-Stack Developer
          </motion.p>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="font-serif text-[clamp(4rem,14vw,11rem)] leading-[0.82] tracking-[-0.06em]"
            >
              Saksham
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
              className="font-serif text-[clamp(4rem,14vw,11rem)] leading-[0.82] tracking-[-0.06em] md:ml-16"
            >
              Pandey
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-10 max-w-xl text-base leading-7 text-espresso/60 md:text-lg md:leading-8"
          >
            I build reliable AI products &mdash; from retrieval-augmented generation
            to decision engines and production web systems.
          </motion.p>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="h-px bg-espresso/15 origin-left"
        />
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="min-h-screen px-6 py-28 md:px-14 flex items-center">
        <div className="max-w-xl">
          <motion.span
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="mb-6 inline-block text-[11px] font-bold uppercase tracking-[0.4em] text-terracotta"
          >
            About
          </motion.span>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="font-serif text-[clamp(2.4rem,6vw,5.5rem)] leading-[1.04] tracking-[-0.04em]"
          >
            Systems-minded developer with AI depth.
          </motion.h2>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="mt-8 space-y-5 text-base leading-7 text-espresso/65 md:text-lg md:leading-8"
          >
            <p>
              I study Information Technology at Georgia State University and
              focus on dependable software: traceable RAG, decision automation,
              async FastAPI systems, and interfaces that make complex workflows
              feel direct.
            </p>
            <p>
              My work is shaped around measurable behavior, clear failure modes,
              and maintainable interfaces.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
            className="mt-12 flex flex-wrap gap-2"
          >
            {[
              "Python", "TypeScript", "React", "Next.js", "FastAPI",
              "Docker", "PostgreSQL", "PyTorch", "RAG", "Pinecone",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-espresso/15 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-espresso/60"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── PROJECTS ─── */}
      <section id="projects" className="min-h-screen px-6 py-28 md:px-14">
        <div className="mb-16 max-w-3xl">
          <motion.span
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="mb-6 inline-block text-[11px] font-bold uppercase tracking-[0.4em] text-terracotta"
          >
            Projects
          </motion.span>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="font-serif text-[clamp(3rem,8vw,7rem)] leading-none tracking-[-0.06em]"
          >
            Selected builds.
          </motion.h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.link}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="group flex min-h-[24rem] flex-col justify-between border border-espresso/12 bg-alabaster/50 p-7 backdrop-blur-lg transition-all duration-500 hover:-translate-y-1.5 hover:border-espresso/40 hover:shadow-[0_16px_48px_-12px_rgba(26,22,20,0.12)]"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-espresso/45">
                  {project.label}
                </span>
                <MoveUpRight className="size-4 text-espresso/30 transition-all duration-500 group-hover:text-terracotta group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>

              <div>
                <h3 className="font-serif text-4xl leading-none tracking-[-0.04em] md:text-5xl">
                  {project.title}
                </h3>
                <p className="mt-5 text-sm leading-6 text-espresso/55">
                  {project.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="min-h-screen px-6 py-28 md:px-14 flex items-end">
        <div className="w-full border-t border-espresso/15 pt-12">
          <motion.span
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="mb-6 inline-block text-[11px] font-bold uppercase tracking-[0.4em] text-terracotta"
          >
            Contact
          </motion.span>

          <div className="grid gap-12 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={1}
                className="font-serif text-[clamp(3rem,9vw,8rem)] leading-none tracking-[-0.06em]"
              >
                Let&apos;s build.
              </motion.h2>

              <motion.a
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={2}
                className="mt-8 inline-flex items-center gap-3 text-lg font-medium underline decoration-espresso/20 underline-offset-8 transition-colors hover:text-terracotta hover:decoration-terracotta/40"
                href="mailto:pandeysaksham450@gmail.com"
              >
                pandeysaksham450@gmail.com
                <Mail className="size-5" aria-hidden="true" />
              </motion.a>
            </div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={3}
              className="flex gap-3"
            >
              <a
                className="grid size-12 place-items-center border border-espresso/15 bg-alabaster/60 transition-all duration-300 hover:bg-espresso hover:text-alabaster"
                href="https://github.com/sakshampandey1901"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <GitFork className="size-5" />
              </a>
              <a
                className="grid size-12 place-items-center border border-espresso/15 bg-alabaster/60 transition-all duration-300 hover:bg-espresso hover:text-alabaster"
                href="https://linkedin.com/in/saksham-pandey-01515b286"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <Link className="size-5" />
              </a>
            </motion.div>
          </div>

          <div className="mt-28 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-espresso/30">
            <span>&copy; {new Date().getFullYear()} Saksham Pandey</span>
            <span>Systems Engineering</span>
          </div>
        </div>
      </section>
    </main>
  );
}
