import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Add item to cart
export const addItemsToCart = createAsyncThunk(
  "cart/addItemsToCart",
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/product/${id}`);
      return {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0]?.url,
        stock: data.product.stock,
        quantity,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Failed to add item to cart",
        }
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    cartItems: [],
    loading: false,
    error: null,
    success: false,
    message: null,
  },

  reducers: {
    removeError: (state) => {
      state.error = null;
    },

    removeMessage: (state) => {
      state.message = null;
    },

    removeCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product !== action.payload
      );

      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.cartItems)
      );
    },

    clearCart: (state) => {
      state.cartItems = [];

      localStorage.setItem("cartItems", JSON.stringify([]));
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addItemsToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addItemsToCart.fulfilled, (state, action) => {
        state.loading = false;

        const item = action.payload;

        const existItem = state.cartItems.find(
          (i) => i.product === item.product
        );

        if (existItem) {
          state.cartItems = state.cartItems.map((i) =>
            i.product === existItem.product ? item : i
          );
        } else {
          state.cartItems.push(item);
        }

        localStorage.setItem(
          "cartItems",
          JSON.stringify(state.cartItems)
        );

        state.success = true;
        state.message = `${item.name} is added to cart`;
      })

      .addCase(addItemsToCart.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "An error occurred";
      });
  },
});

export const {
  removeError,
  removeMessage,
  removeCartItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
