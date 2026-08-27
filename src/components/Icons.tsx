type P = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const LogoMark = ({ className = "w-8 h-8" }: P) => (
  <svg viewBox="0 0 32 32" className={className} {...base} strokeWidth={1.6}>
    <ellipse cx="16" cy="19" rx="10.5" ry="11.5" transform="rotate(-18 16 19)" />
    <path d="M9.5 10.5c6.5 2.5 8.5 8 7.5 13.5" />
    <path d="M14 2.5c-2.2 1.6-2.6 3.6-1 5.3-1.6.2-2.4 1-2.6 2.4 3.2.9 7.2.5 9.4-1.7 2.4-2.5 1.3-5-2.6-6.6-1-.4-2.2-.3-3.2.6Z" fill="currentColor" stroke="none" opacity="0.9" />
  </svg>
);

export const BeanIcon = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 20 20" className={className} {...base} strokeWidth={1.5}>
    <ellipse cx="10" cy="10" rx="5.4" ry="7" transform="rotate(-24 10 10)" />
    <path d="M6.6 5.2c3.4 1.6 4.6 5.2 3.6 9" />
  </svg>
);

export const BasketIcon = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M4.5 8.5h15l-1.4 10.2a2 2 0 0 1-2 1.8H7.9a2 2 0 0 1-2-1.8L4.5 8.5Z" />
    <path d="M8.5 8.5V7a3.5 3.5 0 0 1 7 0v1.5" />
    <path d="M9.5 12.5v3.5M14.5 12.5v3.5" />
  </svg>
);

export const SearchIcon = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4.5 4.5" />
  </svg>
);

export const XIcon = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const PlusIcon = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M12 5.5v13M5.5 12h13" />
  </svg>
);

export const MinusIcon = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M5.5 12h13" />
  </svg>
);

export const TrashIcon = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M5 7h14M9.5 7V5.5a1.5 1.5 0 0 1 1.5-1.5h2a1.5 1.5 0 0 1 1.5 1.5V7" />
    <path d="M6.5 7l.8 12a1.8 1.8 0 0 0 1.8 1.7h5.8a1.8 1.8 0 0 0 1.8-1.7l.8-12" />
    <path d="M10 11v6M14 11v6" />
  </svg>
);

export const ArrowRightIcon = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M4.5 12h15M14 6.5l5.5 5.5-5.5 5.5" />
  </svg>
);

export const StarIcon = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" stroke="none">
    <path d="M12 2.8l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.7L12 2.8Z" />
  </svg>
);

export const CheckIcon = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={2.1}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const LeafIcon = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M19 5c-8 0-13 4-13 10 0 2.5 1.5 4 4 4 6 0 9-6 9-14Z" />
    <path d="M6.5 18.5C9.5 13 13 9.5 17 7.5" />
  </svg>
);

export const TruckIcon = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M2.5 6h11v10h-11zM13.5 9.5H18l3 3.5v3h-7.5" />
    <circle cx="6.5" cy="17.5" r="1.8" />
    <circle cx="17" cy="17.5" r="1.8" />
  </svg>
);

export const FlameIcon = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M12 21c3.9 0 6.5-2.6 6.5-6.2 0-4.4-4-6.6-5.2-10.3-2.6 2-3.4 4.6-2.6 7.4-.8-.4-1.5-1.2-1.8-2.3-1.6 1.3-2.4 3.1-2.4 5.2C6.5 18.4 8.1 21 12 21Z" />
  </svg>
);

export const DropIcon = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M12 3.5s6 6.8 6 11a6 6 0 0 1-12 0c0-4.2 6-11 6-11Z" />
    <path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5" />
  </svg>
);

export const ThermoIcon = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M10 4a2 2 0 1 1 4 0v9.3a4.5 4.5 0 1 1-4 0V4Z" />
    <path d="M12 9v7" />
    <circle cx="12" cy="17.5" r="1.6" fill="currentColor" stroke="none" />
  </svg>
);

export const ClockIcon = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2.2" />
  </svg>
);

export const KettleIcon = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M7 9.5h10l-1.2 9a2 2 0 0 1-2 1.7h-3.6a2 2 0 0 1-2-1.7L7 9.5Z" />
    <path d="M17 11.5l3.5-2-1 4.5" />
    <path d="M9.5 9.5C9.5 7 10.5 5.5 12 5.5s2.5 1.5 2.5 4" />
    <path d="M12 3v1.2" />
  </svg>
);

export const PinIcon = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M12 21s-6.5-5.6-6.5-10.4A6.5 6.5 0 0 1 12 4a6.5 6.5 0 0 1 6.5 6.6C18.5 15.4 12 21 12 21Z" />
    <circle cx="12" cy="10.5" r="2.2" />
  </svg>
);

export const ChevronDownIcon = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="m6 9.5 6 6 6-6" />
  </svg>
);

export const SpinnerIcon = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={`animate-spin ${className}`} {...base} strokeWidth={2.2}>
    <path d="M12 3.5a8.5 8.5 0 1 1-8 5.6" />
  </svg>
);

export const CupIcon = ({ className = "w-8 h-8" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M4.5 10h12v6a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4v-6Z" />
    <path d="M16.5 11h1.5a2.5 2.5 0 0 1 0 5h-1.7" />
    <path d="M8.5 6.5c0-1 .8-1.2.8-2M12 6.5c0-1 .8-1.2.8-2" opacity="0.7" />
  </svg>
);

/** Grano de tueste: relleno si active */
export const RoastBean = ({ active, className = "w-3.5 h-3.5" }: P & { active: boolean }) => (
  <svg viewBox="0 0 20 20" className={className} {...base} strokeWidth={1.5}>
    <ellipse
      cx="10"
      cy="10"
      rx="5.4"
      ry="7"
      transform="rotate(-24 10 10)"
      fill={active ? "currentColor" : "none"}
      opacity={active ? 0.9 : 1}
    />
    <path d="M6.6 5.2c3.4 1.6 4.6 5.2 3.6 9" stroke={active ? "var(--color-espresso)" : "currentColor"} />
  </svg>
);

export function RoastMeter({ level, label }: { level: number; label?: boolean }) {
  const names = ["", "Claro", "Medio claro", "Medio", "Oscuro", "Muy oscuro"];
  return (
    <span className="inline-flex items-center gap-2" title={`Tueste ${names[level].toLowerCase()}`}>
      <span className="inline-flex items-center gap-[3px] text-ember">
        {[1, 2, 3, 4, 5].map((i) => (
          <RoastBean key={i} active={i <= level} className="w-3 h-3" />
        ))}
      </span>
      {label && <span className="font-mono text-[11px] uppercase tracking-wide text-latte">Tueste {names[level].toLowerCase()}</span>}
    </span>
  );
}

export function Stars({ rating, className = "w-3.5 h-3.5" }: { rating: number; className?: string }) {
  return (
    <span className="inline-flex items-center gap-[2px] text-ember">
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon key={i} className={`${className} ${i <= Math.round(rating) ? "" : "opacity-25"}`} />
      ))}
    </span>
  );
}
