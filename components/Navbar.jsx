"use client";

import {
  ShoppingCart,
  Search,
  Moon,
  Sun,
  Leaf
} from "lucide-react";

export default function Navbar({
  search,
  setSearch,
  cartCount,
  theme,
  setTheme
}) {
  return (
    <nav className="navbar">
      <div className="flex items-center gap-2">
        <div className="logo-icon">
          <Leaf size={23} />
        </div>

        <h1 className="text-2xl font-bold">
          Nutri<span className="text-green-500">Cart</span>
        </h1>
      </div>

      <div className="search-box">
        <Search size={18} />

        <input
          type="text"
          placeholder="Search groceries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-5">
        <button
          onClick={() =>
            setTheme(theme === "dark" ? "light" : "dark")
          }
          className="icon-button"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun size={21} />
          ) : (
            <Moon size={21} />
          )}
        </button>

        <div className="relative">
          <ShoppingCart size={25} />

          <span className="cart-badge">
            {cartCount}
          </span>
        </div>
      </div>
    </nav>
  );
}