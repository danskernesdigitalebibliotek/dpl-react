import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useSelector as rawUseSelector
} from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import textReducer from "./text.slice";
import userReducer from "./user.slice";
import modalReducer from "./modal.slice";
import urlReducer from "./url.slice";

// TODO: We have planned to get rid of redux-persist.
// When the step has been made to remove it all the persist setup should go as well.
const persistConfig = {
  key: "dpl-react",
  storage,
  blacklist: ["text"]
};

export const store = configureStore({
  reducer: persistReducer(
    persistConfig,
    combineReducers({
      user: userReducer,
      text: textReducer,
      modal: modalReducer,
      url: urlReducer
    })
  ),
  devTools: process.env.NODE_ENV === "development"
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
