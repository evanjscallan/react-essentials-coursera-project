import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import data from "./plant_data/product_data.json";
import "./App.css";
import HomePage from "./components/HomePage";
import ShoppingCartPage from "./components/ShoppingCartPage";
import ProductListingPage from "./components/ProductListingPage";
import Navbar from "./components/Navbar";

import { HouseplantData } from "./types/types";
import { addToCart, removeFromCart } from "./store/cartSlice";

import { CartItem, Plant } from "./types/types";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppDispatch,
  RootState,
  useAppDispatch,
  useAppSelector,
} from "./store/store";
import { fetchProducts } from "./store/productsSlice";

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
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: plantData,
    loading,
    error,
  } = useSelector((state: RootState) => state.products);
  const {
    items: cart,
    totalPrice,
    totalItems,
  } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const getQuantity = (plantId: string): number => {
    const item = cart.find((cartItem) => cartItem.id === plantId);
    return item ? item.quantity : 0;
  };

  const handleAddToCart = (plant: Plant) => {
    dispatch(addToCart(plant));
  };

  const handleRemoveFromCart = (plantId: string) => {
    dispatch(removeFromCart(plantId));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!plantData) return null;

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
                addToCart={handleAddToCart}
                removeFromCart={handleRemoveFromCart}
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
                addToCart={handleAddToCart}
                removeFromCart={handleRemoveFromCart}
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
