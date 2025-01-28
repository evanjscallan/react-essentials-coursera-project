import React from "react";
import { CartItem, Plant } from "../types/types";
import { Link } from "react-router-dom";

interface ShoppingCartItemsProps {
  userCart: CartItem[];
  itemTotal: number;
  addToCart: (plantId: Plant) => void;
  removeFromCart: (plantId: string) => void;
  getQuantity: (plantId: string) => number;
}

const ShoppingCartPage: React.FC<ShoppingCartItemsProps> = ({
  userCart,
  itemTotal,
  addToCart,
  removeFromCart,
  getQuantity,
}) => {
  const handleClick = () => {
    alert(
      "Submitted. Shipping will take 1-7 business days. Please be patient."
    );
  };
  return (
    <div className="checkout-page checkout-page-bg">
      <div className="checkout-page-items">
        <h2>Shopping Cart</h2>
        <div>
          {userCart.length > 0 ? (
            userCart.map((chosenItem) => (
              <div className="item-checkout">
                <h3>{chosenItem.plant_name}</h3>
                <p>Quantity: {getQuantity(chosenItem.id)}</p>
                <div className="cart-more-less">
                  <button onClick={() => removeFromCart(chosenItem.id)}>
                    -
                  </button>
                  <button onClick={() => addToCart(chosenItem)}>+</button>
                </div>
              </div>
            ))
          ) : (
            <div>
              {" "}
              Empty Cart.{" "}
              <Link to="/plants">
                <p className="link">Browse our plants.</p>
              </Link>{" "}
            </div>
          )}
          {userCart.length > 0 ? (
            <div>Total: ${itemTotal.toFixed(2)} </div>
          ) : (
            ""
          )}
        </div>
        <button onClick={handleClick} className="submit">
          Submit
        </button>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
