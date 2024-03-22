import { createSlice } from '@reduxjs/toolkit';
import { createComment } from './effects';

type CreateCommentState = {
  isLoading: boolean;
  error: string | null;
};

const initialState: CreateCommentState = {
  isLoading: false,
  error: null,
};

export const createCommentSlice = createSlice({
  name: 'comment/createComment',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createComment.pending, state => {
        state.isLoading = true;
      })
      .addCase(createComment.fulfilled, state => initialState)
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Что-то пошло не так';
      });
  },
  selectors: {
    getCreateCommentIsLoading: state => state.isLoading,
  },
});

export const { getCreateCommentIsLoading } = createCommentSlice.selectors;
