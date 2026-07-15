import { useEffect, useRef, useState, type ReactNode } from 'react';

export function CopyIcon() {
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

interface CopyButtonProps {
  text: string;
  className?: string;
  children: ReactNode;
}

/** Copies `text` to the clipboard and briefly reports success or failure. */
export default function CopyButton({ text, className, children }: CopyButtonProps) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const resetTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const copy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => setStatus('copied'))
      .catch(() => setStatus('failed'));
    window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setStatus('idle'), 1600);
  };

  return (
    <button type="button" onClick={copy} className={className}>
      {status === 'idle' && children}
      {status === 'copied' && 'Copied ✓'}
      {status === 'failed' && 'Copy failed — select the text instead'}
    </button>
  );
}
