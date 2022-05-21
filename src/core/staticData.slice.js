import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: false
};

export const getData = createAsyncThunk(
  "data/getData",
  async () =>
    // TODO: Make this configurable:
    await fetch("http://0.0.0.0:3001/static-data").then((res) => res.json())
);

export const staticDataSlice = createSlice({
  name: "staticData",
  initialState,
  reducers: {},
  extraReducers: {
    [getData.pending]: (state) => {
      state.loading = true;
    },
    [getData.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    },
    [getData.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    }
  }
});

export default staticDataSlice.reducer;
