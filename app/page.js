"use client";

import { useState } from "react";

import Hero from "../components/Hero";
import NutritionPanel from "../components/NutritionPanel";
import RecipeSuggestions from "../components/RecipeSuggestions";
import { products } from "../data/products";

import {
  Leaf,
  ShoppingBasket,
  ArrowRight,
  Sparkles,
  ShoppingCart
} from "lucide-react";
import CategoryList from "../components/CategoryList";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

export default function Home() {

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [selectedProduct, setSelectedProduct] = useState(
    products[0]
  );

  const [cart, setCart] = useState([]);
  const [theme, setTheme] = useState("light");
  const [cartOpen, setCartOpen] = useState(false);

  // const categories = [
  //   "All",
  //   "Fruits",
  //   "Vegetables",
  //   "Grains",
  //   "Dry Fruits"
  // ];

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
  <div className="app-shell" data-theme={theme}>
      <Navbar
  search={search}
  setSearch={setSearch}
  cartCount={cart.length}
  onCartClick={() => setCartOpen(!cartOpen)}
  theme={theme}
  setTheme={setTheme}
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
            <span>
              {item.image} {item.name}
            </span>

            <span>₹{item.price}</span>

            <button
              onClick={() =>
                setCart(cart.filter((_, i) => i !== index))
              }
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


      <Hero/>

      <CategoryList
        selectedCategory={category}
        setSelectedCategory={setCategory}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
  <>
    <NutritionPanel product={selectedProduct} />
    <RecipeSuggestions product={selectedProduct} />
  </>
)}
    
    </div>
   
  );

}