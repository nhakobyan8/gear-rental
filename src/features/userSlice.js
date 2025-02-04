import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signIn } from 'next-auth/react';

export const fetchUserProfile = createAsyncThunk('users/fetchUserProfile', async (userId, { rejectWithValue }) => {
   try {
      const response = await fetch("/api/user");
      if (!response.ok) throw new Error('Failed to fetch user profile');
      return await response.json();
   } catch (error) {
      return rejectWithValue(error.message);
   }
});

export const changeUserPassword = createAsyncThunk("users/changeUserPassword", async ({ currentPassword, newPassword }, { rejectWithValue }) => {
   try {
      const response = await fetch("/api/user/change-password", {
         method: "PUT",
         body: JSON.stringify({ currentPassword, newPassword }),
         headers: {
            "Content-Type": "application/json",
         },
      });

      const data = await response.json();

      if (!response.ok) {

         return rejectWithValue(data.message || "Failed to change password");
      }

      return data;
   } catch (error) {
      return rejectWithValue(error.message || "An unknown error occurred");
   }
});


export const updateUserProfile = createAsyncThunk('users/updateUserProfile', async ({ username }, { rejectWithValue }) => {
   try {
      const response = await fetch("/api/user", {
         method: 'PUT',
         body: JSON.stringify({ username }),
         headers: {
            'Content-Type': 'application/json',
         },
      });
      if (!response.ok) throw new Error('Failed to update user profile');
      return await response.json();
   } catch (error) {
      return rejectWithValue(error.message);
   }
});

export const registerUser = createAsyncThunk('users/registerUser', async (userData, { rejectWithValue }) => {
   try {
      const response = await fetch('/api/auth/register', {
         method: 'POST',
         body: JSON.stringify(userData),
         headers: {
            'Content-Type': 'application/json',
         },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Registration failed');
      return data;
   } catch (error) {
      return rejectWithValue(error.message);
   }
});

export const loginUser = createAsyncThunk('users/loginUser', async (credentials, { rejectWithValue }) => {
   try {
      const response = await signIn('credentials', {
         redirect: false,
         email: credentials.email,
         password: credentials.password,
      });

      if (!response.ok) throw new Error(response.error || 'Login failed');
      return response;
   } catch (error) {
      return rejectWithValue(error.message);
   }
});

const userSlice = createSlice({
   name: 'users',
   initialState: {
      profile: {},
      loading: false,
      error: null,
      passwordChangeSuccess: false,
   },
   reducers: {
      resetError(state) {
         state.error = null;
      },
      resetPasswordChangeSuccess(state) {
         state.passwordChangeSuccess = false;
      },
   },
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
            state.error = action.payload;
         })
         .addCase(updateUserProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(updateUserProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.profile = action.payload;
         })
         .addCase(updateUserProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })
         .addCase(changeUserPassword.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.passwordChangeSuccess = false;
         })
         .addCase(changeUserPassword.fulfilled, (state) => {
            state.loading = false;
            state.passwordChangeSuccess = true;
         })
         .addCase(changeUserPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })
         .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(registerUser.fulfilled, (state) => {
            state.loading = false;
         })
         .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })
         .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.profile = action.payload.user;
         })
         
   },
});

export const { resetError, resetPasswordChangeSuccess } = userSlice.actions;
export default userSlice.reducer;
