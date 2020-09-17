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
    authenticationSucceeded(state) {
      state.status = "authenticated";
    },
    authenticationFailed(state) {
      state.status = "failed";
    }
  },
  extraReducers: {
    [attemptAuthentication.pending]: state => {
      state.status = "attempting";
    }
  }
});

export const {
  authenticationSucceeded,
  authenticationFailed
} = userSlice.actions;

export default userSlice.reducer;
