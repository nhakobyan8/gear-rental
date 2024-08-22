import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  items: Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')) : [],
  totalAmount: Cookies.get('cartItems')
    ? JSON.parse(Cookies.get('cartItems')).reduce((total, item) => total + item.totalPrice, 0) : 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item._id === newItem._id);
      if (!existingItem) {
        state.items.push({
          _id: newItem._id,
          name: newItem.name,
          imageUrl: newItem.imageUrl,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
      state.totalAmount += newItem.price;
      Cookies.set('cartItems', JSON.stringify(state.items));
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item._id === id);
      if (existingItem) {
        state.totalAmount -= existingItem.totalPrice;
        state.items = state.items.filter(item => item._id !== id);
      }
      Cookies.set('cartItems', JSON.stringify(state.items));
    },
    increaseQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item._id === id);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += existingItem.price;
        state.totalAmount += existingItem.price;
      }
      Cookies.set('cartItems', JSON.stringify(state.items));
    },
    decreaseQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item._id === id);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
        state.totalAmount -= existingItem.price;
      }
      Cookies.set('cartItems', JSON.stringify(state.items));
    },
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
      Cookies.remove('cartItems');
    },
  },
});

export const { addItemToCart, removeItemFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
