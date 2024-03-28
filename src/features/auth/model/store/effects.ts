import { createAsyncThunk } from '@reduxjs/toolkit';
import { STORAGE_KEY, setStorageItem } from 'services/storage';
import { get, post } from 'services/transport';
import { AuthRequestData, RegisterRequestData, UserResponse, ReviewWithUser, Users } from './types';

export const postAuthData = createAsyncThunk('userData/postAuth', async (payload: AuthRequestData, thunkApi) => {
  const { data } = await post<UserResponse>('/auth', payload);

  const userData = { ...data.data, token: data.token };

  setStorageItem(STORAGE_KEY.USER_DATA, userData);

  return userData;
});

export const postRegisterData = createAsyncThunk(
  'userData/postRegister',
  async (payload: RegisterRequestData, thunkApi) => {
    const { data } = await post<UserResponse>('/register', payload);

    const userData = { ...data };

    return userData;
  },
);

export const fetchUser = createAsyncThunk('users/getUser', async (userId: string) => {
  const { data } = await get<Users[]>(`/users?id=${userId}`);
  const user = { ...data[0] };
  return user;
});

export const fetchReviewsWithUsers = createAsyncThunk('userData/getUsersReviews', async (movieId: string) => {
  const { data } = await get<ReviewWithUser[]>(`/reviews?movies_data_id=${movieId}`);
  return data;
});

export const fetchUserComments = createAsyncThunk('userData/getUserComments', async (userId: string) => {
  const { data } = await get<ReviewWithUser[]>(`/reviews?user_id=${userId}`);
  return data;
});
