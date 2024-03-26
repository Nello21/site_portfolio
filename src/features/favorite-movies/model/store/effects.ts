import { createAsyncThunk } from '@reduxjs/toolkit';
import { addFavoriteMoviePayload, deleteFavoriteMoviePayload } from '../schemes/addFavoriteMovie';
import { RootState } from 'store';
import { addFavoriteMovieApi, deleteFavoriteMovieApi } from '../api';

export const addFavoriteMovie = createAsyncThunk('userData/addFavoriteMovie', async (movieId: number, thunkApi) => {
  const state = thunkApi.getState() as RootState;
  const user_id = state.userData.user.id;

  if (!user_id) {
    throw new Error('User is not authorized');
  }

  const body = {
    user_id,
    movieId,
  };

  const { data } = await addFavoriteMovieApi.addFavoriteMovie(body);

  return data;
});

export const deleteFavoriteMovie = createAsyncThunk(
  'userData/deleteFavoriteMovie',
  async (movieId: number, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const user_id = state.userData.user.id;

    if (!user_id) {
      throw new Error('User is not authorized');
    }

    const body = {
      user_id,
      movieId,
    };

    const { data } = await deleteFavoriteMovieApi.deleteFavoriteMovie(body);

    return data;
  },
);
