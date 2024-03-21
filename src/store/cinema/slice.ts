import { createSlice } from '@reduxjs/toolkit';
import { cinemaData } from 'shared/types/cinemaData';
import { filterTopRatedLastMonth, findHitOfTheWeek } from './filters';
import { getCinema } from './effects';

type Cinema = {
  data: cinemaData[];
  hitOfTheWeek: cinemaData | null;
};

type CinemaSliceState = {
  cinema: Cinema;
  isLoading: boolean;
  error: string | null;
};

const initialState: CinemaSliceState = {
  cinema: {
    data: [],
    hitOfTheWeek: null,
  },
  isLoading: false,
  error: null,
};

export const moviesSlice = createSlice({
  name: 'moviesData',
  initialState,
  reducers: {
    clearCinemaStore: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(getCinema.pending, state => {
        state.isLoading = true;
      })
      .addCase(getCinema.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cinema.data = action.payload;
      })
      .addCase(getCinema.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка';
      });
  },
  selectors: {
    getCinemaIsLoading: state => state.isLoading,
    getAllCinema: state => state.cinema.data,
    getMovies: state => filterTopRatedLastMonth(state.cinema.data.filter(item => item.type === 'Фильм')),
    getSerials: state => filterTopRatedLastMonth(state.cinema.data.filter(item => item.type === 'Сериал')),
    getHitOfTheWeek: state => findHitOfTheWeek(state.cinema.data),
  },
});

export const { clearCinemaStore } = moviesSlice.actions;

export const { getCinemaIsLoading, getAllCinema, getMovies, getSerials, getHitOfTheWeek } = moviesSlice.selectors;
