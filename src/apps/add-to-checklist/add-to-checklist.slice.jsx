import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MaterialList from "../../core/MaterialList";

export const resetStatus = createAsyncThunk(
  "addToChecklist/resetStatus",
  // eslint-disable-next-line no-unused-vars
  ({ materialId }) => {
    return new Promise(resolve => {
      setTimeout(() => resolve(), 4000);
    });
  }
);

export const addToListAction = createAsyncThunk(
  "addToChecklist/addToListAction",
  async ({ materialListUrl, materialId }, { dispatch, rejectWithValue }) => {
    const client = new MaterialList({ baseUrl: materialListUrl });
    try {
      return await client.addListMaterial({ materialId });
    } catch (err) {
      dispatch(resetStatus({ materialId }));
      return rejectWithValue(err);
    }
  }
);

export const addToChecklistSlice = createSlice({
  name: "addToChecklist",
  initialState: { status: {} },
  reducers: {
    addToListIntent(state, action) {
      state.status[action.payload.materialId] = "pending";
    },
    addToListAborted(state, action) {
      state.status[action.payload.materialId] = "failed";
    }
  },
  extraReducers: {
    [addToListAction.pending]: (state, action) => {
      state.status[action.meta.arg.materialId] = "processing";
    },
    [addToListAction.fulfilled]: (state, action) => {
      state.status[action.meta.arg.materialId] = "finished";
    },
    [addToListAction.rejected]: (state, action) => {
      state.status[action.meta.arg.materialId] = "failed";
    },
    [resetStatus.fulfilled]: (state, action) => {
      state.status[action.meta.arg.materialId] = "ready";
    }
  }
});

export const {
  addToListIntent,
  addToListAborted
} = addToChecklistSlice.actions;

export default addToChecklistSlice.reducer;
