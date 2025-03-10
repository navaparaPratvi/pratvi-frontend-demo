import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    selectedProduct: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const getSelectedProduct = (state) => state.product.products;

export const { selectedProduct } = productSlice.actions;

export default productSlice.reducer;
