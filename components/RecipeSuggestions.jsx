import { Clock, ChefHat } from "lucide-react";

export default function RecipeSuggestions({ product }) {
  return (
    <section className="panel">
      <div className="flex items-center gap-2 mb-5">
        <ChefHat className="text-green-400" size={25} />

        <div>
          <h2 className="text-xl font-bold">
            What Can You Cook?
          </h2>

          <p className="muted-text text-xs">
            Recipes using {product.name}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {product.recipes.map((recipe, index) => (
          <div key={recipe.name} className="recipe-card">
            <div className="flex justify-between items-center">
              <h3 className="font-bold">
                {recipe.name}
              </h3>

              <span className="recipe-time">
                <Clock size={13} />
                {recipe.time}
              </span>
            </div>

            <p className="text-xs text-green-500 mt-3 font-semibold">
              INGREDIENTS
            </p>

            <p className="text-sm muted-text mt-1">
              {recipe.ingredients}
            </p>

            <p className="text-xs text-green-500 mt-3 font-semibold">
              PREPARATION
            </p>

            <p className="text-sm muted-text mt-1">
              {recipe.steps}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}