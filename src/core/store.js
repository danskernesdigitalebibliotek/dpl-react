import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import staticDataReducer from "./staticData.slice";
import userReducer from "./user.slice";

const persistConfig = {
  key: "dpl-react",
  storage,
  blacklist: ["staticData"]
};

export const store = configureStore({
  reducer: persistReducer(
    persistConfig,
    combineReducers({
      user: userReducer,
      staticData: staticDataReducer
    })
  ),
  devTools: process.env.NODE_ENV === "development"
});

export const persistor = persistStore(store);
