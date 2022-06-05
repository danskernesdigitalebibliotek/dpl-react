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
    setTextEntry(state, action) {
      state.data[action.payload.key] = action.payload.value;
    }
  }
});

export const { setTextEntry } = textSlice.actions;

export default textSlice.reducer;
