import { Activity, Info } from "lucide-react";

export default function NutritionPanel({ product }) {
  const nutrients = [
    { name: "Protein", value: product.protein, unit: "g" },
    { name: "Carbohydrates", value: product.carbs, unit: "g" },
    { name: "Fat", value: product.fat, unit: "g" },
    { name: "Fibre", value: product.fibre, unit: "g" },
    { name: "Sugar", value: product.sugar, unit: "g" }
  ];

  const statusColor =
    product.health === "Nutrient-rich"
      ? "text-green-400"
      : "text-yellow-400";

  return (
    <section className="panel">
      <div className="flex justify-between items-center">
        <div>
          <p className="muted-text text-sm">
            NUTRITION INSIGHTS
          </p>

          <h2 className="text-2xl font-bold mt-1">
            {product.name}
          </h2>
        </div>

        <div className="text-4xl">
          {product.image}
        </div>
      </div>

      <div className="calorie-box mt-5">
        <Activity className="text-green-400" />

        <div>
          <p className="muted-text text-sm">
            Calories
          </p>

          <h2 className="text-3xl font-bold">
            {product.calories}
            <span className="text-sm font-normal">
              {" "}kcal
            </span>
          </h2>
        </div>

        <span className="ml-auto text-xs muted-text">
          Per 100 g/ml
        </span>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-4">
          Nutrient Breakdown
        </h3>

        {nutrients.map((item) => (
          <div key={item.name} className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span>{item.name}</span>

              <span className="font-semibold">
                {item.value}{item.unit}
              </span>
            </div>

            <div className="nutrient-track">
              <div
                className="nutrient-fill"
                style={{
                  width: `${
                    Math.min(
                      (item.value / 70) * 100,
                      100
                    )
                  }%`
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="health-box mt-6">
        <div className="flex gap-2 items-center">
          <Activity className={statusColor} />

          <h3 className="font-semibold">
            Nutritional Assessment
          </h3>
        </div>

        <p className={`font-bold mt-2 ${statusColor}`}>
          {product.health}
        </p>

        <p className="text-sm muted-text mt-2">
          {product.description}
        </p>
      </div>

      <div className="flex gap-2 mt-4 text-xs muted-text">
        <Info size={16} className="shrink-0" />

        <p>
          Approximate values. Nutritional suitability depends
          on serving size and individual dietary needs.
        </p>
      </div>
    </section>
  );
}