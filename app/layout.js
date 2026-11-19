
import "./globals.css";
import { CartProvider } from "./context/CreateContext";

export const metadata = {
  title: "Nutri-Cart | Smart Grocery Shopping",
  description:
    "Shop smarter, understand nutrition and discover easy recipes."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
