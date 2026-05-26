import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getProduct = createAsyncThunk(
  "product/getProduct",
  async ({ keyword = "", page = 1 }, { rejectWithValue }) => {
    try {
      const link = keyword
        ? `/api/v1/products?keyword=${encodeURIComponent(
            keyword
          )}&page=${page}`
        : `/api/v1/products?page=${page}`;

      const { data } = await axios.get(link);

      console.log("Products fetched:", data);

      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "An error occurred"
      );
    }
  }
);


export const getProductDetails = createAsyncThunk(
  "product/getProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/product/${id}`);

      console.log("Product details fetched:", data);

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
    product: null,
    loading: false,
    error: null,
    productCount: 0,
    resultsPerPage: 0,
    totalPages: 0,
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
        state.error = null;
      })

      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products = action.payload.products;
        state.productCount = action.payload.totalProducts;
        state.resultsPerPage = action.payload.count;
        state.totalPages = action.payload.totalPage;
      })

      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload?.message ||
          action.payload ||
          "Failed to fetch products";

        state.products = [];
        state.productCount = 0;
        state.totalPages = 0;
      })

      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.product = action.payload.product;
      })

      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.payload ||
          "Failed to fetch product details";
      });
  },
});

export const { removeErrors } = productSlice.actions;

export default productSlice.reducer;