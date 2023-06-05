export const addDecimals = (num) => {
  return Math.round(num).toFixed(2);
};

export const updateCart = (state) => {
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
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state)); //takes key:string and value pair.
  // key:'cart', value: state
  return state;
};