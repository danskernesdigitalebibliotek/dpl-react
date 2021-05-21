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

export const checkOnListAction = createAsyncThunk(
  "checklistMaterial/checkOnListAction",
  async ({ materialListUrl, materialId }, { dispatch, rejectWithValue }) => {
    const client = new MaterialList({ baseUrl: materialListUrl });
    try {
      return await client.checkListMaterial({ materialId });
    } catch (err) {
      dispatch(resetStatus({ materialId }));
      return rejectWithValue(err);
    }
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
    setInitialStatus(state, action) {
      state.status[action.payload.materialId] = "ready";
      state.onList[action.payload.materialId] = action.payload.onList;
    },
    addToListPending(state, action) {
      state.status[action.payload.materialId] = "pending";
    },
    addToListAborted(state, action) {
      state.status[action.payload.materialId] = "failed";
    },
    removeFromListPending(state, action) {
      state.status[action.payload.materialId] = "pending";
    },
    removeFromListAborted(state, action) {
      state.status[action.payload.materialId] = "failed";
    }
  },
  extraReducers: {
    [checkOnListAction.fulfilled]: (state, action) => {
      state.onList[action.meta.arg.materialId] = action.payload ? "on" : "off";
    },
    [checkOnListAction.rejected]: (state, action) => {
      state.onList[action.meta.arg.materialId] = "off";
    },
    [addToListAction.pending]: (state, action) => {
      state.status[action.meta.arg.materialId] = "processing";
    },
    [addToListAction.fulfilled]: (state, action) => {
      state.status[action.meta.arg.materialId] = "finished";
      state.onList[action.meta.arg.materialId] = "on";
    },
    [addToListAction.rejected]: (state, action) => {
      state.status[action.meta.arg.materialId] = "failed";
    },
    [removeFromListAction.pending]: (state, action) => {
      state.status[action.meta.arg.materialId] = "processing";
    },
    [removeFromListAction.fulfilled]: (state, action) => {
      state.status[action.meta.arg.materialId] = "finished";
      state.onList[action.meta.arg.materialId] = "off";
    },
    [removeFromListAction.rejected]: (state, action) => {
      state.status[action.meta.arg.materialId] = "failed";
    },
    [resetStatus.fulfilled]: (state, action) => {
      state.status[action.meta.arg.materialId] = "ready";
      if (action.meta.arg.onList) {
        state.onList[action.meta.arg.materialId] = action.meta.arg.onList;
      }
    }
  }
});

export const {
  setInitialStatus,
  addToListPending,
  addToListAborted,
  removeFromListPending,
  removeFromListAborted
} = checklistMaterialButtonSlice.actions;

export default checklistMaterialButtonSlice.reducer;
