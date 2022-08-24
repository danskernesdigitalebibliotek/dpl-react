import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AUTH_PARAM } from "../components/guarded-app";
import { addItem } from "./material-list-api/material-list";
import { persistor, RootState } from "./store";
import { hasToken } from "./token";
import {
  appendQueryParametersToUrl,
  getCurrentLocation,
  redirectTo,
  turnUrlStringsIntoObjects
} from "./utils/helpers/url";
import { App } from "./utils/types/ids";

interface Callback<T1, T2 = void> {
  (args: T1): T2;
}

const requestCallbacks: {
  [key: string]: Callback<Record<string, unknown>>;
} = {
  addFavorite: ({ id }) => {
    return addItem("default", id as string);
  }
};

type CallbackType = keyof typeof requestCallbacks;

export type RequestItem = {
  type: CallbackType;
  args: Record<string, unknown>;
  app: App;
};

const initialState: { request: RequestItem | null } = { request: null };
const guardedRequests = createSlice({
  name: "guardedRequests",
  initialState,
  reducers: {
    addRequest(state, action) {
      const { payload } = action;
      state.request = payload;
    },
    removeRequest(state) {
      state.request = null;
    }
  }
});
export const { addRequest, removeRequest } = guardedRequests.actions;

const getRequestCallback = (
  type: CallbackType
): Callback<Record<string, unknown>> => requestCallbacks?.[type];

const requestCallbackExists = (type: CallbackType) =>
  Boolean(getRequestCallback(type));

const getUrlsFromState = (state: RootState) => {
  const {
    url: { data }
  } = state;
  return turnUrlStringsIntoObjects(data);
};
export const guardedRequest = createAsyncThunk(
  "guardedRequests/performRequest",
  async (
    { type, args, app }: RequestItem,
    { dispatch, fulfillWithValue, getState }
  ) => {
    // The callback is unknown and we cannot continue.
    if (!requestCallbackExists(type)) {
      return fulfillWithValue({ status: "ignored", message: "Nothing to do" });
    }

    // User is anonymous and the requests is known.
    if (!hasToken("user")) {
      // So we'll store the request for later execution.
      dispatch(
        addRequest({
          type,
          args,
          app
        })
      );

      // Make sure that the request is persisted.
      persistor.flush().then(() => {
        // And redirect to external login.
        const { authUrl } = getUrlsFromState(getState() as RootState);
        if (authUrl) {
          const { pathname, search } = appendQueryParametersToUrl(
            new URL(getCurrentLocation()),
            {
              [AUTH_PARAM]: "1"
            }
          );
          const redirectUrl = appendQueryParametersToUrl(authUrl, {
            "current-path": `${pathname}${search}`
          });
          console.log("REDIRECTING TO AUTH URL:", String(redirectUrl));
          redirectTo(redirectUrl);
        }
      });
    }

    // The user is authorized to perform callback. Let's do it!
    const requestCallback = getRequestCallback(type);
    return requestCallback(args);
  }
);

export const reRunRequest = createAsyncThunk(
  "guardedRequests/reRunRequest",
  async ({ type, args }: RequestItem, { fulfillWithValue }) => {
    if (requestCallbackExists(type)) {
      const requestCallback = getRequestCallback(type);
      return requestCallback(args);
    }
    return fulfillWithValue({ status: "success", message: "" });
  }
);

export default guardedRequests.reducer;
