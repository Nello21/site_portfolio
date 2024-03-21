import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './user/slice';

export const rootStore = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
  },
  devTools: true,
});
