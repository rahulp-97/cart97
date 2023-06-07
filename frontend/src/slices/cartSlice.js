import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

//createSlice--
//A function that accepts an initial state, an object full of reducer functions,
//and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state.

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod:'PayPal' };


const cartSlice = createSlice({
    name:'cart',
    initialState: initialState,
    reducers: {
        //  add to cart
        addToCart: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find((p) => p._id === item._id);
            if(existItem){
                state.cartItems = state.cartItems.map((p) => p._id === existItem._id ? item : p)
            }
            else {
                //state are immutable that's why push is not used.
                state.cartItems = [...state.cartItems, item]
            }
            return updateCart(state);
        },
        // remove from cart
        removeFromCart: (state, action) => {
            state.cartItems= state.cartItems.filter((p) => p._id !== action.payload);

            return updateCart(state);
        },
        // shipping address
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            return updateCart(state);
        }
    }
});

export const {addToCart, removeFromCart, saveShippingAddress} = cartSlice.actions;
export default cartSlice.reducer;