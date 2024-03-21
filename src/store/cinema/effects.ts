import { createAsyncThunk } from '@reduxjs/toolkit';
import { get } from 'services/transport';
import { cinemaData } from 'shared/types/cinemaData';

// export const getCinema = createAsyncThunk('moviesData/getData', async () => {
//   const { data } = await get<cinemaData[]>('/movies_data');

//   return data;
// });

export const getCinema = createAsyncThunk('moviesData/getData', async filterParams => {
  const { data } = await get<cinemaData[]>('/movies_data', { params: filterParams }); // Передача параметров фильтрации в запрос

  return data;
});

export const getOneMovie = createAsyncThunk('oneMoviesData/id', async (id: string) => {
  const { data } = await get<cinemaData[]>(`/movies_data?id=${id}`);
  const movie = { ...data[0] };
  return movie;
});

export const getFavoritesMovies = createAsyncThunk('moviesData/postAuth', async () => {
  const { data } = await get<cinemaData[]>('/favorites_movies');

  return data;
});
