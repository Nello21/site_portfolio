import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { changeAvatarApi } from '../api/api';

export const changeAvatar = createAsyncThunk('userData/addFavoriteMovie', async (avatar: string, thunkApi) => {
  const state = thunkApi.getState() as RootState;
  const user_id = state.userData.user.id;

  if (!user_id) {
    throw new Error('User is not authorized');
  }

  const body = {
    user_id,
    avatar,
  };

  const { data } = await changeAvatarApi.changeAvatar(body);

  return data;
});
