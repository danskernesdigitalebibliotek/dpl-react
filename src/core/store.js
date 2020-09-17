import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import userReducer from "./user.slice";
import addToChecklistReducer from "../apps/add-to-checklist/add-to-checklist.slice";

const persistConfig = {
  key: "root",
  storage
};

export const store = configureStore({
  reducer: persistReducer(
    persistConfig,
    combineReducers({
      addToChecklist: addToChecklistReducer,
      user: userReducer
    })
  ),
  devTools: true
});

export const persistor = persistStore(store);
