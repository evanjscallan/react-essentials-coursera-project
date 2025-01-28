import React from "react";
import { ShoppingCart } from "lucide-react";

interface CartIconProps {
  itemCount: number;
  onClick: () => void;
}

const CartIcon: React.FC<CartIconProps> = ({ itemCount, onClick }) => {
  return (
    <button onClick={onClick} className="cart-icon" aria-label="Shopping Cart">
      <ShoppingCart />
      {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
    </button>
  );
};

export default CartIcon;
