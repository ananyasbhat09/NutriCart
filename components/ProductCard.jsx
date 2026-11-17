import { useState } from "react";
import { Plus, Heart } from "lucide-react";

export default function ProductCard({
  product,
  onSelect,
  onAdd
}) {

  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div
      className="product-card"
      onClick={() => onSelect(product)}
    >
      <button
  className="favorite-button"
  onClick={(e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  }}
  aria-label={`Favorite ${product.name}`}
>
  <Heart
    size={18}
    fill={isFavorite ? "red" : "none"}
    color={isFavorite ? "red" : "currentColor"}
  />
</button>

      <div className="product-image">
        {product.image}
      </div>

      <p className="text-xs text-green-500 font-semibold">
        {product.category}
      </p>

      <h3 className="font-bold text-lg mt-1">
        {product.name}
      </h3>

      <p className="muted-text text-sm mt-1">
        {product.unit}
      </p>

      <div className="flex justify-between items-center mt-4">
        <span className="text-lg font-bold">
          ₹{product.price}
        </span>

        <button
          className="add-button"
          onClick={(e) => {
            e.stopPropagation();
            onAdd(product);
          }}
          aria-label={`Add ${product.name} to cart`}
        >
          <Plus size={20} />
        </button>
      </div>

      <button
        className="text-xs text-green-500 mt-3 hover:underline"
        onClick={(e) => {
          e.stopPropagation();
          onSelect(product);
        }}
      >
        View nutrition →
      </button>
    </div>
  );
}