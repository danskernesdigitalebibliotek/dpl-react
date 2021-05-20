import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MaterialList from "../../core/MaterialList";

export const resetStatus = createAsyncThunk(
  "checklistMaterial/resetStatus",
  () => {
    return new Promise(resolve => {
      setTimeout(() => resolve(), 4000);
    });
  }
);

export const addToListAction = createAsyncThunk(
  "checklistMaterial/addToListAction",
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

export const removeFromListAction = createAsyncThunk(
  "checklistMaterial/removeFromListAction",
  async ({ materialListUrl, materialId }, { dispatch, rejectWithValue }) => {
    const client = new MaterialList({ baseUrl: materialListUrl });
    try {
      return await client.deleteListMaterial({ materialId });
    } catch (err) {
      dispatch(resetStatus({ materialId }));
      return rejectWithValue(err);
    }
  }
);

export const checklistMaterialButtonSlice = createSlice({
  name: "checklistMaterial",
  initialState: { status: {}, onList: {} },
  reducers: {
    addToListPending(state, action) {
      state.status[action.payload.materialId] = "pending";
      state.onList[action.payload.materialId] = "on";
    },
    addToListAborted(state, action) {
      state.status[action.payload.materialId] = "failed";
      state.onList[action.payload.materialId] = "off";
    },
    removeFromListPending(state, action) {
      state.status[action.payload.materialId] = "pending";
      state.onList[action.payload.materialId] = "off";
    },
    removeFromListAborted(state, action) {
      state.status[action.payload.materialId] = "failed";
      state.onList[action.payload.materialId] = "on";
    }
  },
  extraReducers: {
    [addToListAction.pending]: (state, action) => {
      state.status[action.meta.arg.materialId] = "processing";
      state.onList[action.meta.arg.materialId] = "on";
    },
    [addToListAction.fulfilled]: (state, action) => {
      state.status[action.meta.arg.materialId] = "finished";
      state.onList[action.meta.arg.materialId] = "on";
    },
    [addToListAction.rejected]: (state, action) => {
      state.status[action.meta.arg.materialId] = "failed";
      state.onList[action.meta.arg.materialId] = "off";
    },
    [removeFromListAction.pending]: (state, action) => {
      state.status[action.meta.arg.materialId] = "processing";
      state.onList[action.meta.arg.materialId] = "on";
    },
    [removeFromListAction.fulfilled]: (state, action) => {
      state.status[action.meta.arg.materialId] = "finished";
      state.onList[action.meta.arg.materialId] = "off";
    },
    [removeFromListAction.rejected]: (state, action) => {
      state.status[action.meta.arg.materialId] = "failed";
      state.onList[action.meta.arg.materialId] = "on";
    },
    [resetStatus.fulfilled]: (state, action) => {
      state.status[action.meta.arg.materialId] = "ready";
    }
  }
});

export const {
  addToListPending,
  addToListAborted,
  removeFromListPending,
  removeFromListAborted
} = checklistMaterialButtonSlice.actions;

export default checklistMaterialButtonSlice.reducer;
