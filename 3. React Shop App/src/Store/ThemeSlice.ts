import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadTheme } from "../util/CartStorage";

const initialState = loadTheme() ? loadTheme() : "dark";

export const ThemeSlice = createSlice({
  name: "Theme",
  initialState,
  reducers: {
    themeChangeFunc: (state, action: PayloadAction<string>) => {
      state = action.payload;
      localStorage.setItem("cart-theme", action.payload);

      return state;
    },
  },
});

export const { themeChangeFunc } = ThemeSlice.actions;

export const ShopThemeReducer = ThemeSlice.reducer;
