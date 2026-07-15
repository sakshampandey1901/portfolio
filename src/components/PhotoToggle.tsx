interface PhotoToggleProps {
  on: boolean;
  onChange: (on: boolean) => void;
  hidden: boolean;
}

/** Switch for showing Saksham's photo on the TV screen. */
export default function PhotoToggle({ on, onChange, hidden }: PhotoToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      inert={hidden}
      className={`fixed right-5 bottom-5 z-10 flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3 py-1.5 text-[12px] tracking-wide text-black uppercase backdrop-blur-sm transition-opacity duration-500 sm:right-8 sm:bottom-6 ${
        hidden ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      TV photo
      <span
        aria-hidden="true"
        className={`h-[18px] w-8 rounded-full p-[2px] transition-colors duration-300 ${
          on ? 'bg-black' : 'bg-black/20'
        }`}
      >
        <span
          className={`block h-[14px] w-[14px] rounded-full bg-white transition-transform duration-300 ${
            on ? 'translate-x-[14px]' : 'translate-x-0'
          }`}
        />
      </span>
    </button>
  );
}
