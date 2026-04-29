"use client";

import { Github, Linkedin, Mail, MoveUpRight } from "lucide-react";

const projects = [
  {
    title: "StockFlow",
    label: "Decision Engine",
    description:
      "Human-in-the-loop inventory recommendations with auditable policy versions, drift detection, and weekly SKU-level planning.",
  },
  {
    title: "Cite",
    label: "RAG Assistant",
    description:
      "Source-grounded cognitive assistant with citation-first responses, retrieval evaluation, and production API infrastructure.",
  },
  {
    title: "AI Academic Advisor",
    label: "Rules + LLM",
    description:
      "Deterministic eligibility checks over catalog data with a presentation-only Gemini rewrite layer for clear student guidance.",
  },
];

export default function HtmlOverlay() {
  return (
    <main id="portfolio-scroll-root" className="relative z-10 text-espresso">
      <section id="hero" className="min-h-screen px-6 py-7 md:px-12 md:py-10 flex flex-col justify-between">
        <nav className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.34em]">
          <a href="#hero" aria-label="Back to top">
            SP_2026
          </a>
          <div className="hidden gap-7 md:flex">
            <a className="transition-colors hover:text-terracotta" href="#about">
              About
            </a>
            <a className="transition-colors hover:text-terracotta" href="#projects">
              Projects
            </a>
            <a className="transition-colors hover:text-terracotta" href="#contact">
              Contact
            </a>
          </div>
        </nav>

        <div className="max-w-6xl pb-[14vh]">
          <p className="mb-5 max-w-xl text-sm font-semibold uppercase tracking-[0.32em] text-espresso/60">
            AI systems engineer / full-stack developer
          </p>
          <h1 className="font-serif text-[clamp(4.5rem,16vw,13rem)] leading-[0.78] tracking-[-0.08em]">
            Saksham
            <br />
            Pandey
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-espresso/70 md:text-xl">
            I build reliable AI products across RAG, decision engines, and production web systems.
          </p>
        </div>
      </section>

      <section id="about" className="min-h-screen px-6 py-24 md:px-12 flex items-center">
        <div className="max-w-xl border-l border-espresso/30 pl-6 md:pl-10">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.38em] text-terracotta">About</p>
          <h2 className="font-serif text-[clamp(2.6rem,7vw,6rem)] leading-none tracking-[-0.06em]">
            Systems-minded developer with AI depth.
          </h2>
          <p className="mt-8 text-lg leading-8 text-espresso/72">
            I study Information Technology at Georgia State University and focus on dependable software:
            traceable RAG, decision automation, async FastAPI systems, and interfaces that make complex
            workflows feel direct.
          </p>
        </div>
      </section>

      <section id="projects" className="min-h-screen px-6 py-24 md:px-12">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.38em] text-terracotta">Projects</p>
            <h2 className="font-serif text-[clamp(3rem,9vw,8rem)] leading-none tracking-[-0.07em]">
              Selected builds.
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-espresso/65">
            Each project is shaped around measurable behavior, clear failure modes, and maintainable interfaces.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group min-h-[22rem] border border-espresso/20 bg-alabaster/58 p-6 backdrop-blur-md transition duration-500 hover:-translate-y-2 hover:border-espresso/60 hover:bg-alabaster/78"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-bold uppercase tracking-[0.28em] text-espresso/55">
                  {project.label}
                </span>
                <MoveUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
              <h3 className="mt-16 font-serif text-5xl leading-none tracking-[-0.06em]">{project.title}</h3>
              <p className="mt-7 text-sm leading-7 text-espresso/68">{project.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="min-h-screen px-6 py-24 md:px-12 flex items-end">
        <div className="w-full border-t border-espresso/25 pt-10">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.38em] text-terracotta">Contact</p>
          <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <h2 className="font-serif text-[clamp(3.4rem,10vw,9rem)] leading-none tracking-[-0.08em]">
                Let&apos;s build.
              </h2>
              <a
                className="mt-8 inline-flex items-center gap-3 text-lg font-semibold underline decoration-espresso/30 underline-offset-8 transition-colors hover:text-terracotta"
                href="mailto:pandeysaksham450@gmail.com"
              >
                pandeysaksham450@gmail.com
                <Mail className="size-5" aria-hidden="true" />
              </a>
            </div>

            <div className="flex gap-3">
              <a
                className="grid size-12 place-items-center border border-espresso/25 bg-alabaster/60 transition hover:bg-espresso hover:text-alabaster"
                href="https://github.com/sakshampandey1901"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <Github className="size-5" />
              </a>
              <a
                className="grid size-12 place-items-center border border-espresso/25 bg-alabaster/60 transition hover:bg-espresso hover:text-alabaster"
                href="https://linkedin.com/in/saksham-pandey-01515b286"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
