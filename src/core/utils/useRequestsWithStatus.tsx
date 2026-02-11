import { useState, useCallback } from "react";
import { RequestStatus } from "./types/request";

// This is a hook for use cases where several requests are performed
// and the status of the request is needed.
export const useMultipleRequestsWithStatus = <
  // We deliberately use Function because any function shape goes here.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  TRequest extends Function,
  TParams,
  TResponse
>({
  requests,
  onError,
  onSuccess
}: {
  requests: { params: TParams; operation: TRequest }[];
  onSuccess?: (results: TResponse[]) => void;
  onError?: (errors: unknown[]) => void;
}) => {
  const [requestStatus, setRequestStatus] = useState<RequestStatus>("idle");

  const handler = useCallback(() => {
    setRequestStatus("pending");

    const operations: Promise<TResponse>[] = [];

    requests.forEach(({ params, operation }) => {
      if (typeof operation !== "function") {
        throw new Error("Operation must be a function.");
      }

      operations.push(
        new Promise((resolve, reject) => {
          operation(params, {
            onSuccess: (result: TResponse) => {
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
  }, [requests, onSuccess, onError]);

  return { handler, requestStatus, setRequestStatus };
};

// This is a hook for use cases where one request is performed
// and the status of the request is needed.
export const useSingleRequestWithStatus = <
  // We deliberately use Function because any function shape goes here.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  TRequest extends Function,
  TParams,
  TResponse
>({
  request,
  onError,
  onSuccess
}: {
  request: { params: TParams; operation: TRequest };
  onSuccess?: (results: TResponse) => void;
  onError?: (error: unknown) => void;
}) =>
  useMultipleRequestsWithStatus({
    requests: [request],
    onError: onError ? (errors: unknown[]) => onError(errors[0]) : undefined,
    onSuccess: onSuccess
      ? (results: TResponse[]) => {
          onSuccess(results[0]);
        }
      : undefined
  });

export default {};
