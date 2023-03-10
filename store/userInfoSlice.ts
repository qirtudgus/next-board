import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import customAxios from '../utils/customAxios';

export const Logout = {
  logout: createAsyncThunk('userInfo/logout', async () => {
    const { data } = await customAxios('POST', '/join/logout');
    return data;
  }),
};

export interface UserInfoState {
  id: string;
  idx: string | number;
  isLogin: boolean;
}

const initialState: UserInfoState = {
  id: '',
  idx: '0',
  isLogin: false,
};

export const registerSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.id = action.payload.id;
      state.idx = action.payload.idx;
      state.isLogin = true;
    },
    logoutSuccess: (state) => {
      state.id = '';
      state.idx = '0';
      state.isLogin = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(Logout.logout.fulfilled, (state) => {
      state.id = '';
      state.idx = '0';
      state.isLogin = false;
    });
  },
});

export const { loginSuccess, logoutSuccess } = registerSlice.actions;

export default registerSlice.reducer;
