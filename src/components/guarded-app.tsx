import { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeRequest, reRunRequest } from "../core/guardedRequests.slice";
import { RootState, TypedDispatch } from "../core/store";

export interface GuardedAppProps {
  children: ReactElement<any, any> | null;
}

// This component makes sure to withhold app rendering
// until the persisted request has been executed.
const GuardedApp: FC<GuardedAppProps> = ({ children }) => {
  const dispatch = useDispatch<TypedDispatch>();
  const { request: persistedRequest } = useSelector(
    (state: RootState) => state.guardedRequests
  );
  console.log("PERSISTED REQUEST:", persistedRequest);

  useEffect(() => {
    if (!persistedRequest) {
      return;
    }

    (async () => {
      await dispatch(reRunRequest(persistedRequest));
      // TODO: fix:
      // @ts-ignore
      dispatch(removeRequest());
    })();
  }, [dispatch, persistedRequest]);

  if (persistedRequest) {
    return null;
  }

  return children;
};

export default GuardedApp;
