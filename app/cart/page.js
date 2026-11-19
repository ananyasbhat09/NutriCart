
"use client";

import Navbar from "../../components/Navbar";
import { useCart } from "../context/CreateContext";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  return (
    <div className="app-shell">
      <Navbar
  search=""
  setSearch={() => {}}
  cartCount={cart.length}
  onCartClick={() => {}}
  theme="light"
  setTheme={() => {}}
/>

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">
          My Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <p>Your cart is empty. Start shopping!</p>
        ) : (
          <>
            {cart.map((item, index) => (
              <div
                key={`${item.id || item.name}-${index}`}
                className="flex justify-between items-center py-4 border-b"
              >
                <span>{item.image} {item.name}</span>
                <span>₹{item.price}</span>

                <button
                  onClick={() => removeFromCart(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}

            <h2 className="text-2xl font-bold mt-6">
              Total: ₹{total}
            </h2>
          </>
        )}
      </div>
    </div>
  );
}
