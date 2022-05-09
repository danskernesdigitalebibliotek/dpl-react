import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// This thunk doesn't actually do anything but resolve straight away,
// but this allows us to chain a `.then()` on the action on the caller
// side.
export const attemptAuthentication = createAsyncThunk(
  "user/attemptAuthentication",
  () => Promise.resolve()
);

const userSlice = createSlice({
  name: "user",
  initialState: { status: "unauthenticated" },
  reducers: {
    updateStatus(state, action) {
      if (state.status === "unauthenticated" || state.status === "attempting") {
        if (action.payload.hasToken) {
          state.status = "authenticated";
        } else if (action.payload.doFail && state.status === "attempting") {
          state.status = "failed";
        }
      }
    },
    setStatusAuthenticated(state) {
      state.status = "authenticated";
    },
    setStatusUnauthenticated(state) {
      state.status = "unauthenticated";
    }
  },
  extraReducers: {
    [attemptAuthentication.pending]: (state) => {
      state.status = "attempting";
    }
  }
});

export const {
  updateStatus,
  setStatusAuthenticated,
  setStatusUnauthenticated
} = userSlice.actions;

export default userSlice.reducer;
