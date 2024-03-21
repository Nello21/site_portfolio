import { createSlice } from '@reduxjs/toolkit';
import { cinemaData } from 'shared/types/cinemaData';
import { getOneMovie } from './effects';

type OneMovieSliceState = {
  movie: cinemaData | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: OneMovieSliceState = {
  movie: null,
  isLoading: false,
  error: null,
};

export const oneMovieSlice = createSlice({
  name: 'OneMovieData',
  initialState,
  reducers: {
    clearMovieStore: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(getOneMovie.pending, state => {
        state.isLoading = true;
      })
      .addCase(getOneMovie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movie = action.payload;
      })
      .addCase(getOneMovie.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка';
      });
  },
  selectors: {
    getMovieIsLoading: state => state.isLoading,
    getMovie: state => state.movie,
  },
});

export const { clearMovieStore } = oneMovieSlice.actions;

export const { getMovieIsLoading, getMovie } = oneMovieSlice.selectors;
