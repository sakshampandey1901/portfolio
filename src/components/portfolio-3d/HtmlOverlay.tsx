"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  GitFork,
  Link2,
  Mail,
  MoveUpRight,
} from "lucide-react";

/* ─── DATA ─── */

const services = [
  "RAG Systems",
  "Decision Engines",
  "Full-Stack Dev",
  "AI Infrastructure",
];

const processSteps = [
  {
    num: "01",
    title: "Research & Scope",
    description:
      "I start by understanding the problem space, mapping data flows, and defining measurable success criteria before writing a line of code.",
  },
  {
    num: "02",
    title: "Architect & Build",
    description:
      "I design modular systems — async pipelines, vector stores, and clean APIs — then build iteratively with traceable, auditable decisions.",
  },
  {
    num: "03",
    title: "Deploy & Harden",
    description:
      "Production-ready means drift detection, fallback strategies, and monitoring. I ship with confidence and keep systems reliable.",
  },
];

const skillCategories = [
  {
    title: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "SQL", "C++", "Java"],
  },
  {
    title: "Frameworks & Libraries",
    items: ["Next.js", "React", "FastAPI", "Node.js", "Express"],
  },
  {
    title: "AI & Data",
    items: [
      "RAG",
      "PyTorch",
      "TensorFlow",
      "Pandas",
      "Pinecone",
      "LangChain",
    ],
  },
  {
    title: "Infrastructure",
    items: ["Docker", "PostgreSQL", "MongoDB", "CI/CD", "Vercel"],
  },
];

const projects = [
  {
    title: "StockFlow",
    label: "Decision Engine",
    year: "2026",
    description:
      "Human-in-the-loop inventory recommendations with auditable policy versions, drift detection, and weekly SKU-level planning.",
    link: "#",
  },
  {
    title: "Cite",
    label: "RAG Assistant",
    year: "2026",
    description:
      "Source-grounded cognitive assistant with citation-first responses, 85%+ retrieval accuracy, and zero hallucinations.",
    link: "#",
  },
  {
    title: "AI Academic Advisor",
    label: "Rules + LLM",
    year: "2025",
    description:
      "Deterministic eligibility engine over catalog data with a Gemini rewrite layer — 100% traceable, no external API dependency.",
    link: "#",
  },
];

/* ─── ANIMATION VARIANTS ─── */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.1,
      ease: [0.25, 1, 0.5, 1] as const,
    },
  }),
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const childFade = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] as const },
  },
};

/* ─── COMPONENT ─── */

