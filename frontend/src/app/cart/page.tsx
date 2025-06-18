"use client";
import React, { useEffect, useState } from "react";
import { getCart, CartItem } from "@/app/lib/cart";

function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.title} (x{item.quantity}) - ${item.price} each
              </li>
            ))}
          </ul>
          <h2>Total: ${total.toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
}

export default CartPage;
