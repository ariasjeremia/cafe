import { useEffect, useState } from "react";
import { eur, MAX_PER_ORDER, type Product } from "../data/products";
import {
  BasketIcon,
  CheckIcon,
  ClockIcon,
  DropIcon,
  KettleIcon,
  LeafIcon,
  MinusIcon,
  PlusIcon,
  RoastMeter,
  Stars,
  ThermoIcon,
  XIcon,
} from "./Icons";

export default function ProductDetail({
  product,
  inCartQty,
  onClose,
  onAdd,
}: {
  product: Product | null;
  inCartQty: number;
  onClose: () => void;
  onAdd: (id: string, qty: number) => void;
}) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setQty(1);
    setAdded(false);
  }, [product?.id]);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [product, onClose]);

  if (!product) return null;

  const max = Math.min(product.stock, MAX_PER_ORDER);

  const handleAdd = () => {
    onAdd(product.id, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  const meta: [string, string][] = [
    ["Proceso", product.process],
    ["Variedad", product.varietal],
    ["Altitud", product.altitude],
    ["Finca", product.farm],
  ];

  const brewing = [
    { icon: <KettleIcon className="w-4 h-4" />, label: "Método", value: product.brewing.method },
    { icon: <DropIcon className="w-4 h-4" />, label: "Ratio", value: product.brewing.ratio },
    { icon: <ThermoIcon className="w-4 h-4" />, label: "Agua", value: product.brewing.temp },
    { icon: <ClockIcon className="w-4 h-4" />, label: "Tiempo", value: product.brewing.time },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Detalles de ${product.name}`}
    >
      <div className="absolute inset-0 animate-fade bg-espresso/85 backdrop-blur-sm" onClick={onClose} />

      <div className="relative flex max-h-[94dvh] w-full max-w-4xl animate-rise flex-col overflow-hidden rounded-t-xl border border-cocoa bg-bean shadow-[0_40px_90px_-30px_rgba(0,0,0,0.95)] sm:rounded-xl">
        <button
          onClick={onClose}
          aria-label="Cerrar detalle"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-cocoa bg-espresso/70 text-latte backdrop-blur-sm transition-colors hover:border-ember hover:text-ember"
        >
          <XIcon className="w-4 h-4" />
        </button>

        <div className="grid overflow-y-auto md:grid-cols-[2fr_3fr]">
          {/* Imagen */}
          <div className="relative bg-espresso">
            <img
              src={product.image}
              alt={`Bolsa de café ${product.name}`}
              className="h-56 w-full object-cover sm:h-72 md:h-full md:min-h-[560px]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent md:bg-gradient-to-r" />
            {product.tag && (
              <span className="absolute left-4 top-4 rounded-sm bg-ember px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-espresso">
                {product.tag}
              </span>
            )}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-espresso/70 px-3 py-1.5 backdrop-blur-sm">
              <LeafIcon className="w-4 h-4 text-leaf" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-foam">
                Cosecha 2025 · Comercio directo
              </span>
            </div>
          </div>

          {/* Información */}
          <div className="p-5 sm:p-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ember">
              {product.origin} — {product.region}
            </p>
            <h2 className="mt-2 pr-10 font-display text-2xl font-bold leading-tight text-crema sm:text-4xl">
              {product.name}
            </h2>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="flex items-center gap-1.5">
                <Stars rating={product.rating} />
                <span className="font-mono text-xs text-latte">
                  {product.rating} · {product.reviews} reseñas
                </span>
              </span>
              <RoastMeter level={product.roastLevel} label />
            </div>

            <p className="prose-warm mt-4 text-[15px] leading-relaxed text-latte">
              {product.description}
            </p>

            {/* Notas de cata */}
            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-latte">
              Notas de cata
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {product.notes.map((n) => (
                <li
                  key={n}
                  className="rounded-full border border-ember/40 bg-ember/10 px-3.5 py-1 text-sm text-ember"
                >
                  {n}
                </li>
              ))}
            </ul>

            {/* Ficha técnica */}
            <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-cocoa bg-cocoa/50">
              {meta.map(([k, v]) => (
                <div key={k} className="bg-roast/80 px-4 py-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-latte">{k}</p>
                  <p className="mt-0.5 text-sm font-medium text-crema">{v}</p>
                </div>
              ))}
              <div className="col-span-2 flex items-center justify-between bg-roast/80 px-4 py-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-latte">Puntaje SCA</p>
                <p className="font-display text-2xl font-bold text-ember">{product.sca}<span className="text-sm text-latte">/100</span></p>
              </div>
            </div>

            {/* Guía de preparación */}
            <div className="mt-5 rounded-lg border border-cocoa bg-roast/60 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-latte">
                Cómo lo preparamos en barra
              </p>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {brewing.map((b) => (
                  <div key={b.label} className="flex items-start gap-2.5">
                    <span className="mt-0.5 text-ember">{b.icon}</span>
                    <span>
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-latte">{b.label}</span>
                      <span className="text-sm font-medium text-crema">{b.value}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Compra */}
            <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-cocoa/70 pt-5">
              <div className="flex items-center rounded-md border border-cocoa">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  aria-label="Reducir cantidad"
                  className="flex h-11 w-11 items-center justify-center text-latte transition-colors hover:text-ember disabled:opacity-30 disabled:hover:text-latte"
                >
                  <MinusIcon />
                </button>
                <span className="w-8 text-center font-display text-lg font-bold tabular text-crema">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(max, q + 1))}
                  disabled={qty >= max}
                  aria-label="Aumentar cantidad"
                  className="flex h-11 w-11 items-center justify-center text-latte transition-colors hover:text-ember disabled:opacity-30 disabled:hover:text-latte"
                >
                  <PlusIcon />
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`flex min-w-[180px] flex-1 items-center justify-center gap-2.5 rounded-md py-3 text-sm font-bold transition-all active:scale-[0.98] ${
                  added
                    ? "bg-leaf text-espresso"
                    : "bg-ember text-espresso hover:bg-foam shadow-[0_12px_28px_-12px_rgba(227,155,75,0.8)]"
                }`}
              >
                {added ? (
                  <>
                    <CheckIcon className="w-4.5 h-4.5" /> Añadido a la cesta
                  </>
                ) : (
                  <>
                    <BasketIcon className="w-4.5 h-4.5" /> Añadir · {eur(product.price * qty)}
                  </>
                )}
              </button>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <p className="font-mono text-[11px] text-latte">
                Bolsa de {product.weight} g en grano
                {inCartQty > 0 && (
                  <span className="ml-2 text-ember">· {inCartQty} en tu cesta</span>
                )}
              </p>
              {product.stock <= 9 ? (
                <p className="font-mono text-[11px] uppercase tracking-wider text-clay">
                  Últimas {product.stock} bolsas del lote
                </p>
              ) : (
                <p className="font-mono text-[11px] uppercase tracking-wider text-leaf">
                  En stock — salida en 48 h
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="mt-4 font-mono text-[11px] uppercase tracking-wider text-latte transition-colors hover:text-ember sm:hidden"
            >
              ← Volver a la carta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
