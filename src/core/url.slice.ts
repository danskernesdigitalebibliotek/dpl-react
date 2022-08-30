import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  data: { [key: string]: string } | Record<string, never>;
} = {
  data: {}
};

export const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {
    addUrlEntries(state, action) {
      state.data = { ...state.data, ...action.payload.entries };
    }
  }
});

export const { addUrlEntries } = urlSlice.actions;

export default urlSlice.reducer;
