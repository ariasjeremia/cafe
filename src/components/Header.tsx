import { useEffect, useState } from "react";
import { BasketIcon, FlameIcon, LogoMark } from "./Icons";

export default function Header({
  cartCount,
  onCartOpen,
}: {
  cartCount: number;
  onCartOpen: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-cocoa/70 bg-espresso/90 backdrop-blur-md shadow-[0_10px_30px_-18px_rgba(0,0,0,0.8)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <a href="#top" className="group flex items-center gap-2.5">
          <LogoMark className="w-9 h-9 text-ember transition-transform duration-500 group-hover:rotate-[18deg]" />
          <span className="leading-none">
            <span className="block font-display text-xl font-bold tracking-[0.22em] text-crema">
              LUMBRE
            </span>
            <span className="mt-0.5 hidden font-mono text-[10px] uppercase tracking-[0.18em] text-latte sm:block">
              Tostadora de especialidad
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm font-medium text-latte md:flex">
          <a href="#carta" className="transition-colors hover:text-ember">La carta</a>
          <a href="#tueste" className="transition-colors hover:text-ember">El tueste</a>
          <a href="#tostadora" className="transition-colors hover:text-ember">La tostadora</a>
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-1.5 rounded-full border border-cocoa px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-latte lg:flex">
            <FlameIcon className="w-3.5 h-3.5 text-ember" />
            Tostando · Lote 48
          </span>
          <button
            onClick={onCartOpen}
            className="group relative flex items-center gap-2 rounded-md border border-cocoa bg-roast/60 px-3.5 py-2 text-sm font-semibold text-crema transition-all hover:border-ember/60 hover:bg-roast"
            aria-label="Abrir cesta"
          >
            <BasketIcon className="w-5 h-5 text-ember transition-transform group-hover:-rotate-6" />
            <span className="hidden sm:inline">Cesta</span>
            {cartCount > 0 && (
              <span
                key={cartCount}
                className="absolute -right-2 -top-2 flex h-5 min-w-5 animate-pop items-center justify-center rounded-full bg-ember px-1 font-mono text-[11px] font-semibold text-espresso"
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
