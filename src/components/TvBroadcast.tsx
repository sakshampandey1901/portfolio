import { useEffect, useRef, useState } from 'react';
import { SECTIONS, type SectionId } from '../data/sections';
import SectionContent from './TvSections';

interface TvBroadcastProps {
  activeSection: SectionId | null;
  onSelectSection: (id: SectionId) => void;
  onExit: () => void;
  /** Adds the bezel frame used by the mobile full-screen fallback. */
  framed?: boolean;
}

/**
 * The picture the TV broadcasts in focus mode. It fills whatever surface the
 * stage gives it (the counter-scaled glass layer on desktop, a full-screen
 * frame on mobile), powers on with a CRT flicker, and flashes static when
 * changing sections — like switching channels.
 */
export default function TvBroadcast({
  activeSection,
  onSelectSection,
  onExit,
  framed = false,
}: TvBroadcastProps) {
  const open = activeSection !== null;
  // Keep the last section rendered so content doesn't vanish mid fade-out.
  const [section, setSection] = useState<SectionId>('about');
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeSection) setSection(activeSection);
  }, [activeSection]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    panel?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onExit();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      panel?.blur();
    };
  }, [open, onExit]);

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Saksham Pandey — portfolio"
      tabIndex={-1}
      inert={!open}
      className={`tv-scanlines relative flex h-full w-full flex-col overflow-hidden bg-[#101210] text-[#e8e6df] outline-none ${
        framed ? 'rounded-xl border-8 border-[#d6d2c8]' : 'rounded-2xl ring-1 ring-black/40'
      } ${
        open
          ? 'animate-[power-on_450ms_ease-out] motion-reduce:animate-none'
          : 'pointer-events-none opacity-0 transition-opacity duration-300 motion-reduce:transition-none'
      }`}
    >
      <header className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5 sm:px-5">
        <button
          type="button"
          onClick={onExit}
          aria-label="Exit TV view (Escape)"
          className="rounded-full px-2.5 py-1 text-[12px] tracking-wider whitespace-nowrap text-white/70 uppercase transition-colors hover:bg-white/10 hover:text-white sm:text-[13px]"
        >
          ← Exit
        </button>
        <nav aria-label="Portfolio sections" className="flex flex-wrap justify-end gap-1 sm:gap-2">
          {SECTIONS.map(({ id, tabLabel }) => (
            <button
              key={id}
              type="button"
              onClick={() => onSelectSection(id)}
              aria-current={id === section ? 'page' : undefined}
              className={`rounded-full px-2.5 py-1 text-[11px] tracking-wider uppercase transition-colors sm:text-[13px] ${
                id === section ? 'bg-white/15 text-white' : 'text-white/55 hover:text-white'
              }`}
            >
              {tabLabel}
            </button>
          ))}
        </nav>
      </header>

      <div key={section} className="relative flex-1 overflow-y-auto px-5 py-4 sm:px-6 sm:py-5">
        <div className="h-full animate-[fade-in_250ms_ease] motion-reduce:animate-none">
          <SectionContent id={section} />
        </div>
        <div
          aria-hidden="true"
          className="tv-static pointer-events-none absolute inset-0 opacity-0 animate-[static-flash_160ms_steps(3,end)] motion-reduce:hidden"
        />
      </div>
    </div>
  );
}
