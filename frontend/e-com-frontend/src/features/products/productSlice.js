import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;


export const getProduct = createAsyncThunk(
  "product/getProduct",
  async ({ keyword = "", page = 1, category = "" }, { rejectWithValue }) => {
    try {
     let link='/api/v1/products?page='+page;
        if(category){
            link+=`&category=${category}`;
        }
        if(keyword){
            link+=`&keyword=${keyword}`;
        }
    //     const link=keyword?`/api/v1/products?keyword=${encodeURIComponent(keyword)}&page=${page}`:
    // `/api/v1/products?page=${page}`;
        const {data}=await axios.get(link)
        return data
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

// Submit Review
export const createReview=createAsyncThunk('product/createReview',async({rating,comment,productId},{rejectWithValue})=>{
    try{
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        
        const {data}=await axios.put('/api/v1/product/review',{rating,comment,productId},config);
        return data;
    }catch(error){
        return rejectWithValue(error.response?.data || 'An error occurred')
    }
});


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
    reviewSuccess:false,
    reviewLoading:false
  },

  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeSuccess:(state)=>{
        state.reviewSuccess=false
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

    builder.addCase(createReview.pending,(state)=>{
        state.reviewLoading=true;
        state.error=null
    })
    .addCase(createReview.fulfilled,(state,action)=>{
        state.reviewLoading=false;
        state.reviewSuccess=true;
    })
    .addCase(createReview.rejected,(state,action)=>{
        state.reviewLoading=false;
        state.error=action.payload ||'Something went wrong'
       
        
    })
  },
});

export const { removeErrors, removeSuccess } = productSlice.actions;

export default productSlice.reducer;