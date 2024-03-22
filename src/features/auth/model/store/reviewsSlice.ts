import { createSlice } from '@reduxjs/toolkit';

import { fetchReviewsWithUsers, fetchUserComments } from './effects';

type User = {
  id: number | null;
  fullName: string | null;
  email: string | null;
  avatar: string | null;
};

type ReviewWithUser = {
  movie_name: string;
  movies_data_id: number | null;
  review: string | null;
  rating: number | null;
  user: User;
};

type UserSliceState = {
  reviewsWithUsers: ReviewWithUser[];
  isLoading: boolean;
  error: string | null;
};

const initialState: UserSliceState = {
  reviewsWithUsers: [],
  isLoading: false,
  error: null,
};

export const reviewsSlice = createSlice({
  name: 'reviewsData',
  initialState,
  reducers: {
    clearUserStore: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(fetchReviewsWithUsers.fulfilled, (state, action) => {
      state.reviewsWithUsers = action.payload;
    });
    builder.addCase(fetchUserComments.fulfilled, (state, action) => {
      state.reviewsWithUsers = action.payload;
    });
  },
  selectors: {
    getUserIsLoading: state => state.isLoading,
    getReviewsWithUser: state => state.reviewsWithUsers,
    getUserComments: state => state.reviewsWithUsers,
  },
});

export const userActions = reviewsSlice.actions;

export const { getUserIsLoading, getReviewsWithUser, getUserComments } = reviewsSlice.selectors;
