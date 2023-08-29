import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    showCart: false,
  },
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (existingItem) => existingItem.id === newItem.id
      );

      if (existingItem) {
        existingItem.quantity ++;
        existingItem.totalPrice=existingItem.totalPrice+newItem.price
      } else {
        state.items.push({ 
            itemId:newItem.id,
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

      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(
            (existingItem) => existingItem.id !== id
          );
        } else {
          existingItem.quantity -= 1;
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