export default function HtmlOverlay() {
  return (
    <main id="portfolio-scroll-root" className="relative z-10">
      {/* ═══════════ HERO ═══════════ */}
      <section className="min-h-screen flex flex-col">
        {/* Nav */}
        <nav className="flex items-center justify-between px-6 py-6 md:px-10 md:py-8">
          <a
            href="#portfolio-scroll-root"
            className="font-display text-lg font-bold tracking-tight text-cream"
          >
            saksham<span className="text-lime">.</span>
          </a>
          <div className="hidden items-center gap-8 md:flex">
            {["About", "Projects", "Contact"].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                className="text-[13px] font-medium tracking-wide text-cream/60 transition-colors hover:text-cream"
              >
                {label}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-full bg-lime px-5 py-2 text-[13px] font-semibold text-void transition-transform hover:scale-105"
            >
              Let&apos;s Talk
            </a>
          </div>
        </nav>

        {/* Hero Service Pills */}
        <div className="flex flex-wrap items-center gap-3 px-6 pt-8 md:px-10">
          {services.map((s) => (
            <span
              key={s}
              className="rounded-full border border-cream/10 px-4 py-2 text-[12px] font-medium tracking-wide text-cream/50"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Giant Hero Heading */}
        <div className="flex flex-1 flex-col justify-end px-6 pb-10 md:px-10 md:pb-14">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-6 max-w-lg text-sm leading-7 text-cream/50 md:text-base md:leading-8"
          >
            I build reliable AI systems and full-stack products — from
            retrieval-augmented generation to decision engines that drive real
            business outcomes.
          </motion.p>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{
                duration: 1.1,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1,
              }}
              className="font-display text-[clamp(3.2rem,12vw,9.5rem)] font-bold leading-[0.88] tracking-[-0.04em] text-cream"
            >
              saksham
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{
                duration: 1.1,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.22,
              }}
              className="font-display text-[clamp(3.2rem,12vw,9.5rem)] font-bold leading-[0.88] tracking-[-0.04em] text-cream"
            >
              pandey<span className="text-lime">®</span>
            </motion.h1>
          </div>
        </div>

        {/* Marquee strip */}
        <div className="overflow-hidden border-t border-cream/8 py-4">
          <div
            className="flex whitespace-nowrap"
            style={{ animation: "marquee 20s linear infinite" }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className="mx-6 font-display text-sm font-bold uppercase tracking-[0.2em] text-cream/20"
              >
                RAG Systems &bull; Decision Engines &bull; Full-Stack Dev
                &bull; AI Infrastructure &bull;
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ ABOUT ═══════════ */}
      <section
        id="about"
        className="border-t border-cream/8 px-6 py-24 md:px-10 md:py-32"
      >
        <div className="grid gap-16 md:grid-cols-2 md:gap-20">
          {/* Left */}
          <div>
            <motion.span
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              className="mb-2 inline-block rounded-full bg-lime/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-lime"
            >
              About
            </motion.span>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="mt-4 font-display text-[clamp(2rem,5vw,3.8rem)] font-bold leading-[1.08] tracking-[-0.02em]"
            >
              AI systems engineer focused on building products that are
              reliable, auditable, and production-ready.
            </motion.h2>
          </div>

          {/* Right */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="flex flex-col justify-end gap-6"
          >
            <p className="text-base leading-8 text-cream/55">
              I study Information Technology at Georgia State University and
              focus on dependable software — traceable RAG, decision automation,
              async FastAPI systems, and interfaces that make complex workflows
              feel direct.
            </p>
            <p className="text-base leading-8 text-cream/55">
              From mobile apps to complex dashboards, I turn ideas into
              intuitive, high-performance experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ WORK PROCESS ═══════════ */}
      <section className="border-t border-cream/8 px-6 py-24 md:px-10 md:py-32">
        <motion.span
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="mb-2 inline-block rounded-full bg-lime/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-lime"
        >
          Process
        </motion.span>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="mt-4 max-w-2xl font-display text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.12] tracking-[-0.02em]"
        >
          How I approach every project — from research to production.
        </motion.h2>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.num}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="group rounded-2xl border border-cream/8 bg-carbon p-8 transition-all duration-500 hover:border-lime/30 hover:bg-graphite"
            >
              <span className="font-display text-4xl font-bold text-lime/30 transition-colors group-hover:text-lime/60">
                {step.num}
              </span>
              <h3 className="mt-6 font-display text-xl font-bold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-cream/45">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════ SKILLS / SERVICES ═══════════ */}
      <section className="border-t border-cream/8 px-6 py-24 md:px-10 md:py-32">
        <motion.span
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="mb-2 inline-block rounded-full bg-lime/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-lime"
        >
          Skills
        </motion.span>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="mt-4 max-w-2xl font-display text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.12] tracking-[-0.02em]"
        >
          Technologies and tools I work with every day.
        </motion.h2>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid gap-4 md:grid-cols-2"
        >
          {skillCategories.map((cat) => (
            <motion.div
              key={cat.title}
              variants={childFade}
              className="group rounded-2xl border border-cream/8 bg-carbon p-7 transition-all duration-500 hover:border-lime/25 hover:bg-graphite"
            >
              <h3 className="font-display text-lg font-bold tracking-tight text-cream/80 transition-colors group-hover:text-cream">
                {cat.title}
              </h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-cream/10 bg-void/50 px-3.5 py-1.5 text-[11px] font-medium tracking-wide text-cream/50 transition-colors group-hover:border-cream/15 group-hover:text-cream/65"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ═══════════ PROJECTS ═══════════ */}
      <section
        id="projects"
        className="border-t border-cream/8 px-6 py-24 md:px-10 md:py-32"
      >
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.span
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              className="mb-2 inline-block rounded-full bg-lime/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-lime"
            >
              Projects
            </motion.span>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="mt-4 font-display text-[clamp(2rem,5vw,3.8rem)] font-bold leading-[1.08] tracking-[-0.02em]"
            >
              Latest projects
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="max-w-sm text-sm leading-7 text-cream/45"
          >
            A curated portfolio demonstrating commitment to measurable
            outcomes and purposeful engineering.
          </motion.p>
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
              className="group flex min-h-[26rem] flex-col justify-between overflow-hidden rounded-2xl border border-cream/8 bg-carbon p-7 transition-all duration-500 hover:-translate-y-2 hover:border-lime/30 hover:bg-graphite"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-cream/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cream/50">
                    {project.label}
                  </span>
                  <span className="text-[10px] font-medium tracking-wider text-cream/25">
                    //{project.year}
                  </span>
                </div>
                <div className="grid size-9 place-items-center rounded-full border border-cream/10 transition-all duration-500 group-hover:border-lime/40 group-hover:bg-lime group-hover:text-void">
                  <MoveUpRight className="size-4" />
                </div>
              </div>

              <div>
                <h3 className="font-display text-3xl font-bold leading-none tracking-tight md:text-4xl">
                  {project.title}
                </h3>
                <p className="mt-5 text-sm leading-7 text-cream/40">
                  {project.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ═══════════ CONTACT / CTA ═══════════ */}
      <section
        id="contact"
        className="border-t border-cream/8 px-6 py-24 md:px-10 md:py-32"
      >
        <div className="grid gap-16 md:grid-cols-[1.2fr_1fr] md:items-end">
          {/* Left */}
          <div>
            <motion.span
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              className="mb-2 inline-block rounded-full bg-lime/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-lime"
            >
              Contact
            </motion.span>

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="mt-4 font-display text-[clamp(2.4rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.03em]"
            >
              Let&apos;s Talk
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              className="mt-6 max-w-md text-base leading-8 text-cream/45"
            >
              Have a project in mind? I&apos;m always open to discussing AI
              systems architecture, new builds, and full-time opportunities.
            </motion.p>

            <motion.a
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={3}
              href="mailto:pandeysaksham450@gmail.com"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-lime px-7 py-3.5 text-sm font-semibold text-void transition-transform hover:scale-105"
            >
              Get in Touch
              <ArrowUpRight className="size-4" />
            </motion.a>
          </div>

          {/* Right — socials */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            {[
              {
                label: "Email",
                href: "mailto:pandeysaksham450@gmail.com",
                icon: <Mail className="size-5" />,
              },
              {
                label: "GitHub",
                href: "https://github.com/sakshampandey1901",
                icon: <GitFork className="size-5" />,
              },
              {
                label: "LinkedIn",
                href: "https://linkedin.com/in/saksham-pandey-01515b286",
                icon: <Link2 className="size-5" />,
              },
            ].map((link) => (
              <motion.a
                key={link.label}
                variants={childFade}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-xl border border-cream/8 bg-carbon px-6 py-5 transition-all duration-400 hover:border-lime/25 hover:bg-graphite"
              >
                <div className="flex items-center gap-4">
                  <span className="text-cream/40 transition-colors group-hover:text-lime">
                    {link.icon}
                  </span>
                  <span className="text-sm font-medium tracking-wide">
                    {link.label}
                  </span>
                </div>
                <ArrowUpRight className="size-4 text-cream/25 transition-all group-hover:text-lime group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="border-t border-cream/8">
        {/* Footer marquee */}
        <div className="overflow-hidden border-b border-cream/8 py-6">
          <div
            className="flex whitespace-nowrap"
            style={{ animation: "marquee-reverse 18s linear infinite" }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="mx-4 font-display text-3xl font-bold tracking-tight text-cream/8 md:text-5xl"
              >
                saksham pandey &bull;
              </span>
            ))}
          </div>
        </div>

        {/* Footer bottom */}
        <div className="flex flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row md:px-10">
          <span className="text-[11px] tracking-wider text-cream/25">
            &copy; {new Date().getFullYear()} Saksham Pandey
          </span>
          <div className="flex gap-6">
            {["GitHub", "LinkedIn"].map((label) => (
              <a
                key={label}
                href={
                  label === "GitHub"
                    ? "https://github.com/sakshampandey1901"
                    : "https://linkedin.com/in/saksham-pandey-01515b286"
                }
                target="_blank"
                rel="noreferrer"
                className="text-[11px] tracking-wider text-cream/25 transition-colors hover:text-cream/60"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
