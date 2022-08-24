import React, { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeRequest, reRunRequest } from "../core/guardedRequests.slice";
import { RootState, TypedDispatch } from "../core/store";
import {
  getCurrentLocation,
  getUrlQueryParam,
  removeQueryParametersFromUrl,
  replaceCurrentLocation
} from "../core/utils/helpers/url";
import { App } from "../core/utils/types/ids";

export interface GuardedAppProps {
  app: App;
  children: ReactNode;
}
export const AUTH_PARAM = "didAuthenticate";

// This component makes sure to withhold app rendering
// until the persisted request has been executed.
const GuardedApp = ({ app, children }: GuardedAppProps) => {
  const dispatch = useDispatch<TypedDispatch>();
  const { request: persistedRequest } = useSelector(
    (state: RootState) => state.guardedRequests
  );
  const didAuthenticate = getUrlQueryParam(AUTH_PARAM);
  console.log("PERSISTED REQUEST:", persistedRequest);

  useEffect(() => {
    // If we do not have persisted a request
    // or we did not come back from an authentication
    // do nothing.
    if (!persistedRequest || !didAuthenticate) {
      return;
    }
    const { app: persistedRequestApp } = persistedRequest;

    // If the request is not connected to this app do nothing.
    if (app !== persistedRequestApp) {
      return;
    }

    (async () => {
      const currentUrlWithoutAuthParam = removeQueryParametersFromUrl(
        new URL(getCurrentLocation()),
        AUTH_PARAM
      );
      replaceCurrentLocation(currentUrlWithoutAuthParam);
      await dispatch(reRunRequest(persistedRequest));
      // TODO: fix:
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch(removeRequest());
    })();
  }, [app, didAuthenticate, dispatch, persistedRequest]);

  if (persistedRequest) {
    return <div />;
  }

  // This is a special case. We need to return a JSX element
  // and children is not a JSX element.
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export default GuardedApp;
