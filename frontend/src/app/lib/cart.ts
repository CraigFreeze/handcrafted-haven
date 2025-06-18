import type { Product } from "./definitions";

// Utility functions for cart management using localStorage
export type CartItem = Product & { quantity: number };

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  } catch {
    return [];
  }
}

export function addToCart(product: Product) {
  if (typeof window === "undefined") return;
  const cart: CartItem[] = getCart();
  const index = cart.findIndex((item) => item.id === product.id);
  if (index > -1) {
    cart[index].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function clearCart() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("cart");
}
