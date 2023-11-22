import { useState, useCallback } from "react";
import { RequestStatus } from "./types/request";

// This is a hook for use cases where several requests are performed
// and the status of the request is needed.
export const useMultipleRequestsWithStatus = <TOperation, TOperationResult>({
  requests,
  operation,
  onError,
  onSuccess
}: {
  requests: Record<string, unknown>[];
  operation: TOperation;
  onSuccess?: (results: TOperationResult[]) => void;
  onError?: (errors: unknown[]) => void;
}) => {
  const [requestStatus, setRequestStatus] = useState<RequestStatus>("idle");

  const handler = useCallback(() => {
    setRequestStatus("pending");

    const operations: Promise<TOperationResult>[] = [];

    requests.forEach((action) => {
      if (typeof operation !== "function") {
        throw new Error("Operation must be a function.");
      }

      operations.push(
        new Promise((resolve, reject) => {
          operation(action, {
            onSuccess: (result: TOperationResult) => {
              resolve(result);
            },
            onError: (error: unknown) => {
              reject(error);
            }
          });
        })
      );
    });

    // Make sure that all operations are completed
    // before setting the status and invoke callbacks.
    Promise.all(operations)
      .then((allResults) => {
        setRequestStatus("success");
        if (onSuccess) {
          onSuccess(allResults);
        }
      })
      .catch((error) => {
        setRequestStatus("error");
        if (onError) {
          onError(error);
        }
      });
  }, [requests, operation, onSuccess, onError]);

  return { handler, requestStatus, setRequestStatus };
};

// This is a hook for use cases where one request is performed
// and the status of the request is needed.
export const useSingleRequestWithStatus = <TOperation, TOperationResult>({
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
  useMultipleRequestsWithStatus({
    requests: [request],
    operation,
    onError: onError ? (errors: unknown[]) => onError(errors[0]) : undefined,
    onSuccess: onSuccess
      ? (results: TOperationResult[]) => onSuccess(results[0])
      : undefined
  });

export default {};
