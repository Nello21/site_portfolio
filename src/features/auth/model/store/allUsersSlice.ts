import { createSlice } from '@reduxjs/toolkit';
import { Users } from './types';
import { fetchAllUsers } from './effects';

type CinemaSliceState = {
  users: Users[];
  isLoading: boolean;
  error: string | null;
};

const initialState: CinemaSliceState = {
  users: [],
  isLoading: false,
  error: null,
};

export const allUserSlice = createSlice({
  name: 'allUsersData',
  initialState,
  reducers: {
    clearAllUsersStore: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllUsers.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка';
      });
  },
  selectors: {
    getUsersIsLoading: state => state.isLoading,
    getAllUsers: state => state.users,
  },
});

export const { clearAllUsersStore } = allUserSlice.actions;

export const { getUsersIsLoading, getAllUsers } = allUserSlice.selectors;
