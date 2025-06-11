import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type Status = "loading" | "completed" | "error";

interface ProductsState {
  items: Product[];
  status: Status;
}

type FetchProductsParams = {
  orderBy: string;
  order: string;
  category?: number;
};

export const fetchProducts = createAsyncThunk<Product[], FetchProductsParams>(
  "products/fetchProducts",
  async (params) => {
    const response = await axios<Product[]>(
      "https://68074860e81df7060eb986cf.mockapi.io/products",
      { params }
    );
    return response.data;
  }
);

const initialState: ProductsState = {
  items: [],
  status: "loading",
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.status = "loading";
      state.items = [];
    });

    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.items = action.payload;
        state.status = "completed";
      }
    );

    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = "error";
      state.items = [];
    });
  },
});

export const { setItems } = productsSlice.actions;

export default productsSlice.reducer;
