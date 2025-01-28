import React from "react";
import { Category as CategoryType, Plant } from "../types/types";
import StoreItem from "./StoreItem";
import { useAppSelector, useAppDispatch } from "../store/store";
import { addToCart, removeFromCart } from "../store/cartSlice";

interface ProductCategoryProps {
  categorySection: CategoryType;
}

const ProductCategory: React.FC<ProductCategoryProps> = ({
  categorySection,
}) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const getQuantity = (plantId: string): number => {
    const item = cartItems.find((item) => item.id === plantId);
    return item?.quantity || 0;
  };

  const handleAddToCart = (plant: Plant) => {
    dispatch(addToCart(plant));
  };

  const handleRemoveFromCart = (plantId: string) => {
    dispatch(removeFromCart(plantId));
  };

  return (
    <div className="category-page">
      <h2>{categorySection.category}</h2>
      <p>{categorySection.description}</p>
      <div className="products-container">
        {categorySection.plants.map((plant) => (
          <StoreItem
            key={plant.id}
            product={plant}
            removeFromCart={handleRemoveFromCart}
            addToCart={handleAddToCart}
            getQuantity={getQuantity}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCategory;
