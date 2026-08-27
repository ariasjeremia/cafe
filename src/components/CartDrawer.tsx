import { useEffect } from "react";
import { eur, FREE_SHIPPING_FROM } from "../data/products";
import type { CartLine } from "../lib/cart";
import {
  ArrowRightIcon,
  BasketIcon,
  CupIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
  TruckIcon,
  XIcon,
  CheckIcon,
} from "./Icons";

export default function CartDrawer({
  open,
  lines,
  subtotal,
  shipping,
  total,
  onClose,
  onSetQty,
  onRemove,
  onCheckout,
}: {
  open: boolean;
  lines: CartLine[];
  subtotal: number;
  shipping: number;
  total: number;
  onClose: () => void;
  onSetQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const count = lines.reduce((a, l) => a + l.qty, 0);
  const missing = Math.max(0, FREE_SHIPPING_FROM - subtotal);
  const pct = Math.min(100, (subtotal / FREE_SHIPPING_FROM) * 100);

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-espresso/75 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-[26rem] flex-col border-l border-cocoa bg-bean shadow-[-30px_0_70px_-30px_rgba(0,0,0,0.9)] transition-transform duration-400 ease-[cubic-bezier(0.22,0.9,0.3,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Cesta de la compra"
      >
        <header className="flex items-center justify-between border-b border-cocoa/70 px-5 py-4">
          <h2 className="flex items-center gap-2.5 font-display text-xl font-bold text-crema">
            <BasketIcon className="w-5 h-5 text-ember" />
            Tu cesta
            {count > 0 && (
              <span className="rounded-full bg-ember px-2 py-0.5 font-mono text-[11px] font-semibold text-espresso">
                {count} {count === 1 ? "bolsa" : "bolsas"}
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            aria-label="Cerrar cesta"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-cocoa text-latte transition-colors hover:border-ember hover:text-ember"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <CupIcon className="w-14 h-14 text-husk" />
            <h3 className="mt-5 font-display text-2xl font-semibold text-crema">
              Tu cesta está vacía
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-latte">
              El molino está esperando. Date una vuelta por la carta y elige tu
              próximo café.
            </p>
            <a
              href="#carta"
              onClick={onClose}
              className="group mt-6 inline-flex items-center gap-2 rounded-md bg-ember px-5 py-3 text-sm font-semibold text-espresso transition-colors hover:bg-foam"
            >
              Ver la carta
              <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        ) : (
          <>
            {/* Progreso de envío gratis */}
            <div className="border-b border-cocoa/70 px-5 py-4">
              {missing > 0 ? (
                <p className="flex items-center gap-2 text-sm text-latte">
                  <TruckIcon className="w-4 h-4 shrink-0 text-ember" />
                  Te faltan <span className="font-semibold text-ember">{eur(missing)}</span> para el envío gratis
                </p>
              ) : (
                <p className="flex items-center gap-2 text-sm font-medium text-leaf">
                  <CheckIcon className="w-4 h-4" />
                  Envío gratis conseguido
                </p>
              )}
              <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-cocoa">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${missing > 0 ? "bg-ember" : "bg-leaf"}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>

            <ul className="flex-1 divide-y divide-cocoa/50 overflow-y-auto px-5">
              {lines.map(({ product, qty }) => (
                <li key={product.id} className="flex gap-3.5 py-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-20 w-16 shrink-0 rounded-md border border-cocoa object-cover"
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate font-display text-[15px] font-semibold text-crema">
                          {product.name}
                        </p>
                        <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-latte">
                          {eur(product.price)} / ud · {product.weight} g
                        </p>
                      </div>
                      <button
                        onClick={() => onRemove(product.id)}
                        aria-label={`Quitar ${product.name}`}
                        className="rounded-full p-1.5 text-latte transition-colors hover:bg-clay/15 hover:text-clay"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-md border border-cocoa">
                        <button
                          onClick={() => onSetQty(product.id, qty - 1)}
                          aria-label="Reducir cantidad"
                          className="flex h-8 w-8 items-center justify-center text-latte transition-colors hover:text-ember"
                        >
                          <MinusIcon className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center text-sm font-bold tabular text-crema">{qty}</span>
                        <button
                          onClick={() => onSetQty(product.id, qty + 1)}
                          disabled={qty >= Math.min(product.stock, 12)}
                          aria-label="Aumentar cantidad"
                          className="flex h-8 w-8 items-center justify-center text-latte transition-colors hover:text-ember disabled:opacity-30"
                        >
                          <PlusIcon className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="font-display text-base font-bold tabular text-crema">
                        {eur(product.price * qty)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-cocoa/70 bg-roast/50 px-5 py-4">
              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between text-latte">
                  <dt>Subtotal</dt>
                  <dd className="tabular">{eur(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-latte">
                  <dt>Envío</dt>
                  <dd className={shipping === 0 ? "font-medium text-leaf" : "tabular"}>
                    {shipping === 0 ? "Gratis" : eur(shipping)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between border-t border-cocoa/70 pt-2.5">
                  <dt className="font-display text-base font-semibold text-crema">Total</dt>
                  <dd className="font-display text-2xl font-bold tabular text-ember">{eur(total)}</dd>
                </div>
              </dl>
              <button
                onClick={onCheckout}
                className="group mt-4 flex w-full items-center justify-center gap-2.5 rounded-md bg-ember py-3.5 text-sm font-bold text-espresso transition-all hover:bg-foam active:scale-[0.98]"
              >
                Tramitar pedido
                <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-latte/70">
                Impuestos incluidos · Pago simulado, sin cargos reales
              </p>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
