import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  data: { [key: string]: string } | Record<string, never>;
} = {
  data: {}
};

export const textSlice = createSlice({
  name: "text",
  initialState,
  reducers: {
    setTextEntries(state, action) {
      state.data = { ...state.data, ...action.payload.entries };
    }
  }
});

export const { setTextEntries } = textSlice.actions;

export default textSlice.reducer;
