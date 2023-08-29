import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity:0,
    showCart: false,
  },
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (existingItem) => existingItem.id === newItem.id
      );
        state.totalQuantity++;
      if (existingItem) {
        existingItem.quantity ++;
        existingItem.totalPrice=existingItem.totalPrice+newItem.price
      } else {
        state.items.push({ 
            id:newItem.id,
            price:newItem.price,
            quantity:1,
            totalPrice:newItem.price,
            name:newItem.title
         });
      }
    },
    removeItem(state, action) {
        const id = action.payload;
        const existingItem = state.items.find(
          (existingItem) => existingItem.id === id
        );
        state.totalQuantity--;
        if (existingItem) {
          if (existingItem.quantity === 1) {
            // Remove the item from the cart
            state.items = state.items.filter(
              (item) => item.id !== id
            );
          } else {
            // Decrement the quantity by 1
            existingItem.quantity--;
            existingItem.totalPrice =existingItem.totalPrice- existingItem.price; // Adjust total price
          }
        }
      },
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
