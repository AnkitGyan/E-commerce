import { createSlice, createAsyncThunk, isFulfilled } from "@reduxjs/toolkit";
import axios from "axios";

createAsyncThunk("product/getProduct", async (__, {rejectwithValue})=>{
  try{
    const link = '/api/v1/products';
    const data = await axios.get(link);
    console.log("data :", data);
  }catch(err){
    return rejectwithValue(err.response.data || "An error occured")
  }
})

const productSlice = createSlice({
  name : "product",
  initialState :{
    products : [],
    productCount : 0,
    loading: false,
    error : null
  } ,
  reducers : {
    removeEorrors : (state)=>{
      state.error = null;
    }
  },
  extraReducers : (builder)=>{
   builder.addCase(getProduct, isPending, (state)=>{
    state.loading = true;
    state.error = null
   })
   .addCase(getProduct, isFulfilled, (state, actions)=>{
    console.log('Fullfilled action payload', actions.payload);
     state.loading = false;
    state.error = null;
    state.products = actions.payload.products;
    state.productCount = actions.payload.productCount;
   })
   .addCase(getProduct.rejected, (state)=>{
    state.loading = false;
    state.error = action.payload || "Something went wrong";
   })
  }
})

export const {removeEorrors} = productSlice.actions;
export default productSlice.reducer;