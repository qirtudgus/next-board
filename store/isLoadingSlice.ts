import { createSlice } from '@reduxjs/toolkit';

export interface IsLoadingState {
  value: boolean;
}

const initialState: IsLoadingState = {
  value: false,
};

export const isLoadingSlice = createSlice({
  name: 'isLoading',
  initialState,
  reducers: {
    isLoading: (state) => {
      state.value = true;
    },
    isSuccess: (state) => {
      state.value = false;
    },
  },
});
export const { isLoading, isSuccess } = isLoadingSlice.actions;
export default isLoadingSlice.reducer;
