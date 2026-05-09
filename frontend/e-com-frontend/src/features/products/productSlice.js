import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (_, { rejectWithValue }) => {
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

export const getProductDetails = createAsyncThunk("product/getProductDetails", async (id, {
  rejectWithValue,
})=>{
  try{
    const { data } = await axios.get(`/api/v1/product/${id}`);
    return data;
  } catch(err){
    return rejectWithValue(
      err.response?.data || "An error occured"
    )
  }
})

const productSlice = createSlice({
  name: "product",

  initialState: {
    products: [],
    productCount: 0,
    loading: false,
    error: null,
    product: null,
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
        state.productCount = action.payload.productCount;
      })

      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload?.error || "Failed to fetch products";
      })

      .addCase(getProductDetails.pending, (state)=>{
        state.loading = true;
      })

      .addCase(getProductDetails.fulfilled, (state, action)=>{
        console.log("Product details fetced successfully", action.payload);
        state.loading = false;
        state.error = null;
        state.product = action.payload.product;
      })

      .addCase(getProductDetails.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload?.error || "Failed to fetch product details";
      })
  },
});

export const { removeErrors } = productSlice.actions;

export default productSlice.reducer;