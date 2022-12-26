import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { productFetch, ProductsListType } from "../API/ApiFetch";

export const fetchProduct = createAsyncThunk("productList", async () => {
  const response = await productFetch();
  return response;
});

interface ProductState {
  product: ProductsListType[];
}

const initialState = {
  product: [],
} as ProductState;

const productSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.product = action.payload;
    });
  },
});

export const productReducer = productSlice.reducer;
