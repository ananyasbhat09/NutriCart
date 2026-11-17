"use client";

import { useMemo, useState } from "react";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryList from "@/components/CategoryList";
import ProductCard from "@/components/ProductCard";
import NutritionPanel from "@/components/NutritionPanel";
import RecipeSuggestions from "@/components/RecipeSuggestions";

import { products } from "@/data/products";
import { ShoppingBag, Leaf } from "lucide-react";

export default function Home() {
  const [selectedProduct, setSelectedProduct] =
    useState(products[0]);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [search, setSearch] = useState("");

  const [cart, setCart] = useState([]);

  const [theme, setTheme] = useState("dark");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      const matchesSearch =
        product.name.toLowerCase().includes(
          search.toLowerCase()
        );

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, search]);

  function addToCart(product) {
    setCart((previousCart) => [
      ...previousCart,
      product
    ]);
  }

  const cartTotal = cart.reduce(
    (total, item) => total + item.price,
    0
  );

  return (
    <main
      className="app-shell"
      data-theme={theme}
    >
      <div className="main-container">

        {/* NAVBAR */}

        <Navbar
          search={search}
          setSearch={setSearch}
          cartCount={cart.length}
          theme={theme}
          setTheme={setTheme}
        />

        {/* HERO */}

        <Hero />

        {/* CATEGORIES */}

        <section id="products" className="mt-12">
          <div className="mb-6">
            <p className="text-green-500 text-sm font-semibold">
              EXPLORE OUR STORE
            </p>

            <h2 className="text-3xl font-bold mt-2">
              Fresh Groceries
            </h2>

            <p className="muted-text mt-2">
              Select an item to discover its nutritional value.
            </p>
          </div>

          <CategoryList
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          {/* PRODUCT GRID */}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-7">

            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={setSelectedProduct}
                onAdd={addToCart}
              />
            ))}

          </div>

          {filteredProducts.length === 0 && (
            <p className="muted-text mt-8 text-center">
              No products found. Try another search.
            </p>
          )}
        </section>

        {/* NUTRITION AND RECIPES */}

        <section className="mt-16">
          <div className="mb-6">
            <p className="text-green-500 text-sm font-semibold">
              YOUR SMART FOOD ASSISTANT
            </p>

            <h2 className="text-3xl font-bold mt-2">
              Discover Your Food
            </h2>

            <p className="muted-text mt-2">
              Explore the nutritional profile and recipes
              of your selected grocery item.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <NutritionPanel
              product={selectedProduct}
            />

            <RecipeSuggestions
              product={selectedProduct}
            />

          </div>
        </section>

        {/* CART SUMMARY */}

        <section className="cart-summary mt-12">
          <div className="flex items-center gap-3">
            <ShoppingBag
              size={28}
              className="text-green-400"
            />

            <div>
              <h2 className="text-xl font-bold">
                Your Shopping Cart
              </h2>

              <p className="muted-text text-sm">
                {cart.length} items added
              </p>
            </div>
          </div>

          {cart.length > 0 ? (
            <>
              <div className="mt-5 space-y-3">
                {cart.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="flex justify-between items-center"
                  >
                    <span>
                      {item.image} {item.name}
                    </span>

                    <span className="font-semibold">
                      ₹{item.price}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-600 mt-5 pt-4 flex justify-between font-bold">
                <span>Total Amount</span>

                <span className="text-green-400">
                  ₹{cartTotal}
                </span>
              </div>
            </>
          ) : (
            <p className="muted-text mt-5">
              Your cart is empty. Start adding groceries!
            </p>
          )}
        </section>

        {/* FOOTER */}

        <footer className="footer">
          <div className="flex justify-center items-center gap-2">
            <Leaf className="text-green-500" />

            <span className="font-bold text-lg">
              NutriCart
            </span>
          </div>

          <p className="muted-text text-sm mt-3">
            Shop smart. Eat healthy. Live better.
          </p>

          <p className="muted-text text-xs mt-5">
            © 2026 Nutri-Cart. All rights reserved.
          </p>
        </footer>

      </div>
    </main>
  );
}