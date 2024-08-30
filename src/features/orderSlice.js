import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserOrders = createAsyncThunk('orders/fetchUserOrders', async (_, { rejectWithValue }) => {
   try {
      const response = await fetch(`/api/user/orders`);

      if (!response.ok) {
         throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      return data.data || [];  // Возвращаем пустой массив, если данных нет
   } catch (error) {
      return rejectWithValue(error.message);
   }
});

export const createOrder = createAsyncThunk('orders/createOrder', async (newOrderData, { rejectWithValue }) => {
   try {
      const response = await fetch('/api/user/orders', {
         method: 'POST',
         body: JSON.stringify(newOrderData),
         headers: {
            'Content-Type': 'application/json',
         },
      });

      if (!response.ok) {
         throw new Error('Failed to create order');
      }

      const data = await response.json();
      return data.data;  // Предполагаем, что 'data' содержит созданный заказ
   } catch (error) {
      return rejectWithValue(error.message);
   }
});

const orderSlice = createSlice({
   name: 'orders',
   initialState: {
      orders: [],
      loading: false,
      error: null,
   },
   reducers: {
      resetError(state) {
         state.error = null;
      },
   },
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
            state.error = action.payload || 'Failed to fetch orders';
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
            state.error = action.payload || 'Failed to create order';
         });
   },
});

export const { resetError } = orderSlice.actions;
export default orderSlice.reducer;
