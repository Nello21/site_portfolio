import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { createCommentApi } from '../api';
import { CreateReviewPayload } from '../schemes/createReview';

export const createComment = createAsyncThunk(
  'userData/createComment',
  async (payload: CreateReviewPayload, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const user_id = state.userData.user.id;

    if (!user_id) {
      throw new Error('User is not authorized');
    }

    const body = {
      user_id,
      ...payload,
    };

    const { data } = await createCommentApi.createComment(body);

    return data;
  },
);
