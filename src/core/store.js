import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import { addToChecklistSlice } from "../apps/add-to-checklist/add-to-checklist.slice";

const persistConfig = {
  key: "root",
  storage
  // stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

export const store = configureStore({
  reducer: persistReducer(
    persistConfig,
    combineReducers({
      addToChecklist: addToChecklistSlice.reducer
    })
  ),
  devTools: true
});

export const persistor = persistStore(store);
