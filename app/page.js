"use client";

import { useState } from "react";

import Header from "../components/Header";
import ProductGrid from "../components/ProductGrid";
import NutritionPanel from "../components/NutritionPanel";
import RecipeSection from "../components/RecipeSection";

import { products } from "../data/products";

import {
  Leaf,
  ShoppingBasket,
  ArrowRight,
  Sparkles,
  ShoppingCart
} from "lucide-react";

export default function Home() {

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [selectedProduct, setSelectedProduct] = useState(
    products[0]
  );

  const [cart, setCart] = useState([]);

  const categories = [
    "All",
    "Fruits",
    "Vegetables",
    "Grains",
    "Dry Fruits"
  ];

  // Add products to cart

  const addToCart = (product) => {

    setCart((previousCart) => [
      ...previousCart,
      product
    ]);

  };

  // Filter products

  const filteredProducts = products.filter((product) => {

    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;

  });

  // Calculate cart total

  const cartTotal = cart.reduce(
    (total, item) => total + item.price,
    0
  );

  return (

    <main className="min-h-screen">

      {/* HEADER */}

      <Header
        cartCount={cart.length}
        search={search}
        setSearch={setSearch}
      />

      <div className="max-w-7xl mx-auto px-5 py-8">

        {/* HERO SECTION */}

        <section className="relative overflow-hidden bg-gradient-to-br from-[#203c28] via-[#14261b] to-[#101812] rounded-3xl p-8 md:p-14 mb-12">

          <div className="absolute -right-10 -top-10 w-72 h-72 bg-lime-400/10 blur-3xl rounded-full" />

          <div className="relative z-10 max-w-2xl">

            <div className="inline-flex items-center gap-2 bg-lime-400/10 text-lime-300 px-4 py-2 rounded-full text-sm mb-6">

              <Sparkles size={16} />

              Smarter Grocery Shopping

            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">

              Your groceries.

              <br />

              Your nutrition.

              <br />

              <span className="text-lime-400">
                Your lifestyle.
              </span>

            </h1>

            <p className="text-gray-300 mt-6 text-base md:text-lg leading-relaxed">

              Shop your favourite groceries, explore their
              nutritional value and discover delicious recipes
              with every ingredient.

            </p>

            <a
              href="#shop"
              className="inline-flex items-center gap-3 bg-lime-400 text-black font-bold px-6 py-4 rounded-full mt-8 hover:bg-lime-300 transition"
            >

              Explore Groceries

              <ArrowRight size={19} />

            </a>

          </div>

        </section>

        {/* FEATURE CARDS */}

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">

          {[
            {
              icon: ShoppingBasket,
              title: "Fresh Groceries",
              description: "Everyday essentials in one place."
            },
            {
              icon: Leaf,
              title: "Know Your Food",
              description: "Understand what you eat."
            },
            {
              icon: Sparkles,
              title: "Smart Recipes",
              description: "Turn ingredients into meals."
            }
          ].map((item, index) => (

            <div
              key={index}
              className="bg-[#121a15] border border-white/10 p-5 rounded-2xl flex items-center gap-4"
            >

              <div className="bg-lime-400/10 p-3 rounded-xl">

                <item.icon
                  className="text-lime-400"
                  size={26}
                />

              </div>

              <div>

                <h3 className="font-semibold">
                  {item.title}
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                  {item.description}
                </p>

              </div>

            </div>

          ))}

        </section>

        {/* GROCERY SECTION */}

        <section id="shop" className="scroll-mt-28">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-7">

            <div>

              <p className="text-lime-400 text-sm font-semibold">
                EXPLORE OUR STORE
              </p>

              <h2 className="text-3xl font-bold mt-2">
                Fresh Groceries
              </h2>

              <p className="text-gray-400 mt-2">
                Select an item to explore its nutrition and recipes.
              </p>

            </div>

            {/* CATEGORY FILTER */}

            <div className="flex flex-wrap gap-2">

              {categories.map((item) => (

                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`px-4 py-2 rounded-full text-sm transition ${
                    category === item
                      ? "bg-lime-400 text-black font-semibold"
                      : "bg-[#17221a] text-gray-300 border border-white/10"
                  }`}
                >

                  {item}

                </button>

              ))}

            </div>

          </div>

          <ProductGrid
            products={filteredProducts}
            onSelect={setSelectedProduct}
            onAddToCart={addToCart}
            selected={selectedProduct}
          />

        </section>

        {/* SELECTED PRODUCT DETAILS */}

        <section className="mt-16">

          <div className="mb-7">

            <p className="text-lime-400 text-sm font-semibold">
              DISCOVER YOUR FOOD
            </p>

            <h2 className="text-3xl font-bold mt-2">
              Your Nutrition Dashboard
            </h2>

            <p className="text-gray-400 mt-2">
              Currently exploring: {selectedProduct.name}
            </p>

          </div>

          <div className="grid lg:grid-cols-2 gap-6">

            {/* Selected product image */}

            <div className="relative min-h-[350px] rounded-3xl overflow-hidden">

              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 p-7">

                <span className="bg-lime-400 text-black text-xs font-bold px-3 py-2 rounded-full">
                  {selectedProduct.health}
                </span>

                <h2 className="text-3xl font-bold mt-4">
                  {selectedProduct.name}
                </h2>

                <p className="text-gray-300 mt-2">
                  ₹{selectedProduct.price} / {selectedProduct.unit}
                </p>

                <button
                  onClick={() => addToCart(selectedProduct)}
                  className="flex items-center gap-2 bg-lime-400 text-black px-5 py-3 rounded-xl font-semibold mt-5 hover:bg-lime-300"
                >

                  <ShoppingCart size={18} />

                  Add to Cart

                </button>

              </div>

            </div>

            {/* Nutrition panel */}

            <NutritionPanel
              product={selectedProduct}
            />

          </div>

        </section>

        {/* RECIPE SECTION */}

        <RecipeSection
          product={selectedProduct}
        />

        {/* CART SUMMARY */}

        <section className="mt-16 bg-[#17251b] border border-lime-400/20 rounded-3xl p-7">

          <div className="flex flex-col md:flex-row justify-between gap-5">

            <div>

              <div className="flex items-center gap-3">

                <ShoppingCart
                  className="text-lime-400"
                  size={25}
                />

                <h2 className="text-2xl font-bold">
                  Your Shopping Cart
                </h2>

              </div>

              <p className="text-gray-400 mt-2">
                {cart.length} item(s) added to your cart.
              </p>

            </div>

            <div className="md:text-right">

              <p className="text-gray-400 text-sm">
                Total Amount
              </p>

              <p className="text-3xl font-bold text-lime-400 mt-1">
                ₹{cartTotal}
              </p>

            </div>

          </div>

          {cart.length > 0 ? (

            <div className="mt-6 border-t border-white/10 pt-5 space-y-3">

              {cart.map((item, index) => (

                <div
                  key={`${item.id}-${index}`}
                  className="flex justify-between items-center text-sm"
                >

                  <span className="text-gray-300">
                    {item.name}
                  </span>

                  <span className="font-semibold">
                    ₹{item.price}
                  </span>

                </div>

              ))}

              <button
                onClick={() => setCart([])}
                className="text-sm text-red-400 hover:text-red-300 mt-4"
              >
                Clear Cart
              </button>

            </div>

          ) : (

            <div className="mt-6 text-gray-500 border-t border-white/10 pt-5">
              Your cart is empty. Start exploring groceries!
            </div>

          )}

        </section>

        {/* FOOTER */}

        <footer className="text-center border-t border-white/10 mt-16 py-8">

          <div className="flex items-center justify-center gap-2">

            <Leaf className="text-lime-400" />

            <h2 className="font-bold text-xl">
              Nutri<span className="text-lime-400">Cart</span>
            </h2>

          </div>

          <p className="text-gray-500 text-sm mt-3">
            Shop Smart. Eat Better. Live Healthier.
          </p>

          <p className="text-gray-600 text-xs mt-4">
            © 2026 Nutri-Cart. All rights reserved.
          </p>

        </footer>

      </div>

    </main>

  );

}