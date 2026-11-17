const categories = [
  { name: "All", icon: "🛒" },
  { name: "Fruits", icon: "🍎" },
  { name: "Vegetables", icon: "🥦" },
  { name: "Dairy", icon: "🥛" },
  { name: "Dry Fruits", icon: "🥜" },
  { name: "Grains", icon: "🌾" }
];

export default function CategoryList({
  selectedCategory,
  setSelectedCategory
}) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-3">
      {categories.map((category) => (
        <button
          key={category.name}
          onClick={() => setSelectedCategory(category.name)}
          className={`category-button ${
            selectedCategory === category.name
              ? "category-active"
              : ""
          }`}
        >
          <span>{category.icon}</span>
          {category.name}
        </button>
      ))}
    </div>
  );
}