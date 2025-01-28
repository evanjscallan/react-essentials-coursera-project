import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import data from "./plant_data/product_data.json";
import "./App.css";
import HomePage from "./components/HomePage";
import ShoppingCartPage from "./components/ShoppingCartPage";
import ProductListingPage from "./components/ProductListingPage";
import Navbar from "./components/Navbar";
import { HouseplantData } from "./types/types";
import { CartItem, Category as CategoryType, Plant } from "./types/types";
import { useState, useEffect, createContext } from "react";

// Normalize JSON data to convert price to number
const normalizeData = (data: any): HouseplantData => {
  return {
    houseplants: data.houseplants.map((category: any) => ({
      ...category,
      plants: category.plants.map((plant: any) => ({
        ...plant,
        price: parseFloat(plant.price.replace("$", "")), // Convert price to number
      })),
    })),
  };
};

const plantData: HouseplantData = normalizeData(data);

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    let idArray = [];
    const total = cart.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
    setTotalPrice(total);
    const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    setTotalItems(totalItemCount);
    for (let i = 0; i < cart.length; i++) {
      idArray.push(cart[i].id);
    }
    if (cart.length === 0) {
      console.log("Empty Cart.");
    } else {
      console.log(`total price: ${totalPrice}`);
    }
  }, [cart, totalPrice]);

  const getQuantity = (plantId: string): number => {
    const item = cart.find((cartItem) => cartItem.id === plantId);
    return item ? item.quantity : 0;
  };

  const getTotalQuantity = (plantId: string): any => {
    const totalArr = [];

    const item2 = cart.find((cartItem) => cartItem.id === plantId);
    totalArr.push(item2);
    console.log(`Amount of items: ${totalArr.length}`);
  };

  const addToCart = (plant: Plant) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === plant.id);
      console.log(`item found! ${plant.id}`);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === plant.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...plant, quantity: 1 }];
    });
  };

  const removeFromCart = (plantId: string) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === plantId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <>
      <Router>
        <Navbar itemTotal={totalItems} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/plants"
            element={
              <ProductListingPage
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                getQuantity={getQuantity}
                allPlantProducts={plantData}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <ShoppingCartPage
                userCart={cart}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                getQuantity={getQuantity}
                itemTotal={totalPrice}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
