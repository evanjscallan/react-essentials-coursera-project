import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HouseplantData } from "../types/types";

interface ProductsState {
  data: HouseplantData | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  data: null,
  loading: false,
  error: null,
};

// Normalize data helper
const normalizeData = (data: any): HouseplantData => {
  return {
    houseplants: data.houseplants.map((category: any) => ({
      ...category,
      plants: category.plants.map((plant: any) => ({
        ...plant,
        price: parseFloat(plant.price.replace("$", "")),
      })),
    })),
  };
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("./plant_data/product_data.json");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return normalizeData(data);
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export default productsSlice.reducer;
