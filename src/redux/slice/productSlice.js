import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts: (state, actions) => {
      const existingProduct = state.product.find(
        (product) => product.id === actions.payload.id
      );

      if (existingProduct) {
        return {
          product: state.product.map((product) =>
            product.id === actions.payload.id
              ? { ...product, quantity: product.quantity + 1 }
              : product
          ),
        };
      }

      return {
        product: [...state.product, { ...actions.payload, quantity: 1 }],
      };
    },
  },
});

export const { addProducts } = productSlice.actions;

export default productSlice.reducer;
