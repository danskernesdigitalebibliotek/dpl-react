import { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeRequest, reRunRequest } from "../core/guardedRequests.slice";
import { RootState, TypedDispatch } from "../core/store";
import {
  getCurrentLocation,
  getUrlQueryParam,
  removeQueryParametersFromUrl,
  replaceCurrentLocation
} from "../core/utils/helpers/url";

export interface GuardedAppProps {
  children: ReactElement<any, any> | null;
}
export const AUTH_PARAM = "didAuthenticate";

// This component makes sure to withhold app rendering
// until the persisted request has been executed.
const GuardedApp: FC<GuardedAppProps> = ({ children }) => {
  const dispatch = useDispatch<TypedDispatch>();
  const { request: persistedRequest } = useSelector(
    (state: RootState) => state.guardedRequests
  );
  const didAuthenticate = getUrlQueryParam(AUTH_PARAM);
  console.log("PERSISTED REQUEST:", persistedRequest);

  useEffect(() => {
    if (!persistedRequest || !didAuthenticate) {
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
      // @ts-ignore
      dispatch(removeRequest());
    })();
  }, [didAuthenticate, dispatch, persistedRequest]);

  if (persistedRequest) {
    return null;
  }

  return children;
};

export default GuardedApp;
