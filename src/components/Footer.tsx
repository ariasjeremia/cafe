import { useState } from "react";
import { ArrowRightIcon, CheckIcon, LogoMark } from "./Icons";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setError("Escribe un correo válido");
      return;
    }
    setError("");
    setSubscribed(true);
  };

  return (
    <footer id="tostadora" className="mt-24 scroll-mt-24 border-t border-cocoa/70 bg-bean/70">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember">
              03 — La tostadora
            </p>
            <div className="mt-4 flex items-center gap-3">
              <LogoMark className="w-10 h-10 text-ember" />
              <span className="font-display text-2xl font-bold tracking-[0.2em] text-crema">LUMBRE</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-latte">
              Tostamos en Lavapiés desde 2019: café verde de temporada, lotes
              pequeños y curvas de tueste que publicamos cada semana. Si pasas
              por el barrio, la barra abre a las ocho — el de la máquina siempre
              está calibrado.
            </p>
            <div className="mt-5 space-y-1.5 font-mono text-xs text-latte">
              <p><span className="text-foam">C/ del Olmo 21</span> — Lavapiés, Madrid</p>
              <p>Lun–Vie 8:00–19:00 · Sáb 9:00–14:00</p>
              <p className="text-ember">hola@lumbre.cafe</p>
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-latte">En la tienda</p>
            <ul className="mt-4 space-y-2.5 text-sm text-crema">
              {[
                ["La carta de cafés", "#carta"],
                ["El tueste de la semana", "#tueste"],
                ["La barra", "#tostadora"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="group inline-flex items-center gap-2 transition-colors hover:text-ember"
                  >
                    <span className="h-px w-4 bg-cocoa transition-all group-hover:w-6 group-hover:bg-ember" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-md border border-cocoa bg-roast/60 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-latte">Envíos</p>
              <p className="mt-1.5 text-sm leading-relaxed text-crema">
                Península en 24–48 h. Gratis a partir de 30 €. Tostado el lunes, en tu puerta el miércoles.
              </p>
            </div>
          </div>

          <div className="md:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-latte">El correo del lunes</p>
            <p className="mt-4 text-sm leading-relaxed text-latte">
              Un correo a la semana: qué tostamos, qué llega de origen y una
              receta de barra. Sin ruido.
            </p>
            {subscribed ? (
              <p className="mt-4 flex items-center gap-2.5 rounded-md border border-leaf/50 bg-leaf/10 px-4 py-3 text-sm font-medium text-leaf">
                <CheckIcon className="w-4 h-4" />
                ¡Gracias! Nos leemos el lunes.
              </p>
            ) : (
              <form onSubmit={subscribe} className="mt-4">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@correo.es"
                    aria-label="Tu correo electrónico"
                    className={`w-full rounded-md border bg-roast/70 px-3.5 py-2.5 text-sm text-crema placeholder:text-latte/40 transition-colors focus:outline-none ${
                      error ? "border-clay" : "border-cocoa focus:border-ember"
                    }`}
                  />
                  <button
                    type="submit"
                    aria-label="Suscribirme"
                    className="group flex w-12 shrink-0 items-center justify-center rounded-md bg-ember text-espresso transition-colors hover:bg-foam"
                  >
                    <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
                {error && <p className="mt-1.5 text-xs text-clay">{error}</p>}
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-cocoa/60 pt-6 sm:flex-row">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-latte/70">
            © 2026 Lumbre Tostadores · Hecho a fuego lento en Lavapiés
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-latte/70">
            Tienda de demostración — pagos simulados
          </p>
        </div>
      </div>
    </footer>
  );
}
