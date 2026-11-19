
"use client";

import { useMemo, useState } from "react";

import Navbar from "../../components/Navbar";
import CategoryList from "../../components/CategoryList";
import ProductCard from "../../components/ProductCard";

import { useCart } from "../context/CreateContext";
import { products } from "../../data/products";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const { cart, addToCart, removeFromCart, theme } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div className="app-shell" data-theme={theme}>
      <Navbar
  search={search}
  setSearch={setSearch}
  cartCount={cart.length}
/>

      {cartOpen && (
        <div className="panel m-5">
          <h2 className="text-2xl font-bold mb-4">
            Your Shopping Cart
          </h2>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item, index) => (
                <div
                  key={`${item.id || item.name}-${index}`}
                  className="flex justify-between items-center py-3 border-b"
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
            </>
          )}
        </div>
      )}

      <div className="p-5">
        <h1 className="text-3xl font-bold mb-2">
          Our Groceries
        </h1>

        <p className="text-gray-500 mb-6">
          Explore fresh and healthy grocery products.
        </p>

        <CategoryList
          selectedCategory={category}
          setSelectedCategory={setCategory}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id || product.name}
              product={product}
              onAdd={addToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
