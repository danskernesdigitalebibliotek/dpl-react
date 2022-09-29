import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  data: { [key: string]: string } | Record<string, never>;
} = {
  data: {}
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    addConfigEntries(state, action) {
      state.data = { ...state.data, ...action.payload.entries };
    }
  }
});

export const { addConfigEntries } = configSlice.actions;

export default configSlice.reducer;
