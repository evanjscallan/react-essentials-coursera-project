// src/components/StoreItem.tsx
import React from "react";
import { Plant } from "../types/types";
import "./../App.css";
import { Link } from "react-router-dom";

interface Item {
  product: Plant;
  getQuantity: (plantId: string) => number;
  addToCart: (plant: Plant) => void;
  removeFromCart: (plantId: string) => void;
}

const StoreItem: React.FC<Item> = ({
  product,
  getQuantity,
  addToCart,
  removeFromCart,
}) => {
  const quantity = getQuantity(product.id);

  const handleCheckout = () => {
    if (quantity > 0) {
      return;
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="item-box">
      <h3>{product.plant_name}</h3>
      <img src={product.webp} alt={product.plant_name} />
      <p>Price: ${product.price.toFixed(2)}</p>
      <div className="product-attr">
        <span className="price-quantity">
          <p>Quantity: {quantity}</p>
          <span className="add-remove">
            <button
              disabled={quantity === 0}
              onClick={() => removeFromCart(product.id)}
            >
              -
            </button>
            <button onClick={() => addToCart(product)}>+</button>
          </span>
        </span>
        <div className="add-proceed">
          <span>
            <button onClick={() => addToCart(product)}> Add to Cart </button>
          </span>
          <button onClick={() => handleCheckout()}>
            <Link className="links" to="/cart">
              Checkout
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};
export default StoreItem;
