'use client';

import React, { useEffect, useState } from "react";
import { getCart, CartItem } from "@/app/lib/cart";

function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-indigo-100 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Your Cart</h1>
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center">Your cart is empty.</p>
        ) : (
          <div>
            <ul className="divide-y divide-gray-200 mb-6">
              {cart.map((item) => (
                <li key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between py-4">
                  <div>
                    <span className="font-semibold text-lg text-gray-800">{item.title}</span>
                    <span className="block text-sm text-gray-500">
                      {item.quantity} × ${item.price}
                    </span>
                  </div>
                  <span className="text-indigo-700 font-bold text-lg mt-2 sm:mt-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center border-t pt-4">
              <h2 className="text-xl font-bold text-gray-700">Total:</h2>
              <span className="text-2xl font-extrabold text-green-600">${total.toFixed(2)}</span>
            </div>
            <button
              className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition"
              onClick={() => alert("Proceed to checkout (not implemented)")}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
