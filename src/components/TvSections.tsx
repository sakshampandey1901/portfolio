import { useState } from 'react';
import { ABOUT, CONTACT, EXPERIENCE, PROJECTS, type SectionId } from '../data/sections';
import CopyButton, { CopyIcon } from './CopyButton';

// Eric Cole design tokens scaled for the TV viewport
const EYEBROW = 'text-[9px] tracking-[0.28em] uppercase text-[#9e9e9e] font-medium';
const DISPLAY = 'text-[22px] sm:text-[26px] font-normal leading-none tracking-[-0.02em] uppercase text-[#242424]';
const BODY = 'text-[12px] sm:text-[13px] leading-relaxed text-[#242424]';
const MUTED = 'text-[10px] sm:text-[11px] text-[#9e9e9e] uppercase tracking-[0.03em]';
const HR = 'border-[#e0e0e0]';
const LINK =
  'inline-flex items-center gap-1.5 rounded-full border border-[#e0e0e0] px-3 py-1 text-[10px] sm:text-[11px] uppercase tracking-[0.05em] text-[#242424] transition-colors hover:bg-[#242424] hover:text-white hover:border-[#242424]';
const NUM = 'text-[9px] tabular-nums text-[#9e9e9e] font-medium shrink-0 mt-[3px]';
// Entrance animation: elements fall 30 px into place while fading in (see @keyframes appear in index.css)
const APPEAR = 'animate-[appear_500ms_ease-out_both]';

function SectionEyebrow({ label }: { label: string }) {
  return <p className={`${EYEBROW} mb-2`}>{label}</p>;
}

export default function SectionContent({ id }: { id: SectionId }) {
  switch (id) {
    case 'about':
      return <About />;
    case 'experience':
      return <Experience />;
    case 'projects':
      return <Projects />;
    case 'github':
      return <Github />;
  }
}

function About() {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className={APPEAR}>
        <SectionEyebrow label="— { HELLO WORLD }" />
        <h2 className={DISPLAY}>{ABOUT.name}</h2>
        <p className={`${MUTED} mt-1`}>
          {ABOUT.title} · {ABOUT.education}
        </p>
      </div>

      <hr className={`${HR} ${APPEAR}`} style={{ animationDelay: '60ms' }} />

      <p className={`${BODY} ${APPEAR}`} style={{ animationDelay: '120ms' }}>
        {ABOUT.summary}
      </p>

      <ul className={`flex flex-wrap gap-1.5 ${APPEAR}`} style={{ animationDelay: '180ms' }}>
        {ABOUT.focusAreas.map((area) => (
          <li
            key={area}
            className="rounded-full border border-[#e0e0e0] px-2.5 py-0.5 text-[9px] sm:text-[10px] uppercase tracking-[0.04em] text-[#242424]"
          >
            {area}
          </li>
        ))}
      </ul>

      <div
        className={`mt-auto flex flex-wrap gap-2 ${APPEAR}`}
        style={{ animationDelay: '240ms' }}
      >
        <CopyButton text={CONTACT.email} className={LINK}>
          {CONTACT.email} <CopyIcon />
        </CopyButton>
        <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className={LINK}>
          LinkedIn ↗
        </a>
      </div>
    </div>
  );
}

function Experience() {
  return (
    <div className="flex flex-col gap-4">
      <div className={APPEAR}>
        <SectionEyebrow label="Experience" />
        <h2 className={DISPLAY}>What I've built</h2>
      </div>

      <ul className="flex flex-col">
        {EXPERIENCE.map(({ company, role, period, location, bullets }, i) => (
          <li key={company} className={APPEAR} style={{ animationDelay: `${(i + 1) * 60}ms` }}>
            <div className="flex gap-3">
              <span className={NUM}>{String(i + 1).padStart(3, '0')}</span>
              <div className="flex-1 pb-3">
                <h3 className="text-[12px] sm:text-[13px] font-medium uppercase tracking-[0.02em] text-[#242424]">
                  {role} · {company}
                </h3>
                {period && (
                  <p className={`${MUTED} mt-0.5`}>
                    {period}
                    {location ? ` · ${location}` : ''}
                  </p>
                )}
                <ul className="mt-1.5 flex flex-col gap-0.5">
                  {bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-[10px] sm:text-[11px] text-[#9e9e9e]">
                      <span className="shrink-0 select-none">—</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {i < EXPERIENCE.length - 1 && <hr className={HR} />}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Projects() {
  const [index, setIndex] = useState(0);
  const project = PROJECTS[index];
  const step = (dir: number) =>
    setIndex((c) => (c + dir + PROJECTS.length) % PROJECTS.length);

  return (
    <div className="flex h-full flex-col gap-3">
      <div className={APPEAR}>
        <SectionEyebrow label="Selected Works" />
      </div>

      <ul className={`flex flex-col gap-2 ${APPEAR}`} style={{ animationDelay: '60ms' }}>
        {PROJECTS.map(({ name, tagline }, i) => (
          <li key={name}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className={`w-full text-left flex gap-3 transition-opacity ${
                i === index ? 'opacity-100' : 'opacity-40 hover:opacity-70'
              }`}
            >
              <span className={NUM}>{String(i + 1).padStart(3, '0')}</span>
              <div>
                <p
                  className={`text-[12px] sm:text-[13px] font-medium uppercase tracking-[0.02em] text-[#242424] ${
                    i === index ? 'underline underline-offset-2' : ''
                  }`}
                >
                  {name}
                </p>
                <p className={MUTED}>{tagline}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <hr className={`${HR} ${APPEAR}`} style={{ animationDelay: '120ms' }} />

      {/* key re-mounts the detail so the fade-in plays when the active project changes */}
      <div key={project.name} className="flex-1 animate-[fade-in_200ms_ease]">
        <h3 className="text-[13px] sm:text-[14px] font-medium uppercase tracking-[0.01em] text-[#242424] mb-1">
          {project.name}
        </h3>
        <p className={`${MUTED} mb-2`}>{project.tagline}</p>
        <ul className="flex flex-col gap-1">
          {project.bullets.map((b) => (
            <li key={b} className="flex gap-2 text-[10px] sm:text-[11px] text-[#9e9e9e]">
              <span className="shrink-0 select-none">—</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`mt-auto flex items-center gap-3 ${APPEAR}`}
        style={{ animationDelay: '180ms' }}
      >
        <button type="button" onClick={() => step(-1)} aria-label="Previous project" className={LINK}>
          ←
        </button>
        <span className="text-[10px] tabular-nums text-[#9e9e9e]">
          {index + 1} / {PROJECTS.length}
        </span>
        <button type="button" onClick={() => step(1)} aria-label="Next project" className={LINK}>
          →
        </button>
      </div>
    </div>
  );
}

function Github() {
  return (
    <div className={`flex h-full flex-col gap-4 ${APPEAR}`}>
      <div>
        <SectionEyebrow label="Contact" />
        <h2 className={DISPLAY}>Get in touch</h2>
      </div>

      <hr className={HR} />

      <p className={BODY}>
        Source for these projects — plus experiments that didn't make the cut — lives on GitHub.
      </p>

      <div className="mt-auto flex flex-col gap-2">
        <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className={LINK}>
          View GitHub ↗
        </a>
        <CopyButton text={CONTACT.email} className={LINK}>
          {CONTACT.email} <CopyIcon />
        </CopyButton>
      </div>
    </div>
  );
}
