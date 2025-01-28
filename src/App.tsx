import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import HomePage from "./components/HomePage";
import ShoppingCartPage from "./components/ShoppingCartPage";
import ProductListingPage from "./components/ProductListingPage";
import Navbar from "./components/Navbar";
import { addToCart, removeFromCart } from "./store/cartSlice";

import { Plant } from "./types/types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import { fetchProducts } from "./store/productsSlice";

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
