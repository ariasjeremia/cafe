import type { Product } from "../data/products";

export interface CartLine {
  product: Product;
  qty: number;
}

export const cartTotals = (lines: CartLine[], freeFrom: number, cost: number) => {
  const subtotal = lines.reduce((acc, l) => acc + l.product.price * l.qty, 0);
  const shipping = lines.length === 0 || subtotal >= freeFrom ? 0 : cost;
  return { subtotal, shipping, total: subtotal + shipping };
};
