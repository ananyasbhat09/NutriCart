import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero">
      <div className="max-w-xl">
        <div className="flex items-center gap-2 text-green-400 mb-4">
          <Sparkles size={18} />
          <span className="text-sm font-semibold">
            SMARTER GROCERY SHOPPING
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Eat Better.
          <br />
          Shop Smarter.
          <br />
          <span className="text-green-400">
            Live Healthier.
          </span>
        </h1>

        <p className="mt-5 text-gray-300 leading-relaxed">
          Your everyday grocery store with a smart nutrition
          assistant. Discover nutrients, understand your food
          and explore delicious recipes.
        </p>

        <a href="#products" className="hero-button">
          Explore Groceries
          <ArrowRight size={18} />
        </a>
      </div>

      <div className="hero-emoji">
        🥑
      </div>
    </section>
  );
}