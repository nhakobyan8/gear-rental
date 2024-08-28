import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserOrders = createAsyncThunk('orders/fetchUserOrders', async () => {
   const response = await fetch('/api/orders', {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      },
   });

   if (!response.ok) {
      throw new Error('Failed to fetch orders');
   }

   const data = await response.json();
   return data.data;
});

export const createOrder = createAsyncThunk('orders/createOrder', async (orderData) => {
   const response = await fetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
      headers: {
         'Content-Type': 'application/json',
      },
   });

   if (!response.ok) {
      throw new Error('Failed to create order');
   }

   const data = await response.json();
   return data.data;
});

const orderSlice = createSlice({
   name: 'orders',
   initialState: {
      orders: [],
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchUserOrders.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchUserOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
         })
         .addCase(fetchUserOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
         })
         .addCase(createOrder.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(createOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.orders.push(action.payload);
         })
         .addCase(createOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
         });
   },
});

export default orderSlice.reducer;
