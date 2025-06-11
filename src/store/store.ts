import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./filter/filterSlice";
import cartSlice from "./cart/cartSlice";
import productsSlice from "./product/productsSlice";

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    cart: cartSlice,
    products: productsSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
