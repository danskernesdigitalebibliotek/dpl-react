import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  data: { [key: string]: boolean } | Record<string, never>;
} = {
  data: { hasBeenVisible: false }
};

export const blockedModalSlice = createSlice({
  name: "blockedModal",
  initialState,
  reducers: {
    setHasBeenVisible(state, action) {
      if (!state.data.hasBeenVisible) {
        if (action.payload.hasBeenVisible) {
          state.data = { ...state.data, ...action.payload };
        }
      }
    }
  }
});

export const { setHasBeenVisible } = blockedModalSlice.actions;

export default blockedModalSlice.reducer;
