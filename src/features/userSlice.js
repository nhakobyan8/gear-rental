import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Асинхронные действия для работы с профилем пользователя
export const fetchUserProfile = createAsyncThunk('users/fetchUserProfile', async () => {
   const response = await fetch('/api/user/profile');
   return response.json();
});

export const updateUserProfile = createAsyncThunk('users/updateUserProfile', async (userData) => {
   const response = await fetch('/api/user/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
      headers: {
         'Content-Type': 'application/json',
      },
   });
   return response.json();
});

const userSlice = createSlice({
   name: 'users',
   initialState: {
      profile: {},
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchUserProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.profile = action.payload;
         })
         .addCase(fetchUserProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
         })
         .addCase(updateUserProfile.fulfilled, (state, action) => {
            state.profile = action.payload;
         });
   },
});

export default userSlice.reducer;
