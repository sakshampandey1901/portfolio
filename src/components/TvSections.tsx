import { useState } from 'react';
import { ABOUT, CONTACT, EXPERIENCE, PROJECTS, type SectionId } from '../data/sections';
import CopyButton, { CopyIcon } from './CopyButton';

const HEADING = 'text-[19px] text-white sm:text-[22px]';
const EXTERNAL_LINK =
  'inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-1.5 text-[13px] text-white transition-colors hover:bg-white hover:text-black sm:text-[14px]';
const HEADING_FONT = { fontFamily: 'var(--font-heading)' };

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
    <div className="flex h-full flex-col gap-3">
      <div>
        <h2 className={HEADING} style={HEADING_FONT}>
          {ABOUT.name}
        </h2>
        <p className="text-[13px] text-white/60 sm:text-[14px]">
          {ABOUT.title} · {ABOUT.education}
        </p>
      </div>
      <p className="max-w-prose text-[14px] leading-relaxed sm:text-[15px]">{ABOUT.summary}</p>
      <ul className="flex flex-wrap gap-1.5">
        {ABOUT.focusAreas.map((area) => (
          <li
            key={area}
            className="rounded-full bg-white/10 px-2.5 py-0.5 text-[12px] text-white/80 sm:text-[13px]"
          >
            {area}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
        <CopyButton text={CONTACT.email} className={EXTERNAL_LINK}>
          {CONTACT.email}
          <CopyIcon />
        </CopyButton>
        <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className={EXTERNAL_LINK}>
          LinkedIn ↗
        </a>
      </div>
    </div>
  );
}

function Experience() {
  return (
    <ul className="flex flex-col gap-4">
      {EXPERIENCE.map(({ company, role, period, location, bullets }) => (
        <li key={company}>
          <h3 className="text-[15px] text-white sm:text-[16px]" style={HEADING_FONT}>
            {role} · {company}
          </h3>
          {period && (
            <p className="text-[12px] text-white/50 sm:text-[13px]">
              {period}
              {location && ` · ${location}`}
            </p>
          )}
          <ul className="mt-1 list-disc pl-4 text-[13px] leading-relaxed text-white/85 sm:text-[14px]">
            {bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

function Projects() {
  const [index, setIndex] = useState(0);
  const project = PROJECTS[index];
  const step = (direction: number) =>
    setIndex((current) => (current + direction + PROJECTS.length) % PROJECTS.length);

  return (
    <div className="flex h-full flex-col">
      <div>
        <h2 className={HEADING} style={HEADING_FONT}>
          {project.name}
        </h2>
        <p className="text-[13px] text-white/60 sm:text-[14px]">{project.tagline}</p>
        <ul className="mt-2 list-disc pl-4 text-[13px] leading-relaxed text-white/85 sm:text-[14px]">
          {project.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </div>
      <div className="mt-auto flex items-center gap-3 pt-3">
        <button type="button" onClick={() => step(-1)} aria-label="Previous project" className={EXTERNAL_LINK}>
          ←
        </button>
        <span className="text-[12px] text-white/50 tabular-nums sm:text-[13px]">
          {index + 1} / {PROJECTS.length}
        </span>
        <button type="button" onClick={() => step(1)} aria-label="Next project" className={EXTERNAL_LINK}>
          →
        </button>
      </div>
    </div>
  );
}

function Github() {
  return (
    <div className="flex h-full flex-col items-start gap-3">
      <h2 className={HEADING} style={HEADING_FONT}>
        GitHub
      </h2>
      <p className="max-w-prose text-[14px] leading-relaxed sm:text-[15px]">
        Source for the projects here — plus experiments that didn't make the cut — lives on
        GitHub.
      </p>
      <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className={EXTERNAL_LINK}>
        View GitHub Profile ↗
      </a>
    </div>
  );
}
