import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { CartItemReducer } from "./CartItemSlice";
import { productReducer } from "./ProductSlice";
import { ShopThemeReducer } from "./ThemeSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    cartItem: CartItemReducer,
    shopTheme: ShopThemeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
