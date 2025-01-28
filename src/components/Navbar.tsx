import { Link } from "react-router-dom";
import "../App.css";
import React, { useState, useEffect } from "react";
import CartIcon from "./CartIcon";

interface NavbarProps {
  itemTotal: number;
}

const Navbar: React.FC<NavbarProps> = ({ itemTotal }) => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const handleCartClick = (e: any) => {
    e.preventDefault();
    // You can use your routing logic here, for example:
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (prevScrollPos > currentScrollPos) {
        // Scrolling up
        setShowNavbar(true);
      } else {
        // Scrolling down
        setShowNavbar(false);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <nav className={`nav-bar ${showNavbar ? "show" : "hide"}`}>
      <span className="home">
        <Link className="links" to="/">
          Home
        </Link>
      </span>
      <span className="plants">
        <Link className="links" to="/plants">
          Plants
        </Link>
      </span>
      <span className="cart-icon">
        <Link className="links cart-icon" to="/cart">
          <CartIcon itemCount={itemTotal} onClick={() => handleCartClick} />
        </Link>
      </span>
    </nav>
  );
};

export default Navbar;
