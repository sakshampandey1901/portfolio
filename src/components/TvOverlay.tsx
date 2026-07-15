import { useEffect, useRef, useState } from 'react';
import { SECTIONS, type SectionId } from '../data/sections';
import { focusPanelRect } from '../lib/tvGeometry';
import useViewportSize from '../hooks/useViewportSize';
import SectionContent from './TvSections';

interface TvOverlayProps {
  activeSection: SectionId | null;
  onSelectSection: (id: SectionId) => void;
  onExit: () => void;
}

/**
 * The content panel that sits on the TV glass in focus mode. On desktop it is
 * positioned exactly where the zoom lands the glass; below the breakpoint it
 * falls back to a full-screen TV-framed panel.
 */
export default function TvOverlay({ activeSection, onSelectSection, onExit }: TvOverlayProps) {
  const open = activeSection !== null;
  // Keep the last section rendered so content doesn't vanish mid fade-out.
  const [section, setSection] = useState<SectionId>('about');
  const panelRef = useRef<HTMLDivElement>(null);
  const { width, height } = useViewportSize();

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

  const rect = focusPanelRect(width, height);

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Saksham Pandey — portfolio"
      tabIndex={-1}
      style={rect ?? undefined}
      className={`tv-scanlines fixed z-20 flex flex-col overflow-hidden bg-[#101210] text-[#e8e6df] shadow-2xl outline-none transition-opacity motion-reduce:transition-none ${
        rect
          ? 'rounded-2xl ring-1 ring-black/40'
          : 'inset-x-3 inset-y-12 rounded-xl border-8 border-[#d6d2c8]'
      } ${
        open
          ? 'opacity-100 delay-300 duration-500'
          : 'pointer-events-none opacity-0 delay-0 duration-300'
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

      <div
        key={section}
        className="flex-1 overflow-y-auto px-5 py-4 animate-[fade-in_250ms_ease] motion-reduce:animate-none sm:px-6 sm:py-5"
      >
        <SectionContent id={section} />
      </div>
    </div>
  );
}
