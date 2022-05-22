import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector as rawUseSelector
} from "react-redux";
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

export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
