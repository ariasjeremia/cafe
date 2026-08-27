import { useMemo, useState } from "react";
import {
  CATEGORIES,
  PRODUCTS,
  normalize,
  type CategoryId,
} from "../data/products";
import { BeanIcon, ChevronDownIcon, SearchIcon, XIcon } from "./Icons";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

type Sort = "destacado" | "precio-asc" | "precio-desc" | "valoracion";

const SORTS: { id: Sort; label: string }[] = [
  { id: "destacado", label: "Destacados" },
  { id: "precio-asc", label: "Precio: menor a mayor" },
  { id: "precio-desc", label: "Precio: mayor a menor" },
  { id: "valoracion", label: "Mejor valorados" },
];

export default function Shop({
  onAdd,
  onDetail,
}: {
  onAdd: (id: string) => void;
  onDetail: (id: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<CategoryId | "todo">("todo");
  const [sort, setSort] = useState<Sort>("destacado");

  const counts = useMemo(() => {
    const c: Record<string, number> = { todo: PRODUCTS.length };
    for (const p of PRODUCTS) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, []);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    let list = PRODUCTS.filter((p) => {
      const inCat = cat === "todo" || p.category === cat;
      if (!inCat) return false;
      if (!q) return true;
      const haystack = normalize(
        [p.name, p.origin, p.region, p.farm, p.process, p.varietal, ...p.notes].join(" ")
      );
      return haystack.includes(q);
    });
    switch (sort) {
      case "precio-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "precio-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "valoracion":
        list = [...list].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
        break;
    }
    return list;
  }, [query, cat, sort]);

  const hasFilters = query.trim() !== "" || cat !== "todo";

  return (
    <section id="carta" className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-8 sm:px-6">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4 border-t border-cocoa/70 pt-12">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember">
              02 — La carta
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-crema sm:text-5xl">
              Seis cafés. Cero relleno.
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-latte">
            {filtered.length} {filtered.length === 1 ? "café" : "cafés"} en carta
          </p>
        </div>
      </Reveal>

      {/* Barra de herramientas */}
      <Reveal delay={80}>
        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-sm">
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 w-4.5 h-4.5 -translate-y-1/2 text-latte" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar origen, nota, finca…"
              className="w-full rounded-md border border-cocoa bg-roast/70 py-2.5 pl-10 pr-10 text-sm text-crema placeholder:text-latte/50 transition-colors focus:border-ember focus:outline-none"
              aria-label="Buscar cafés"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Borrar búsqueda"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-latte transition-colors hover:bg-cocoa hover:text-crema"
              >
                <XIcon className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((c) => {
              const active = cat === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setCat(c.id)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-95 ${
                    active
                      ? "border-ember bg-ember text-espresso shadow-[0_8px_20px_-10px_rgba(227,155,75,0.9)]"
                      : "border-cocoa bg-transparent text-latte hover:border-husk hover:text-crema"
                  }`}
                >
                  {c.label}
                  <span className={`ml-1.5 font-mono text-[11px] ${active ? "text-espresso/70" : "text-latte/60"}`}>
                    {counts[c.id] ?? 0}
                  </span>
                </button>
              );
            })}

            <div className="relative ml-auto">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                aria-label="Ordenar cafés"
                className="cursor-pointer appearance-none rounded-md border border-cocoa bg-roast/70 py-2.5 pl-4 pr-9 text-sm font-medium text-crema transition-colors focus:border-ember focus:outline-none"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id} className="bg-bean">
                    {s.label}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 w-4 h-4 -translate-y-1/2 text-latte" />
            </div>
          </div>
        </div>
      </Reveal>

      {/* Rejilla */}
      {filtered.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:gap-6 xl:grid-cols-3">
          {filtered.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 90}>
              <ProductCard product={p} onAdd={onAdd} onDetail={onDetail} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center rounded-lg border border-dashed border-cocoa bg-bean/50 px-6 py-20 text-center">
          <BeanIcon className="w-10 h-10 text-husk" />
          <h3 className="mt-5 font-display text-2xl font-semibold text-crema">
            Nada en el molino
          </h3>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-latte">
            No encontramos ningún café que coincida con{" "}
            {query.trim() && <span className="text-ember">«{query.trim()}»</span>}
            {query.trim() && cat !== "todo" && " en esa categoría"}
            {query.trim() === "" && " en esa categoría"}. Prueba con otra nota de cata u otro origen.
          </p>
          {hasFilters && (
            <button
              onClick={() => {
                setQuery("");
                setCat("todo");
              }}
              className="mt-6 rounded-md border border-ember/60 px-5 py-2.5 text-sm font-semibold text-ember transition-colors hover:bg-ember hover:text-espresso"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      )}
    </section>
  );
}
