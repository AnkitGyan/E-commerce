import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import API from "../../../axios.js"

export const createOrder= createAsyncThunk('order/createOrder',async(order,{rejectWithValue})=>{
    try{
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const {data}=await API.post('/api/v1/order/new',order,config);
        return data;
        
    }catch(error){
        return rejectWithValue(error.response?.data || 'Order Creating Failed');
    }
})

//Get User Orders
export const getAllMyOrders= createAsyncThunk('order/getAllMyOrders',async(_,{rejectWithValue})=>{
    try{
        const {data}=await API.get('/api/v1/orders/me');
        return data;
    }catch(error){
        return rejectWithValue(error.response?.data || 'Failed to fetch orders')
    }
})


export const getOrderDetails= createAsyncThunk('order/getOrderDetails',async(orderID,{rejectWithValue})=>{
    try{
        const {data}=await API.get(`/api/v1/order/${orderID}`)
        return data;
    }catch(error){
        return rejectWithValue(error.response?.data || 'Failed to fetch order details')
    }
})

const orderSlice=createSlice({
    name:'order',
    initialState:{
        success:false,
        loading:false,
        error:null,
        orders:[],
        order:{}
    },
    reducers:{
        removeErrors:(state)=>{
            state.error=null
        },
        removeSuccess:(state)=>{
            state.success=null
        }
    },
   extraReducers: (builder) => {
    builder
        .addCase(createOrder.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.order = action.payload.order;
            state.success = action.payload.success;
        })
        .addCase(createOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'Order Creating Failed';
        })

        .addCase(getAllMyOrders.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAllMyOrders.fulfilled, (state, action) => {
            console.log("Orders received:", action.payload);
            state.loading = false;
            state.orders = action.payload.order;
            state.success = action.payload.success;
        })
        .addCase(getAllMyOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'Failed to fetch orders';
        })

        .addCase(getOrderDetails.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getOrderDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.order = action.payload.order;
            state.success = action.payload.success;
        })
        .addCase(getOrderDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'Failed to fetch order details';
        });
}
})
export const {removeErrors,removeSuccess}=orderSlice.actions;
export default orderSlice.reducer;