import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import cartItemsSlice from "./slices/cartItemsSlice";

export const store = configureStore({
  reducer: {
    cartItems: cartItemsSlice,
    auth: authSlice,
  },
});
