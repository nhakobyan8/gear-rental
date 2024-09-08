import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const getCartFromCookies = () => {
  const cart = Cookies.get('cartItems');
  return cart ? JSON.parse(cart) : [];
};

const saveCartToCookies = (items) => {
  Cookies.set('cartItems', JSON.stringify(items));
};

const initialState = {
  items: getCartFromCookies(),
  totalAmount: getCartFromCookies().reduce((total, item) => total + item.totalPrice, 0),
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
          availableQuantity: newItem.availableQuantity,
        });
        state.totalAmount += newItem.price;
      } else {
        if (existingItem.quantity < existingItem.availableQuantity) {
          existingItem.quantity++;
          existingItem.totalPrice += newItem.price;
          state.totalAmount += newItem.price;
        } else {
          alert("No more items available in stock.");
        }
      }

      saveCartToCookies(state.items);
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item._id === id);

      if (existingItem) {
        state.totalAmount -= existingItem.totalPrice;
        state.items = state.items.filter(item => item._id !== id);
        saveCartToCookies(state.items);
      }
    },
    increaseQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item._id === id);

      if (existingItem) {
        if (existingItem.quantity < existingItem.availableQuantity) {
          existingItem.quantity++;
          existingItem.totalPrice += existingItem.price;
          state.totalAmount += existingItem.price;
        } else {
          alert("No more items available in stock.");
        }
        saveCartToCookies(state.items);
      }
    },
    decreaseQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item._id === id);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
        state.totalAmount -= existingItem.price;
        saveCartToCookies(state.items);
      }
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