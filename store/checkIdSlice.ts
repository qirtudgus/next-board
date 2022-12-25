import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import customAxios from '../utils/customAxios';

export const GetTestBoolean = {
  getTestBoolean: createAsyncThunk('checkId/GetTestBoolean', async (id: string, thunkApi) => {
    console.log(id);
    const { data } = await customAxios('post', '/join/duplicationCheckId', { id });
    return data;
  }),
};

export interface DuplicationCheckIdState {
  idValue: boolean | null | undefined;
  idStatusText: string;
  passwordValue?: boolean;
  passwordStatusText?: string;
  passwordConfirmValue?: boolean;
  passwordConfirmStatusText?: string;
}

const initialState: DuplicationCheckIdState = {
  idValue: null,
  idStatusText: '',
  passwordValue: false,
  passwordStatusText: '',
  passwordConfirmValue: false,
  passwordConfirmStatusText: 'string',
};

export const duplicationCheckIdSlice = createSlice({
  name: 'checkId',
  initialState,
  reducers: {
    outOfSyncRegExpressionId: (state) => {
      state.idValue = true;
      state.idStatusText = `5~15자의 영소문자,숫자,특수문자('-','_')여야 해요.`;
    },
    duplicateId: (state) => {
      state.idValue = true;
      state.idStatusText = `이미 사용중인 아이디예요.`;
    },
    canTakeRegExpressionId: (state) => {
      state.idValue = null;
      state.idStatusText = ``;
    },
    missingPassword: (state) => {
      state.passwordValue = false;
      state.passwordStatusText = ``;
      state.passwordConfirmValue = true;
      state.passwordConfirmStatusText = `비밀번호가 일치하지않아요!`;
    },
    blankPassword: (state) => {
      state.passwordValue = true;
      state.passwordStatusText = `5~15자의 영문,숫자,특수문자여야 해요!`;
      state.passwordConfirmValue = false;
      state.passwordConfirmStatusText = ``;
    },
    canTakeRegExpressionPassword: (state) => {
      state.passwordValue = true;
      state.passwordStatusText = `5~15자의 영문,숫자,특수문자여야 해요!`;
      state.passwordConfirmValue = false;
      state.passwordConfirmStatusText = ``;
    },
    pageUnmountResetValue: (state) => {
      state.idValue = null;
      state.passwordValue = false;
      state.idStatusText = '';
      state.passwordStatusText = '';
      state.passwordConfirmValue = false;
      state.passwordConfirmStatusText = 'string';
    },
  },
  extraReducers(builder) {
    builder.addCase(GetTestBoolean.getTestBoolean.fulfilled, (state, action) => {
      state.idValue = action.payload.idValue;
      state.idStatusText = action.payload.idStatusText;
    });
  },
});
export const {
  outOfSyncRegExpressionId,
  canTakeRegExpressionPassword,
  canTakeRegExpressionId,
  missingPassword,
  duplicateId,
  blankPassword,
  pageUnmountResetValue,
} = duplicationCheckIdSlice.actions;
export default duplicationCheckIdSlice.reducer;
