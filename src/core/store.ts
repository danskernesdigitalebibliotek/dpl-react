import {
  configureStore,
  combineReducers,
  ThunkDispatch,
  Middleware
} from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useSelector as rawUseSelector
} from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import textReducer from "./text.slice";
import modalReducer from "./modal.slice";
import urlReducer from "./url.slice";
import filterReducer from "./filter.slice";
import configReducer from "./config.slice";
import blockModalReducer from "./blockedModal.slice";
// TODO: Fix dependency cycle problem
// There is not an obvious solution but we need access to the persistor
// in the guardedRequest thunk.
import guardedRequestsReducer from "./guardedRequests.slice";
import extractServiceBaseUrls from "./utils/reduxMiddleware/extractServiceBaseUrls";

const persistConfig = {
  key: "dpl-react",
  storage,
  blacklist: ["text", "url", "modal", "config"]
};

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"]
      }
    }).prepend(extractServiceBaseUrls as Middleware),
  reducer: persistReducer(
    persistConfig,
    combineReducers({
      text: textReducer,
      modal: modalReducer,
      url: urlReducer,
      config: configReducer,
      guardedRequests: guardedRequestsReducer,
      blockedModal: blockModalReducer,
      filter: filterReducer
    })
  ),
  devTools: process.env.NODE_ENV === "development"
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type TypedDispatch = ThunkDispatch<RootState, never, never>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;

export const resetPersistedData = async () => persistor.purge();
