import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import customAxios from '../utils/customAxios';

export const GetTestApiCounter = {
  getTestApiCounter: createAsyncThunk('counter/testApiCounter', async (thunkApi) => {
    const { data } = await customAxios('GET', '/testCounterNumberApi', {});
    return data;
  }),
};

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetTestApiCounter.getTestApiCounter.pending, (state, action) => {
      console.log('api 통신 시도');
    });
    builder.addCase(GetTestApiCounter.getTestApiCounter.fulfilled, (state, action) => {
      state.value += action.payload;
    });
    builder.addCase(GetTestApiCounter.getTestApiCounter.rejected, (state, action) => {
      console.log('api 통신 실패');
      state.value;
    });
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
