import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/authSlice";

export const store = configureStore({
  reducer: {
    auth: userReducer,
  },
});
