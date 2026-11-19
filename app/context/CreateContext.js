
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [theme, setTheme] = useState("light");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("nutricartCart");
    const savedTheme = localStorage.getItem("nutricartTheme");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    if (savedTheme) {
      setTheme(savedTheme);
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("nutricartCart", JSON.stringify(cart));
      localStorage.setItem("nutricartTheme", theme);
    }
  }, [cart, theme, loaded]);

  const addToCart = (product) => {
    setCart((previousCart) => [...previousCart, product]);
  };

  const removeFromCart = (index) => {
    setCart((previousCart) =>
      previousCart.filter((_, i) => i !== index)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        theme,
        setTheme,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
