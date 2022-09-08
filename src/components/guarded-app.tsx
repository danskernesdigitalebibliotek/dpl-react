import React, { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AUTH_PARAM,
  hasRequestExpired,
  removeRequest,
  reRunRequest
} from "../core/guardedRequests.slice";
import { RootState } from "../core/store";
import { getCurrentUnixTime } from "../core/utils/helpers/date";
import {
  getCurrentLocation,
  getUrlQueryParam,
  removeQueryParametersFromUrl,
  replaceCurrentLocation
} from "../core/utils/helpers/url";
import { userIsAnonymous } from "../core/utils/helpers/user";
import { GuardedAppId } from "../core/utils/types/ids";

export interface GuardedAppProps {
  app: GuardedAppId;
  children: ReactNode;
}

// This component makes sure to withhold app rendering
// until the persisted request has been executed.
const GuardedApp = ({ app, children }: GuardedAppProps) => {
  const dispatch = useDispatch();
  const { request: persistedRequest } = useSelector(
    (state: RootState) => state.guardedRequests
  );
  const isApplicationBlocked = persistedRequest && !userIsAnonymous();
  const didAuthenticate = getUrlQueryParam(AUTH_PARAM);

  // We'll leave this debugging here temporarily also in the testing phase for troubleshooting.
  // eslint-disable-next-line no-console
  console.debug("PERSISTED REQUEST:", persistedRequest);

  useEffect(() => {
    if (!persistedRequest) {
      return;
    }

    // We'll leave this debugging here temporarily also in the testing phase for troubleshooting.
    // eslint-disable-next-line no-console
    console.debug("HAS REQUEST EXPIRED?", hasRequestExpired(persistedRequest));
    // eslint-disable-next-line no-console
    console.debug("CURRENT TIMESTAMP", getCurrentUnixTime());
    // eslint-disable-next-line no-console
    console.debug("EXPIRE TIMESTAMP", persistedRequest.expire);

    // If request has expired remove it.
    if (hasRequestExpired(persistedRequest)) {
      dispatch(removeRequest());
    }
  }, [dispatch, persistedRequest]);

  useEffect(() => {
    if (!isApplicationBlocked) {
      return;
    }
    const { app: persistedRequestApp } = persistedRequest;

    // If we do not have the auth url parameter
    // or the request does not belong to this app do nothing.
    if (!didAuthenticate || app !== persistedRequestApp) {
      return;
    }

    // TODO: For some reason the type is not right in the redux type system.
    // It needs to be solved but I do not have the proper solution right now.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(reRunRequest(persistedRequest));

    const currentUrlWithoutAuthParam = removeQueryParametersFromUrl(
      new URL(getCurrentLocation()),
      AUTH_PARAM
    );
    // Remove auth parameter from url so we don't accidentally
    // repeat the functionality related to it.
    replaceCurrentLocation(currentUrlWithoutAuthParam);
    dispatch(removeRequest());
  }, [app, didAuthenticate, dispatch, isApplicationBlocked, persistedRequest]);

  if (isApplicationBlocked) {
    return <div />;
  }

  // This is a special case. We need to return a JSX element
  // and children is not a JSX element.
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export default GuardedApp;
