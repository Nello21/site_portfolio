import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import { postAuthData, postRegisterData } from './effects';

type User = {
  id: number | null;
  fullName: string | null;
  email: string | null;
  token: string | null;
  avatar: string | null;
  favorite_movies: number[] | null;
};

export type Review = {
  movies_data_id: number | null;
  user_id: number | null;
  review: string | null;
  rating: number | null;
};

type UserSliceState = {
  user: User;
  isLoading: boolean;
  registerStatus: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string | null;
};

const initialState: UserSliceState = {
  user: {
    id: null,
    fullName: null,
    email: null,
    token: null,
    avatar: null,
    favorite_movies: [],
  },
  isLoading: false,
  registerStatus: 'idle',
  error: null,
};

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setRegisterStatus: (state, action: PayloadAction<UserSliceState['registerStatus']>) => {
      state.registerStatus = action.payload;
    },
    clearUserStore: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(postAuthData.pending, state => {
        state.isLoading = true;
      })
      .addCase(postAuthData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(postAuthData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Что-то пошло не так';
      })
      .addCase(postRegisterData.pending, state => {
        state.isLoading = true;
        state.registerStatus = 'pending';
      })
      .addCase(postRegisterData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.registerStatus = 'fulfilled';
      })
      .addCase(postRegisterData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Что-то пошло не так';
        state.registerStatus = 'rejected';
      });
  },
  selectors: {
    getUserIsLoading: state => state.isLoading,
    getRegisterStatus: state => state.registerStatus,
    getUserToken: state => state.user.token,
    getUserId: state => state.user.id,
    getUser: state => state.user,
    getAuthUserFavorites: state => state.user.favorite_movies,
  },
});

export const userActions = userSlice.actions;

export const { getUser, getUserId, getUserIsLoading, getRegisterStatus, getUserToken, getAuthUserFavorites } =
  userSlice.selectors;
