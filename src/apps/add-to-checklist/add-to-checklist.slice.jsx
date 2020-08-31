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
  "addToChecklist/requestAddToList",
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

// This thunk doesn't actually do anything but resolve straight away,
// but this allows us to chain a `.then()` on the action on the caller
// side.
export const addToListIntent = createAsyncThunk("addToChecklist/addToList", () =>
  Promise.resolve()
);

export const addToChecklistSlice = createSlice({
  name: "addToChecklist",
  initialState: { status: {} },
  extraReducers: {
    [addToListIntent.pending]: (state, action) => {
      state.status[action.meta.arg.materialId] = "pending";
    },
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
