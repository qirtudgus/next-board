import { createSlice } from '@reduxjs/toolkit';

export interface NameState {
  value: string;
}

const initialState: NameState = {
  value: '네임',
};

export const nameSlice = createSlice({
  name: 'name',
  initialState,
  reducers: {
    getUserAgentReducer: (state) => {
      const agent = window.navigator.userAgent;
      console.log(agent);
      state.value = agent;
    },
  },
});
export const { getUserAgentReducer } = nameSlice.actions;
export default nameSlice.reducer;
