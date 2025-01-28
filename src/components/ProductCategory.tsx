import { Category as CategoryType, Plant } from "../types/types";
import React from "react";
import StoreItem from "./StoreItem";

interface ProductCategoryProps {
  categorySection: CategoryType;
  addToCart: (plant: Plant) => void;
  removeFromCart: (plantId: string) => void;
  getQuantity: (plantId: string) => number;
}

const ProductCategory: React.FC<ProductCategoryProps> = ({
  categorySection,
  getQuantity,
  addToCart,
  removeFromCart,
}) => {
  return (
    <div className="category-page">
      <h2>{categorySection.category}</h2>
      <p>{categorySection.description}</p>
      <div className="products-container">
        {categorySection.plants.map((plant) => (
          <StoreItem
            key={plant.id}
            product={plant}
            removeFromCart={removeFromCart}
            addToCart={addToCart}
            getQuantity={getQuantity}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCategory;
