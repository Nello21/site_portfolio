import { configureStore } from '@reduxjs/toolkit';
import { moviesSlice } from './cinema/slice';
import { useDispatch } from 'react-redux';
import { oneMovieSlice } from './cinema/oneMovieSlice';
import { userSlice } from 'features/auth/model/store/slice';
import { STORAGE_KEY, getStorageItem } from 'services/storage';
import { reviewsSlice } from 'features/auth/model/store/reviewsSlice';
import { userProfileSlice } from 'features/auth/model/store/userProfileSlice';
import { createCommentSlice } from 'features/create-review/model/store/slice';

const getUserDataFromStorage = () => {
  const userData = getStorageItem(STORAGE_KEY.USER_DATA);
  const initialState = userSlice.getInitialState();

  if (userData) {
    return { ...initialState, user: userData };
  }

  return initialState;
};

export const rootStore = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [userProfileSlice.name]: userProfileSlice.reducer,
    [moviesSlice.name]: moviesSlice.reducer,
    [oneMovieSlice.name]: oneMovieSlice.reducer,
    [reviewsSlice.name]: reviewsSlice.reducer,
    [createCommentSlice.name]: createCommentSlice.reducer,
  },
  devTools: true,
  preloadedState: {
    userData: getUserDataFromStorage(),
  },
});

export type RootState = ReturnType<typeof rootStore.getState>;

export type AppDispatch = typeof rootStore.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
