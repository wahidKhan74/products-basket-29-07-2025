// store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    removeFromCart: (state, action) => {
        state.items.splice(action.payload, 1);
    }
  },
});

export const { addToCart ,clearCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
