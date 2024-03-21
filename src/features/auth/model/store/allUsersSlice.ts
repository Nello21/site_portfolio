import { createSlice } from '@reduxjs/toolkit';

import { fetchUser } from './effects';

type Users = {
  id: number | null;
  fullName: string | null;
  email: string | null;
  avatar: string | null;
};

type UserSliceState = {
  users: Users[];
  isLoading: boolean;
  error: string | null;
};

const initialState: UserSliceState = {
  users: [],
  isLoading: false,
  error: null,
};

export const allUserSlice = createSlice({
  name: 'OneUserData',
  initialState,
  reducers: {
    clearUserStore: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка';
      });
  },
  selectors: {
    getUserIsLoading: state => state.isLoading,
    getUsers: state => state.users,
  },
});

export const userActions = allUserSlice.actions;

export const { getUserIsLoading, getUsers } = allUserSlice.selectors;
