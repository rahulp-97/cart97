import { createSlice } from "@reduxjs/toolkit";

//createSlice--
//A function that accepts an initial state, an object full of reducer functions,
//and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state.

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const addDecimals = (num) => {
    return Math.round(num).toFixed(2);
}

const cartSlice = createSlice({
    name:"cart",
    initialState: initialState,
    reducers: {
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
            //items price
            state.itemsPrice = addDecimals(
                state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
                // accumulator's value=0 is passed as an argument
            );
            //shipping price (total items price is > rs.10000 then free else rs.100)
            state.shippingPrice = addDecimals(state.itemsPrice > 10000 ? 0 : 100);
            //tax price
            state.taxPrice = addDecimals(Number(state.itemsPrice * 0.15).toFixed(2));
            //total price
            state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2);

            localStorage.setItem('cart', JSON.stringify(state));    //takes key:string and value pair.
            // key:'cart', value: state
        }
    }
});

export const {addToCart} = cartSlice.actions;
export default cartSlice.reducer;