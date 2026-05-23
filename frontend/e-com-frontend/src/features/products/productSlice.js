import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async ({keyword, page=1}, { rejectWithValue }) => {
    try {
   const link = keyword ? (`/api/v1/products?keyword=${encodeURIComponent(keyword)}&page=${page}`) : (`/api/v1/products?page=${page}`);
     const response = await axios.get(link); 

      console.log(response.data);

      return response.data;
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
    resultsPerPage : 4,
    totalPages : 0,
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
        state.resultsPerPage = action.payload.resultsPerPage;
        state.totalPages = Math.ceil(action.payload.productCount/ action.payload.resultsPerPage);
      })

      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.error || "Failed to fetch products";
        state.products = [];
        state.productCount = 0;
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