import { configureStore } from '@reduxjs/toolkit';
import { moviesSlice } from './cinema/slice';
import { useDispatch } from 'react-redux';
import { oneMovieSlice } from './cinema/oneMovieSlice';
import { userSlice } from 'features/auth/model/store/slice';
import { STORAGE_KEY, getStorageItem } from 'services/storage';
import { allUserSlice } from 'features/auth/model/store/allUsersSlice';

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
    [moviesSlice.name]: moviesSlice.reducer,
    [oneMovieSlice.name]: oneMovieSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [allUserSlice.name]: allUserSlice.reducer,
  },
  devTools: true,
  preloadedState: {
    userData: getUserDataFromStorage(),
  },
});

export type RootState = ReturnType<typeof rootStore.getState>;

export type AppDispatch = typeof rootStore.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
