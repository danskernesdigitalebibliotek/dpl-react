import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { addItem } from "./material-list-api/material-list";
// TODO: Fix dependency cycle problem
// There is not an obvious solution but we need access to the persistor
// in the guardedRequest thunk.
// eslint-disable-next-line import/no-cycle
import { persistor } from "./store";
import type { RootState } from "./store";
import { getCurrentUnixTime } from "./utils/helpers/date";
import {
  appendQueryParametersToUrl,
  getCurrentLocation,
  redirectTo,
  turnUrlStringsIntoObjects
} from "./utils/helpers/url";
import { GuardedAppId } from "./utils/types/ids";
import { userIsAnonymous } from "./utils/helpers/user";

export const AUTH_PARAM = "didAuthenticate";

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
  app: GuardedAppId;
  expire?: number;
};
const getExpireTimestamp = () => getCurrentUnixTime() + 60;
export const hasRequestExpired = ({ expire }: RequestItem) => {
  // If no expiration timestamp is given. We will expire the request immediately.
  if (!expire) {
    return true;
  }
  return getCurrentUnixTime() > expire;
};

const initialState: { request: RequestItem | null } = { request: null };
const guardedRequests = createSlice({
  name: "guardedRequests",
  initialState,
  reducers: {
    addRequest(state, action: PayloadAction<RequestItem>) {
      const { payload: request } = action;
      if (!request?.expire) {
        request.expire = getExpireTimestamp();
      }
      state.request = request;
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
    requestItem: RequestItem,
    { dispatch, fulfillWithValue, getState }
  ) => {
    const { type, args } = requestItem;
    // The callback is unknown and we cannot continue.
    if (!requestCallbackExists(type)) {
      return fulfillWithValue({ status: "ignored", message: "Nothing to do" });
    }

    // User is anonymous and the requests is known.
    if (userIsAnonymous()) {
      // So we'll store the request for later execution.
      dispatch(addRequest(requestItem));

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
          // We'll leave this debugging here temporarily also in the testing phase for troubleshooting.
          // eslint-disable-next-line no-console
          console.debug("REDIRECTING TO AUTH URL:", String(redirectUrl));
          redirectTo(redirectUrl);
        }
      });
    }

    // We'll leave this debugging here temporarily also in the testing phase for troubleshooting.
    // eslint-disable-next-line no-console
    console.debug("PERFORMING REQUEST CALLBACK");
    // The user is authorized to perform callback. Let's do it!
    const requestCallback = getRequestCallback(type);
    return requestCallback(args);
  }
);

export const reRunRequest = createAsyncThunk(
  "guardedRequests/reRunRequest",
  async (requestItem: RequestItem, { fulfillWithValue }) => {
    const { type, args } = requestItem;

    // Run request callback.
    if (requestCallbackExists(type)) {
      const requestCallback = getRequestCallback(type);
      // We'll leave this debugging here temporarily also in the testing phase for troubleshooting.
      // eslint-disable-next-line no-console
      console.debug("RERUNNING REQUEST");
      return requestCallback(args);
    }

    return fulfillWithValue({ status: "success", message: "" });
  }
);

export default guardedRequests.reducer;
