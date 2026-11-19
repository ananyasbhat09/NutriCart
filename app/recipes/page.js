
"use client";

import { useState } from "react";
import { products } from "../../data/products";
import RecipeSuggestions from "../../components/RecipeSuggestions";
import { useCart } from "../context/CreateContext";

export default function RecipesPage() {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const { theme } = useCart();
  

  return (
    <div className="app-shell p-5" data-theme={theme}>
      <h1 className="text-3xl font-bold mb-2">
        Healthy Recipes
      </h1>

      <p className="text-gray-500 mb-6">
        Find delicious recipes using your favourite groceries.
      </p>

      <div className="flex flex-wrap gap-3 mb-8">
        {products.map((product) => (
          <button
            key={product.id || product.name}
            onClick={() => setSelectedProduct(product)}
            className={`px-4 py-2 rounded-lg border ${
              selectedProduct.name === product.name
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {product.name}
          </button>
        ))}
      </div>

      <RecipeSuggestions product={selectedProduct} />
    </div>
  );
}
