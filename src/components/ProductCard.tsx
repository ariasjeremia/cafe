import { useRef, useState } from "react";
import { eur, type Product } from "../data/products";
import {
  BasketIcon,
  CheckIcon,
  PlusIcon,
  RoastMeter,
  Stars,
} from "./Icons";

export default function ProductCard({
  product,
  onAdd,
  onDetail,
}: {
  product: Product;
  onAdd: (id: string) => void;
  onDetail: (id: string) => void;
}) {
  const [added, setAdded] = useState(false);
  const timer = useRef<number | null>(null);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAdd(product.id);
    setAdded(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article
      onClick={() => onDetail(product.id)}
      className="group relative cursor-pointer overflow-hidden rounded-lg border border-cocoa/70 bg-bean transition-all duration-300 hover:-translate-y-1.5 hover:border-ember/50 hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.85)]"
    >
      {/* Imagen */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={`Bolsa de café ${product.name}`}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/75 via-transparent to-espresso/10" />

        <div className="absolute left-3 top-3 flex flex-col items-start gap-2">
          {product.tag && (
            <span className="rounded-sm bg-ember px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-espresso">
              {product.tag}
            </span>
          )}
          {product.stock <= 9 && (
            <span className="rounded-sm bg-clay px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-crema">
              Quedan {product.stock}
            </span>
          )}
        </div>

        <button
          onClick={handleAdd}
          aria-label={`Añadir ${product.name} a la cesta`}
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 active:scale-90 sm:translate-y-1 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 ${
            added
              ? "border-leaf bg-leaf text-espresso sm:translate-y-0 sm:opacity-100"
              : "border-crema/30 bg-espresso/60 text-crema backdrop-blur-sm hover:border-ember hover:text-ember"
          }`}
        >
          {added ? <CheckIcon className="w-4.5 h-4.5" /> : <PlusIcon className="w-4.5 h-4.5" />}
        </button>

        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foam/90">
            {product.origin}
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-espresso/60 px-2 py-1 backdrop-blur-sm">
            <Stars rating={product.rating} className="w-3 h-3" />
            <span className="font-mono text-[10px] text-foam">{product.rating}</span>
          </span>
        </div>
      </div>

      {/* Cuerpo */}
      <div className="p-4 sm:p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-lg font-semibold leading-snug text-crema transition-colors group-hover:text-ember sm:text-xl">
            {product.name}
          </h3>
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-latte">
            SCA {product.sca}
          </span>
        </div>

        <p className="mt-1 text-sm text-latte">
          {product.region} · {product.process}
        </p>

        <ul className="mt-3 flex flex-wrap gap-1.5">
          {product.notes.map((n) => (
            <li
              key={n}
              className="rounded-full border border-cocoa px-2.5 py-0.5 text-[11px] text-latte transition-colors group-hover:border-husk group-hover:text-foam"
            >
              {n}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center justify-between border-t border-cocoa/60 pt-4">
          <RoastMeter level={product.roastLevel} />
          <p className="text-right">
            <span className="font-display text-xl font-bold text-crema">{eur(product.price)}</span>
            <span className="block font-mono text-[10px] uppercase tracking-wider text-latte">
              {product.weight} g
            </span>
          </p>
        </div>

        <button
          onClick={handleAdd}
          className={`mt-4 flex w-full items-center justify-center gap-2 rounded-md border py-2.5 text-sm font-semibold transition-all duration-300 active:scale-[0.98] ${
            added
              ? "border-leaf bg-leaf text-espresso"
              : "border-ember/60 text-ember hover:bg-ember hover:text-espresso"
          }`}
        >
          {added ? (
            <>
              <CheckIcon className="w-4 h-4" /> En la cesta
            </>
          ) : (
            <>
              <BasketIcon className="w-4 h-4" /> Añadir a la cesta
            </>
          )}
        </button>
      </div>
    </article>
  );
}
