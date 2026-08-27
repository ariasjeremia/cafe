import { MASTHEAD_IMAGE } from "../data/products";
import { ArrowRightIcon, PinIcon } from "./Icons";
import Reveal from "./Reveal";

function Stamp() {
  return (
    <div className="pointer-events-none absolute -top-9 -right-5 h-28 w-28 sm:h-32 sm:w-32">
      <svg viewBox="0 0 100 100" className="h-full w-full animate-spin-slow text-ember">
        <defs>
          <path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <circle cx="50" cy="50" r="49" fill="var(--color-bean)" opacity="0.92" />
        <circle cx="50" cy="50" r="27" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2.5 3.5" />
        <text fontSize="8.6" letterSpacing="1.6" fill="currentColor" fontFamily="IBM Plex Mono, monospace" style={{ textTransform: "uppercase" }}>
          <textPath href="#circ">Tostado fresco · pequeños lotes ·</textPath>
        </text>
        <path d="M50 38c-5 3.8-6 8.4-2.4 12.4-3.6.4-5.4 2.2-5.8 5.3 7.2 2 16.2 1.1 21.1-3.9 5.4-5.6 3-11.2-5.8-14.8-2.3-.9-5-.6-7.1 1Z" fill="currentColor" />
      </svg>
    </div>
  );
}

export default function Masthead() {
  return (
    <section id="tueste" className="relative mx-auto max-w-7xl scroll-mt-24 px-4 pb-16 pt-10 sm:px-6 lg:pt-16">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Columna editorial */}
        <div className="lg:col-span-7">
          <Reveal>
            <p className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-latte">
              <span className="inline-flex items-center gap-2 rounded-full border border-ember/40 bg-ember/10 px-3 py-1.5 text-ember">
                <span className="h-1.5 w-1.5 animate-glow rounded-full bg-ember" />
                En tueste ahora · Lote Nº 48
              </span>
              <span className="hidden sm:inline">Madrid — desde 2019</span>
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-6 font-display text-[2.6rem] font-bold leading-[0.98] tracking-tight text-crema sm:text-6xl lg:text-[4.4rem]">
              El buen café
              <br />
              se decide a
              <br />
              <span className="font-light italic text-ember">fuego lento.</span>
            </h1>
          </Reveal>

          <Reveal delay={170}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-latte sm:text-lg">
              Compramos verde a catorce fincas con nombre y apellido, lo tostamos
              cada lunes en lotes de doce kilos y te lo enviamos antes de que
              pierda el primer aroma. Seis cafés en carta. Ni uno de relleno.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <a
                href="#carta"
                className="group inline-flex items-center gap-2.5 rounded-md bg-ember px-6 py-3.5 font-semibold text-espresso shadow-[0_12px_30px_-12px_rgba(227,155,75,0.7)] transition-all hover:bg-foam hover:shadow-[0_16px_36px_-12px_rgba(227,155,75,0.85)] active:scale-[0.97]"
              >
                Ver la carta de cafés
                <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#tostadora"
                className="group inline-flex items-center gap-2 font-medium text-crema underline decoration-cocoa decoration-2 underline-offset-8 transition-colors hover:decoration-ember hover:text-ember"
              >
                Cómo trabajamos
                <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <dl className="mt-12 flex flex-wrap gap-x-12 gap-y-6 border-t border-cocoa/70 pt-7">
              {[
                ["86,8", "SCA media de la carta"],
                ["14", "fincas con trato directo"],
                ["48 h", "del tueste a tu puerta"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd className="font-display text-3xl font-bold text-crema sm:text-4xl">
                    {n}
                  </dd>
                  <dd className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-latte">
                    {l}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Columna visual */}
        <div className="lg:col-span-5">
          <Reveal delay={150} className="relative">
            <Stamp />
            <figure className="relative overflow-hidden rounded-lg border border-cocoa shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)]">
              <img
                src={MASTHEAD_IMAGE}
                alt="Barista vertiendo agua sobre un filtro de café en la tostadora Lumbre"
                className="aspect-[4/5] w-full object-cover transition-transform duration-[1.6s] ease-out hover:scale-[1.04]"
                loading="eager"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-transparent" />
              <figcaption className="absolute bottom-4 left-4 right-4 rounded-md border border-cocoa/80 bg-bean/90 p-4 backdrop-blur-sm">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-latte">
                  Ficha de tueste · semana 20
                </p>
                <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 font-mono text-[11px] text-crema">
                  <span><span className="text-latte">Perfil </span>Huila honey</span>
                  <span><span className="text-latte">Carga </span>182 °C</span>
                  <span><span className="text-latte">Primer crack </span>9:41</span>
                  <span><span className="text-ember">Desarrollo 18 %</span></span>
                </div>
              </figcaption>
            </figure>
            <p className="mt-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-latte">
              <PinIcon className="w-4 h-4 text-ember" />
              C/ del Olmo 21, Lavapiés — la barra abre a las 8:00
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
