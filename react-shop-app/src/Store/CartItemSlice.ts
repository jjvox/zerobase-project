import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadCart, newCartItem } from "../util/CartStorage";

interface cartItemType {
  cartItem: newCartItem[];
}

const initialState: cartItemType = {
  cartItem: loadCart(),
};

export const CartItemSlice = createSlice({
  name: "cartItem",
  initialState,
  reducers: {
    cartItemFunc: (state, action: PayloadAction<newCartItem>) => {
      if (!action.payload) return;

      if (state.cartItem.length !== 0) {
        state.cartItem.find((item, idx) =>
          item.id === action.payload.id
            ? (item.count += action.payload.count)
            : state.cartItem.length - 1 === idx
            ? (state.cartItem = [...state.cartItem, action.payload])
            : ""
        );
      } else {
        state.cartItem = [action.payload];
      }

      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
    },
    cartItemRemoveFunc: (state, action: PayloadAction<{ id: string }>) => {
      state.cartItem = state.cartItem.filter(
        (item) => item.id !== action.payload.id
      );
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
    },
    cartItemRemoveAllFunc: (state, action: PayloadAction) => {
      state.cartItem = [];
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
    },
  },
});

export const { cartItemFunc, cartItemRemoveFunc, cartItemRemoveAllFunc } =
  CartItemSlice.actions;

export const CartItemReducer = CartItemSlice.reducer;
