import { createSlice } from '@reduxjs/toolkit';

type UserSliceState = {
  id: number | null;
  fullname: string | null;
  email: string | null;
  token: string | null;
};

const initialState: UserSliceState = {
  id: null,
  fullname: null,
  email: null,
  token: null,
};

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {},
});
