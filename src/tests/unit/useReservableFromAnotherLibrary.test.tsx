import { describe, expect, it, vi, beforeAll } from "vitest";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import React, { ReactElement } from "react";
import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import { QueryClient, QueryClientProvider } from "react-query";
import useReservableFromAnotherLibrary from "../../core/utils/useReservableFromAnotherLibrary";
import { Manifestation } from "../../core/utils/types/entities";
import configReducer from "../../core/config.slice";
import { useGetHoldings } from "../../apps/material/helper";

const queryClient = new QueryClient();

const store = configureStore({
  reducer: combineReducers({
    config: configReducer
  }),
  preloadedState: {
    config: {
      data: {
        blacklistedPickupBranchesConfig: ""
      }
    }
  }
});

const mockedManifestations = [
  {
    pid: "870970-basis:27721257",
    catalogueCodes: {
      otherCatalogues: ["OVE123"]
    }
  }
] as unknown as Manifestation[];

const Wrapper = ({ children }: { children: ReactElement }) => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>{children}</Provider>
  </QueryClientProvider>
);

describe("useReservableFromAnotherLibrary", () => {
  beforeAll(() => {
    vi.mock("../../apps/material/helper", () => ({
      useGetHoldings: vi.fn()
    }));
  });

  it("should return reservable pids from another library", async () => {
    // Typescript does not understand our mocked hook.
    // So we gracefully ignore the error :).

    // @ts-ignore-next-line
    useGetHoldings.mockReturnValue({
      data: [
        {
          recordId: "52643414",
          reservable: false, // This is the key to the test
          reservations: 0,
          holdings: []
        }
      ],
      isLoading: false,
      isError: false
    });

    const { result } = renderHook(
      () => useReservableFromAnotherLibrary(mockedManifestations),
      {
        wrapper: Wrapper
      }
    );

    act(() => {
      expect(result.current.reservablePidsFromAnotherLibrary).toEqual([
        "870970-basis:27721257"
      ]);
      expect(result.current.materialIsReservableFromAnotherLibrary).toBe(true);
    });
  });

  it("should return an empty array if useGetHoldings does return reservable items", async () => {
    // Typescript does not understand our mocked hook.
    // So we gracefully ignore the error :).

    // @ts-ignore-next-line
    useGetHoldings.mockReturnValue({
      data: [
        {
          recordId: "52643414",
          reservable: true, // This is the key to the test
          reservations: 0,
          holdings: []
        }
      ],
      isLoading: false,
      isError: false
    });

    const { result } = renderHook(
      () => useReservableFromAnotherLibrary(mockedManifestations),
      {
        wrapper: Wrapper
      }
    );

    act(() => {
      expect(result.current.reservablePidsFromAnotherLibrary).toEqual([]);
      expect(result.current.materialIsReservableFromAnotherLibrary).toBe(false);
    });
  });
});
