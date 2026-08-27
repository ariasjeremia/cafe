import { useEffect, useMemo, useState } from "react";
import {
  FREE_SHIPPING_FROM,
  MAX_PER_ORDER,
  PRODUCTS,
  SHIPPING_COST,
} from "./data/products";
import { cartTotals, type CartLine } from "./lib/cart";
import Header from "./components/Header";
import Ticker from "./components/Ticker";
import Masthead from "./components/Masthead";
import Shop from "./components/Shop";
import ProductDetail from "./components/ProductDetail";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import Footer from "./components/Footer";
import { CheckIcon } from "./components/Icons";

type CartMap = Record<string, number>;

const CART_KEY = "lumbre-cart-v1";

function loadCart(): CartMap {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return {};
    const clean: CartMap = {};
    for (const [id, qty] of Object.entries(parsed)) {
      if (PRODUCTS.some((p) => p.id === id) && typeof qty === "number" && qty > 0) {
        clean[id] = Math.min(qty, MAX_PER_ORDER);
      }
    }
    return clean;
  } catch {
    return {};
  }
}

export default function App() {
  const [cart, setCart] = useState<CartMap>(loadCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toast, setToast] = useState<{ id: number; msg: string } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* almacenamiento no disponible */
    }
  }, [cart]);

  const lines: CartLine[] = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => {
          const product = PRODUCTS.find((p) => p.id === id);
          return product ? { product, qty } : null;
        })
        .filter((l): l is CartLine => l !== null),
    [cart]
  );

  const { subtotal, shipping, total } = useMemo(
    () => cartTotals(lines, FREE_SHIPPING_FROM, SHIPPING_COST),
    [lines]
  );
  const count = lines.reduce((a, l) => a + l.qty, 0);

  const showToast = (msg: string) => setToast({ id: Date.now(), msg });

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(t);
  }, [toast]);

  const addToCart = (id: string, qty = 1) => {
    const p = PRODUCTS.find((x) => x.id === id);
    if (!p) return;
    setCart((c) => {
      const cap = Math.min(p.stock, MAX_PER_ORDER);
      const next = Math.min((c[id] ?? 0) + qty, cap);
      return { ...c, [id]: next };
    });
    showToast(`${p.name} — añadido a tu cesta`);
  };

  const setQty = (id: string, q: number) =>
    setCart((c) => {
      if (q <= 0) {
        const next = { ...c };
        delete next[id];
        return next;
      }
      return { ...c, [id]: q };
    });

  const removeLine = (id: string) => setQty(id, 0);

  const detail = detailId ? PRODUCTS.find((p) => p.id === detailId) ?? null : null;

  const anyOverlay = cartOpen || checkoutOpen || detail !== null;
  useEffect(() => {
    document.body.style.overflow = anyOverlay ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [anyOverlay]);

  return (
    <div id="top" className="relative min-h-screen">
      <div className="ambient" aria-hidden="true" />

      <Ticker />
      <Header cartCount={count} onCartOpen={() => setCartOpen(true)} />

      <main>
        <Masthead />
        <Shop onAdd={addToCart} onDetail={setDetailId} />
      </main>

      <Footer />

      <ProductDetail
        product={detail}
        inCartQty={detail ? cart[detail.id] ?? 0 : 0}
        onClose={() => setDetailId(null)}
        onAdd={addToCart}
      />

      <CartDrawer
        open={cartOpen}
        lines={lines}
        subtotal={subtotal}
        shipping={shipping}
        total={total}
        onClose={() => setCartOpen(false)}
        onSetQty={setQty}
        onRemove={removeLine}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        open={checkoutOpen}
        lines={lines}
        subtotal={subtotal}
        shipping={shipping}
        total={total}
        onClose={() => setCheckoutOpen(false)}
        onComplete={() => setCart({})}
      />

      {toast && (
        <div
          key={toast.id}
          role="status"
          className="fixed bottom-6 left-1/2 z-[70] w-max max-w-[calc(100vw-2rem)] -translate-x-1/2 animate-toast"
        >
          <div className="flex items-center gap-3 rounded-md border border-ember/50 bg-roast px-4 py-3 shadow-[0_18px_44px_-14px_rgba(0,0,0,0.9)]">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-leaf text-espresso">
              <CheckIcon className="w-3.5 h-3.5" />
            </span>
            <p className="truncate text-sm font-medium text-crema">{toast.msg}</p>
            <button
              onClick={() => {
                setToast(null);
                setCartOpen(true);
              }}
              className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-ember transition-colors hover:text-foam"
            >
              Ver cesta
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
