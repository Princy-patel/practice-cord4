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

    updateQuantity: (state, actions) => {
      return {
        product: state.product.map((product) => {
          if (product.id === actions.payload.id) {
            return {
              ...product,
              quantity: actions.payload.quantity,
            };
          }
          return product;
        }),
      };
    },

    deleteProduct: (state, actions) => {
      return {
        product: state.product.filter(
          (product) => product.id !== actions.payload.id
        ),
      };
    },
  },
});

export const { addProducts, updateQuantity, deleteProduct } = productSlice.actions;

export default productSlice.reducer;
