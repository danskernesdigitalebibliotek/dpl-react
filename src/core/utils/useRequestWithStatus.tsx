import { useState, useCallback } from "react";
import { RequestStatus } from "./types/request";

// This is a hook for use cases where several requests are performed
// and the status of the request is needed.
export const useRequestsWithStatus = <TOperation, TOperationResult>({
  requests,
  operation,
  onError,
  onSuccess
}: {
  requests: Record<string, unknown>[];
  operation: TOperation;
  onSuccess?: (result: TOperationResult) => void;
  onError?: (error: unknown) => void;
}) => {
  const [requestStatus, setRequestStatus] = useState<RequestStatus>("idle");

  const handler = useCallback(() => {
    setRequestStatus("pending");

    requests.forEach((action) => {
      if (typeof operation !== "function") {
        throw new Error("Operation must be a function.");
      }

      operation(action, {
        onSuccess: (result: TOperationResult) => {
          // If any of the requests fail,
          // the whole operation is considered a failure.
          if (result && requestStatus !== "error") {
            setRequestStatus("success");
          }
          if (onSuccess) {
            onSuccess(result);
          }
        },
        onError: (error: unknown) => {
          setRequestStatus("error");
          if (onError) {
            onError(error);
          }
        }
      });
    });
  }, [requests, operation, requestStatus, onSuccess, onError]);

  return { handler, requestStatus, setRequestStatus };
};

// This is a hook for use cases where one request is performed
// and the status of the request is needed.
export const useRequestWithStatus = <TOperation, TOperationResult>({
  request,
  operation,
  onError,
  onSuccess
}: {
  request: Record<string, unknown>;
  operation: TOperation;
  onSuccess?: (result: TOperationResult) => void;
  onError?: (error: unknown) => void;
}) =>
  useRequestsWithStatus({
    requests: [request],
    operation,
    onError: onError ?? undefined,
    onSuccess: onSuccess ?? undefined
  });

export default {};
