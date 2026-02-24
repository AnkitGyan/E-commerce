import { createSlice, createAsyncThunk, isFulfilled } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk("product/getProduct", async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/products");
      console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "An error occurred"
      );
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    productCount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.products;
        state.productCount = action.payload.productCount;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {removeEorrors} = productSlice.actions;
export default productSlice.reducer;