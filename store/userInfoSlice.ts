import { createSlice } from '@reduxjs/toolkit';

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
});

export const { loginSuccess, logoutSuccess } = registerSlice.actions;

export default registerSlice.reducer;
