import { createSlice } from '@reduxjs/toolkit';

import { fetchReviews, fetchUserComments } from './effects';

type Reviews = {
  movie_name: string;
  movies_data_id: number | null;
  review: string | null;
  rating: number | null;
  user_id: number;
};

type reviewsSliceState = {
  reviews: Reviews[];
  isLoading: boolean;
  error: string | null;
};

const initialState: reviewsSliceState = {
  reviews: [],
  isLoading: false,
  error: null,
};

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    clearUserStore: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(fetchUserComments.fulfilled, (state, action) => {
        state.reviews = action.payload;
      });
  },
  selectors: {
    getReviews: state => state.reviews,
    getUserComments: state => state.reviews,
  },
});

export const reviewsActions = reviewsSlice.actions;

export const { getReviews, getUserComments } = reviewsSlice.selectors;
