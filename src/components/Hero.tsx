import { useEffect, useState } from 'react';
import useTypewriter from '../hooks/useTypewriter';

const EMAIL = 'hello@mainframe.co';

const TYPEWRITER_TEXT =
  'Glad you stopped in. Good taste tends to find us. Now, what are we building?';

const ACTION_LABELS = [
  'Pitch us an idea',
  'Come work here',
  'Send a brief hello',
  'See how we operate',
];

const PILL_BASE =
  'inline-flex items-center justify-center rounded-full border text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap transition-colors duration-200';

const HERO_TEXT_SIZE = 'text-[clamp(18px,4vw,26px)]';

function CopyIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <rect x="2" y="2" width="13" height="13" rx="2" />
    </svg>
  );
}

export default function Hero() {
  const { displayed, done } = useTypewriter(TYPEWRITER_TEXT);
  const [actionsVisible, setActionsVisible] = useState(false);

  // The pills fade in on a fixed 400ms timer, independent of the typewriter.
  useEffect(() => {
    const timeout = window.setTimeout(() => setActionsVisible(true), 400);
    return () => window.clearTimeout(timeout);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL).catch(() => {
      // Clipboard access can be denied; the email stays visible to copy manually.
    });
  };

  return (
    <section className="relative z-[1] flex h-screen flex-col justify-end overflow-hidden px-5 pb-12 sm:px-8 md:justify-center md:px-10 md:pb-0">
      <div className="relative z-10 max-w-xl">
        <p
          className={`${HERO_TEXT_SIZE} pointer-events-none mb-5 select-none leading-[1.3] font-normal text-black blur-[4px] sm:mb-6`}
        >
          Hey there, meet A.R.I.A,
          <br />
          Mainframe's Adaptive Response Interface Agent
        </p>

        <p
          className={`${HERO_TEXT_SIZE} mb-5 min-h-[54px] leading-[1.35] font-normal text-black sm:mb-6`}
        >
          {displayed}
          {!done && (
            <span className="ml-[2px] inline-block h-[1.1em] w-[2px] animate-[blink_1s_step-end_infinite] bg-black align-middle" />
          )}
        </p>

        <div
          className={`flex flex-wrap gap-y-1 transition-[opacity,transform] duration-[400ms] ease-[ease] ${
            actionsVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
          }`}
        >
          {ACTION_LABELS.map((label) => (
            <button
              key={label}
              type="button"
              className={`${PILL_BASE} border-black/10 bg-white text-black hover:bg-black hover:text-white`}
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            onClick={copyEmail}
            className={`${PILL_BASE} gap-2 border-white bg-transparent text-white hover:bg-white hover:text-black sm:gap-3`}
          >
            <span>
              Reach us: <span className="underline underline-offset-1">{EMAIL}</span>
            </span>
            <CopyIcon />
          </button>
        </div>
      </div>
    </section>
  );
}
