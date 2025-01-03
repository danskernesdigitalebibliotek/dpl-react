import { act, renderHook } from "@testing-library/react-hooks";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useMultipleRequestsWithStatus } from "../../core/utils/useRequestsWithStatus";

const createRequest =
  ({ throwError }: { throwError: boolean }) =>
  async (
    { message }: { message: string },
    {
      onSuccess,
      onError
    }: {
      onSuccess: (result: unknown) => void;
      onError: (error: unknown) => void;
    }
  ) => {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (throwError) {
          reject(new Error("Error happened fetching"));
        }
        resolve(message);
      }, 300);
    })
      .then((result) => {
        onSuccess(result);
      })
      .catch((error) => {
        onError(error);
      });
  };

describe("useMultipleRequestsWithStatus", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should handle multiple requests", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useMultipleRequestsWithStatus({
        requests: [
          {
            params: { message: "Hello" },
            operation: createRequest({ throwError: false })
          },
          {
            params: { message: "World" },
            operation: createRequest({ throwError: false })
          }
        ],
        onError: () => {
          expect(result.current.requestStatus).toBe("error");
        },
        onSuccess: (operationResult) => {
          expect(operationResult).toEqual(["Hello", "World"]);
          expect(result.current.requestStatus).toBe("success");
        }
      })
    );

    act(() => {
      expect(result.current.requestStatus).toBe("idle");

      result.current.handler();
    });

    vi.runAllTimers();

    await waitForNextUpdate();
    expect(result.current.requestStatus).toBe("success");
  });

  it("should handle erroneous requests", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useMultipleRequestsWithStatus({
        requests: [
          {
            params: { message: "Hello" },
            operation: createRequest({ throwError: false })
          },
          {
            params: { message: "World" },
            operation: createRequest({ throwError: true })
          }
        ],
        onError: () => {
          expect(result.current.requestStatus).toBe("error");
        },
        onSuccess: (operationResult) => {
          expect(operationResult).toEqual(["Hello", "World"]);
          expect(result.current.requestStatus).toBe("success");
        }
      })
    );

    act(() => {
      expect(result.current.requestStatus).toBe("idle");

      result.current.handler();
    });

    vi.runAllTimers();

    await waitForNextUpdate();
    expect(result.current.requestStatus).toBe("error");
  });
});
