import React from "react";
import { HouseplantData, Plant } from "../types/types";
import ProductCategory from "./ProductCategory";

interface PlantDataProps {
  allPlantProducts: HouseplantData;
  getQuantity: (plantId: string) => number;
  addToCart: (plant: Plant) => void;
  removeFromCart: (plantId: string) => void;
}

const ProductListingPage: React.FC<PlantDataProps> = ({ allPlantProducts }) => {
  return (
    <div className="products-outer">
      <div className="shopping-bg">
        <div className="our-plants">
          <h1>Our Plants</h1>
          <p>
            Discover our vibrant collection of plants, carefully nurtured to
            bring life and beauty to your spaces. From easy-care houseplants to
            unique botanical treasures, we have something for every plant lover.
            Let our greenery transform your home into a sanctuary.
          </p>
        </div>
        {allPlantProducts.houseplants.map((categoryItem, index) => (
          <div className="transparent-bg" key={index}>
            <ProductCategory categorySection={categoryItem} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListingPage;
