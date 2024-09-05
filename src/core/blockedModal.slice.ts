import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

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

export const useSetHasBeenVisible = () => {
  const { setHasBeenVisible } = blockedModalSlice.actions;
  const dispatch = useDispatch();

  return () => dispatch(setHasBeenVisible({ hasBeenVisible: true }));
};

export default blockedModalSlice.reducer;
