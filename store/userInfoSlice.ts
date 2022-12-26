import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import customAxios from '../utils/customAxios';

export const Logout = {
  logout: createAsyncThunk('userInfo/logout', async () => {
    const { data } = await customAxios('post', '/join/logout');
    return data;
  }),
};

export interface UserInfoState {
  id: string;
  isLogin: boolean;
}

const initialState: UserInfoState = {
  id: '',
  isLogin: false,
};

export const registerSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      console.log(action);
      state.id = action.payload.id;
      state.isLogin = true;
    },
    logoutSuccess: (state) => {
      state.id = '';
      state.isLogin = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(Logout.logout.fulfilled, (state) => {
      state.id = '';
      state.isLogin = false;
    });
  },
});

export const { loginSuccess, logoutSuccess } = registerSlice.actions;

export default registerSlice.reducer;
