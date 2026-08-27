import { BeanIcon } from "./Icons";

const ITEMS = [
  "Lote Nº 48 — Huila Honey ya en carta",
  "Tostamos cada lunes, enviamos el martes",
  "Envío gratis a partir de 30 €",
  "100 % arábica de cosecha reciente",
  "Molturamos gratis si nos lo pides",
  "Pequeños lotes de 12 kg",
];

export default function Ticker() {
  const row = (key: string, hidden?: boolean) => (
    <div
      key={key}
      aria-hidden={hidden}
      className="flex shrink-0 items-center"
    >
      {ITEMS.map((t, i) => (
        <span key={i} className="flex items-center gap-6 pr-6 whitespace-nowrap">
          <span>{t}</span>
          <BeanIcon className="w-3 h-3 opacity-70" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="ticker-track bg-ember text-espresso overflow-hidden">
      <div className="ticker-inner flex w-max animate-marquee py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em]">
        {row("a")}
        {row("b", true)}
      </div>
    </div>
  );
}
