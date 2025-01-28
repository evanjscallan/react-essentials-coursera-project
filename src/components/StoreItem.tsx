import React from "react";
import { Plant } from "../types/types";
import "./../App.css";
import { Link } from "react-router-dom";

interface Item {
  product: Plant;
  addToCart: (plant: Plant) => void;
  removeFromCart: (plantId: string) => void;
  getQuantity: (plantId: string) => number;
}

const StoreItem: React.FC<Item> = ({
  product,
  getQuantity,
  addToCart,
  removeFromCart,
}) => {
  return (
    <div className="item-box">
      <h3>{product.plant_name}</h3>
      <img src={product.webp} alt={product.plant_name} />
      <p>Price: ${product.price.toFixed(2)}</p>
      <div className="product-attr">
        <span className="price-quantity">
          <p>Quantity: {getQuantity(product.id)}</p>
          <span className="add-remove">
            <button
              disabled={getQuantity(product.id) == 0 ? true : false}
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

          <button onClick={() => addToCart(product)}>
            {" "}
            <Link className="links" to="/cart">
              Checkout
            </Link>{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreItem;
