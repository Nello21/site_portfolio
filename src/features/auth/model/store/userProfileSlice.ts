import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchUser } from './effects';
import { cinemaData } from 'shared/types/cinemaData';

type User = {
  id: number | null;
  fullName: string | null;
  email: string | null;
  avatar: string | null;
  favorites_movies: cinemaData[];
};

type UserSliceState = {
  user: User;
  isLoading: boolean;
  error: string | null;
};

const initialState: UserSliceState = {
  user: {
    id: null,
    fullName: null,
    email: null,
    avatar: null,
    favorites_movies: [],
  },
  isLoading: false,
  error: null,
};

export const userProfileSlice = createSlice({
  name: 'userProfileData',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUserStore: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Что-то пошло не так';
      });
  },
  selectors: {
    getUserIsLoading: state => state.isLoading,
    getUserProfile: state => state.user,
  },
});

export const userActions = userProfileSlice.actions;

export const { getUserProfile, getUserIsLoading } = userProfileSlice.selectors;
