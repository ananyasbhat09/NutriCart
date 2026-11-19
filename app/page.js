
"use client";

import { useMemo, useState } from "react";

import Hero from "../components/Hero";
import NutritionPanel from "../components/NutritionPanel";
import RecipeSuggestions from "../components/RecipeSuggestions";
import CategoryList from "../components/CategoryList";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

import { products } from "../data/products";
import { useCart } from "./context/CreateContext";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const { cart, addToCart, removeFromCart, theme } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, search]);

  const cartTotal = cart.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  return (
    <div className="app-shell" data-theme={theme}>
      <Navbar
  search={search}
  setSearch={setSearch}
  cartCount={cart.length}
  onCartClick={() => setCartOpen(!cartOpen)}
/>

      {cartOpen && (
        <div className="panel m-5">
          <h2 className="text-2xl font-bold mb-4">
            Your Shopping Cart
          </h2>

          {cart.length === 0 ? (
            <p className="muted-text">Your cart is empty.</p>
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

              <h3 className="font-bold text-xl mt-4">
                Total: ₹{cartTotal}
              </h3>
            </>
          )}
        </div>
      )}

      <Hero />

      <CategoryList
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div
        id="products"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12"
      >
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id || product.name}
            product={product}
            onSelect={setSelectedProduct}
            onAdd={addToCart}
          />
        ))}
      </div>

      {selectedProduct && (
        <div className="flex flex-col gap-10">
          <NutritionPanel product={selectedProduct} />
          <RecipeSuggestions product={selectedProduct} />
        </div>
      )}
    </div>
  );
}
