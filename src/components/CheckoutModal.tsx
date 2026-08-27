import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { eur } from "../data/products";
import type { CartLine } from "../lib/cart";
import {
  ArrowRightIcon,
  CheckIcon,
  SpinnerIcon,
  TruckIcon,
  XIcon,
} from "./Icons";

type Step = 0 | 1 | 2;

const inputCls =
  "w-full rounded-md border border-cocoa bg-roast/70 px-3.5 py-2.5 text-sm text-crema placeholder:text-latte/40 transition-colors focus:border-ember focus:outline-none";
const errCls = "border-clay focus:border-clay";

function Field({
  label,
  error,
  children,
  className = "",
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-latte">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-clay">{error}</span>}
    </label>
  );
}

export default function CheckoutModal({
  open,
  lines,
  subtotal,
  shipping,
  total,
  onClose,
  onComplete,
}: {
  open: boolean;
  lines: CartLine[];
  subtotal: number;
  shipping: number;
  total: number;
  onClose: () => void;
  onComplete: () => void;
}) {
  const [step, setStep] = useState<Step>(0);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [order, setOrder] = useState<{ code: string; total: number; count: number; city: string } | null>(null);
  const timer = useRef<number | null>(null);

  const [ship, setShip] = useState({ nombre: "", email: "", direccion: "", ciudad: "", cp: "", telefono: "" });
  const [pay, setPay] = useState({ titular: "", numero: "", caducidad: "", cvc: "" });

  useEffect(() => {
    if (open) {
      setStep(0);
      setErrors({});
      setOrder(null);
      setProcessing(false);
    }
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !processing) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, processing, onClose]);

  if (!open) return null;

  const setS = (k: keyof typeof ship) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setShip((s) => ({ ...s, [k]: e.target.value }));

  const setP = (k: keyof typeof pay) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value;
    if (k === "numero") v = v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
    if (k === "caducidad") {
      v = v.replace(/\D/g, "").slice(0, 4);
      if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
    }
    if (k === "cvc") v = v.replace(/\D/g, "").slice(0, 4);
    setPay((p) => ({ ...p, [k]: v }));
  };

  const validateShipping = () => {
    const e: Record<string, string> = {};
    if (ship.nombre.trim().length < 3) e.nombre = "Escribe tu nombre completo";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(ship.email)) e.email = "Revisa el correo electrónico";
    if (ship.direccion.trim().length < 5) e.direccion = "Indica calle, número y piso";
    if (ship.ciudad.trim().length < 2) e.ciudad = "Indica tu ciudad";
    if (!/^\d{4,5}$/.test(ship.cp.trim())) e.cp = "CP de 4–5 dígitos";
    if (ship.telefono.replace(/\D/g, "").length < 9) e.telefono = "Teléfono de 9 dígitos";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePayment = () => {
    const e: Record<string, string> = {};
    if (pay.titular.trim().length < 3) e.titular = "Nombre tal y como aparece en la tarjeta";
    if (pay.numero.replace(/\s/g, "").length !== 16) e.numero = "El número debe tener 16 dígitos";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(pay.caducidad)) e.caducidad = "Formato MM/AA";
    if (pay.cvc.length < 3) e.cvc = "3–4 dígitos";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const payNow = () => {
    if (!validatePayment()) return;
    setProcessing(true);
    timer.current = window.setTimeout(() => {
      const code = `LB-${Math.floor(1000 + Math.random() * 9000)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
      const count = lines.reduce((a, l) => a + l.qty, 0);
      setOrder({ code, total, count, city: ship.ciudad });
      setStep(2);
      setProcessing(false);
      confetti({
        particleCount: 130,
        spread: 75,
        origin: { y: 0.35 },
        colors: ["#e39b4b", "#f5e9d7", "#c96f4a", "#96a97a", "#b9722c"],
      });
      window.setTimeout(
        () =>
          confetti({
            particleCount: 70,
            angle: 115,
            spread: 60,
            origin: { x: 1, y: 0.4 },
            colors: ["#e39b4b", "#f5e9d7", "#96a97a"],
          }),
        260
      );
      onComplete();
    }, 1700);
  };

  const steps = ["Envío", "Pago", "Listo"];

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label="Tramitar pedido">
      <div
        className="absolute inset-0 animate-fade bg-espresso/85 backdrop-blur-sm"
        onClick={() => !processing && onClose()}
      />

      <div className="relative flex max-h-[94dvh] w-full max-w-lg animate-rise flex-col overflow-hidden rounded-t-xl border border-cocoa bg-bean shadow-[0_40px_90px_-30px_rgba(0,0,0,0.95)] sm:rounded-xl">
        <header className="flex items-center justify-between border-b border-cocoa/70 px-6 py-4">
          <div>
            <h2 className="font-display text-xl font-bold text-crema">Tramitar pedido</h2>
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-latte">
              Simulación — no se realizará ningún cargo
            </p>
          </div>
          {!processing && (
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-cocoa text-latte transition-colors hover:border-ember hover:text-ember"
            >
              <XIcon className="w-4 h-4" />
            </button>
          )}
        </header>

        {/* Indicador de pasos */}
        <div className="flex items-center gap-2 px-6 pt-5">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-1 items-center gap-2">
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-semibold transition-colors ${
                  i < step
                    ? "bg-leaf text-espresso"
                    : i === step
                      ? "bg-ember text-espresso"
                      : "border border-cocoa text-latte"
                }`}
              >
                {i < step ? <CheckIcon className="w-3 h-3" /> : i + 1}
              </span>
              <span className={`font-mono text-[10px] uppercase tracking-wider ${i <= step ? "text-crema" : "text-latte/60"}`}>
                {s}
              </span>
              {i < steps.length - 1 && <span className={`h-px flex-1 ${i < step ? "bg-leaf/60" : "bg-cocoa"}`} />}
            </div>
          ))}
        </div>

        <div className="overflow-y-auto px-6 py-5">
          {step === 0 && (
            <div className="animate-rise space-y-4">
              <Field label="Nombre y apellidos" error={errors.nombre}>
                <input className={`${inputCls} ${errors.nombre ? errCls : ""}`} value={ship.nombre} onChange={setS("nombre")} placeholder="María del Carmen Roble" autoComplete="name" />
              </Field>
              <Field label="Correo electrónico" error={errors.email}>
                <input className={`${inputCls} ${errors.email ? errCls : ""}`} type="email" value={ship.email} onChange={setS("email")} placeholder="maria@ejemplo.es" autoComplete="email" />
              </Field>
              <Field label="Dirección de envío" error={errors.direccion}>
                <input className={`${inputCls} ${errors.direccion ? errCls : ""}`} value={ship.direccion} onChange={setS("direccion")} placeholder="C/ de la Palma 8, 2ºB" autoComplete="street-address" />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Ciudad" error={errors.ciudad}>
                  <input className={`${inputCls} ${errors.ciudad ? errCls : ""}`} value={ship.ciudad} onChange={setS("ciudad")} placeholder="Madrid" autoComplete="address-level2" />
                </Field>
                <Field label="Código postal" error={errors.cp}>
                  <input className={`${inputCls} ${errors.cp ? errCls : ""}`} inputMode="numeric" value={ship.cp} onChange={setS("cp")} placeholder="28004" autoComplete="postal-code" />
                </Field>
              </div>
              <Field label="Teléfono" error={errors.telefono}>
                <input className={`${inputCls} ${errors.telefono ? errCls : ""}`} inputMode="tel" value={ship.telefono} onChange={setS("telefono")} placeholder="600 123 456" autoComplete="tel" />
              </Field>
              <div className="flex items-center gap-2.5 rounded-md border border-cocoa bg-roast/60 px-3.5 py-3 text-sm text-latte">
                <TruckIcon className="w-4 h-4 shrink-0 text-ember" />
                Entrega estimada: {shipping === 0 ? "gratis" : eur(shipping)} · 24–48 h desde el tueste del lunes
              </div>
              <button
                onClick={() => validateShipping() && (setErrors({}), setStep(1))}
                className="group flex w-full items-center justify-center gap-2.5 rounded-md bg-ember py-3.5 text-sm font-bold text-espresso transition-all hover:bg-foam active:scale-[0.98]"
              >
                Continuar al pago
                <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )}

          {step === 1 && (
            <div className="animate-rise space-y-4">
              <Field label="Titular de la tarjeta" error={errors.titular}>
                <input className={`${inputCls} ${errors.titular ? errCls : ""}`} value={pay.titular} onChange={setP("titular")} placeholder="MARIA ROBLE" autoComplete="cc-name" />
              </Field>
              <Field label="Número de tarjeta" error={errors.numero}>
                <input
                  className={`${inputCls} tabular ${errors.numero ? errCls : ""}`}
                  inputMode="numeric"
                  value={pay.numero}
                  onChange={setP("numero")}
                  placeholder="4242 4242 4242 4242"
                  autoComplete="cc-number"
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Caducidad" error={errors.caducidad}>
                  <input className={`${inputCls} tabular ${errors.caducidad ? errCls : ""}`} inputMode="numeric" value={pay.caducidad} onChange={setP("caducidad")} placeholder="09/27" autoComplete="cc-exp" />
                </Field>
                <Field label="CVC" error={errors.cvc}>
                  <input className={`${inputCls} tabular ${errors.cvc ? errCls : ""}`} inputMode="numeric" value={pay.cvc} onChange={setP("cvc")} placeholder="123" autoComplete="cc-csc" />
                </Field>
              </div>

              {/* Resumen */}
              <div className="rounded-md border border-cocoa bg-roast/60 px-4 py-3.5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-latte">Resumen</p>
                <ul className="mt-2 space-y-1 text-sm text-latte">
                  {lines.map(({ product, qty }) => (
                    <li key={product.id} className="flex justify-between gap-3">
                      <span className="truncate">
                        <span className="tabular text-crema">{qty}×</span> {product.name}
                      </span>
                      <span className="tabular shrink-0">{eur(product.price * qty)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 flex justify-between border-t border-cocoa/70 pt-2 text-sm">
                  <span className="text-latte">Envío</span>
                  <span className={shipping === 0 ? "font-medium text-leaf" : "tabular text-latte"}>
                    {shipping === 0 ? "Gratis" : eur(shipping)}
                  </span>
                </div>
                <div className="mt-1 flex justify-between">
                  <span className="font-display font-semibold text-crema">Total</span>
                  <span className="font-display text-lg font-bold tabular text-ember">{eur(total)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(0)}
                  disabled={processing}
                  className="rounded-md border border-cocoa px-4 py-3.5 text-sm font-semibold text-latte transition-colors hover:border-husk hover:text-crema disabled:opacity-40"
                >
                  Atrás
                </button>
                <button
                  onClick={payNow}
                  disabled={processing}
                  className="flex flex-1 items-center justify-center gap-2.5 rounded-md bg-ember py-3.5 text-sm font-bold text-espresso transition-all hover:bg-foam active:scale-[0.98] disabled:cursor-wait disabled:opacity-80"
                >
                  {processing ? (
                    <>
                      <SpinnerIcon className="w-4.5 h-4.5" /> Confirmando con el banco…
                    </>
                  ) : (
                    <>Pagar {eur(total)}</>
                  )}
                </button>
              </div>
              <p className="text-center font-mono text-[10px] uppercase tracking-[0.14em] text-latte/60">
                Tarjeta de prueba: cualquier número de 16 dígitos
              </p>
            </div>
          )}

          {step === 2 && order && (
            <div className="animate-rise flex flex-col items-center py-4 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-leaf bg-leaf/15 text-leaf">
                <CheckIcon className="w-7 h-7" />
              </span>
              <h3 className="mt-5 font-display text-3xl font-bold text-crema">
                ¡Pedido en el molino!
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-latte">
                Gracias, {ship.nombre.split(" ")[0] || "cafetero"}. Hemos recibido tu pedido y lo
                tostaremos el lunes. Te llegará un correo de confirmación{" "}
                <span className="text-ember">(simulado)</span>.
              </p>

              <dl className="mt-6 w-full space-y-1.5 rounded-md border border-cocoa bg-roast/60 px-4 py-3.5 text-left text-sm">
                <div className="flex justify-between">
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-latte">Nº de pedido</dt>
                  <dd className="font-mono font-semibold text-ember">{order.code}</dd>
                </div>
                <div className="flex justify-between text-latte">
                  <dt>Bolsas</dt>
                  <dd className="tabular">{order.count}</dd>
                </div>
                <div className="flex justify-between text-latte">
                  <dt>Destino</dt>
                  <dd>{order.city}</dd>
                </div>
                <div className="flex justify-between border-t border-cocoa/70 pt-2">
                  <dt className="font-semibold text-crema">Total cobrado (ficticio)</dt>
                  <dd className="font-display font-bold tabular text-crema">{eur(order.total)}</dd>
                </div>
              </dl>

              <button
                onClick={onClose}
                className="group mt-6 flex items-center gap-2.5 rounded-md bg-ember px-6 py-3 text-sm font-bold text-espresso transition-all hover:bg-foam active:scale-[0.98]"
              >
                Volver a la tienda
                <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
