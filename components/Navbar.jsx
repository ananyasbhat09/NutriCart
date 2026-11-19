
"use client";

import { useCart } from "../app/context/CreateContext";
import { useState, useEffect } from "react";
import Link from "next/link";

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
  cartCount
}) {
  const { theme, setTheme } = useCart();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserName(localStorage.getItem("nutricartUser") || "");
  }, []);

  return (
    <nav className="navbar">
      <Link href="/" className="flex items-center gap-2">
        <div className="logo-icon">
          <Leaf size={23} />
        </div>

        <h1 className="text-2xl font-bold">
          Nutri<span className="text-green-500">Cart</span>
        </h1>
      </Link>
      <div className="flex items-center gap-4 font-semibold">
  <Link href="/">Home</Link>
  <Link href="/products">Products</Link>
  <Link href="/nutrition">Nutrition</Link>
  <Link href="/recipes">Recipes</Link>
</div>
      <div className="search-box">
        <Search size={18} />

        <input
          type="text"
          placeholder="Search groceries..."
          value={search || ""}
          onChange={(e) => setSearch?.(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-5">
        {userName ? (
          <div className="flex items-center gap-3">
            <span className="font-semibold text-green-700">
              Hi, {userName}!
            </span>

            <button
              onClick={() => {
                localStorage.removeItem("nutricartUser");
                setUserName("");
              }}
              className="text-red-500 font-semibold hover:text-red-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="font-semibold text-green-700 hover:text-green-500"
          >
            Login
          </Link>
        )}

        <button
          onClick={() =>
            setTheme?.(theme === "dark" ? "light" : "dark")
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

        <Link
          href="/cart"
          className="relative icon-button"
          aria-label="Open shopping cart"
        >
          <ShoppingCart size={25} />
          <span className="cart-badge">{cartCount || 0}</span>
        </Link>
      </div>
    </nav>
  );
}
