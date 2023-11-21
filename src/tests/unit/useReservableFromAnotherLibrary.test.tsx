import { describe, expect, it, vi, afterEach } from "vitest";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import React, { ReactElement } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import useReservableFromAnotherLibrary from "../../core/utils/useReservableFromAnotherLibrary";
import { Manifestation } from "../../core/utils/types/entities";
import configReducer from "../../core/config.slice";

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
  },
  {
    pid: "870970-basis:39022222",
    catalogueCodes: {
      otherCatalogues: ["OVE456"]
    }
  }
];

const Wrapper = ({ children }: { children: ReactElement }) => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>{children}</Provider>
  </QueryClientProvider>
);

const TestComponent = () => {
  const { reservablePidsFromAnotherLibrary } = useReservableFromAnotherLibrary(
    mockedManifestations as unknown as Manifestation[]
  );
  return (
    <p data-testid="test-id">{reservablePidsFromAnotherLibrary.join(", ")}</p>
  );
};

describe("useReservableFromAnotherLibrary", () => {
  afterEach(() => {
    cleanup();
  });

  it("should return reservable pids from another library", async () => {
    vi.mock("../../apps/material/helper", () => ({
      useGetHoldings: () => ({
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
      })
    }));
    render(
      <Wrapper>
        <TestComponent />
      </Wrapper>
    );

    const output = await screen.findByTestId("test-id");
    expect(output).toMatchInlineSnapshot(`
      <p
        data-testid="test-id"
      >
        870970-basis:27721257, 870970-basis:39022222
      </p>
    `);
  });
  // This test is not working as intended. Beacuse the mock is not working as intended.
  it.skip("should return an empty array if useGetHoldings does not return reservable items", async () => {
    vi.mock("../../apps/material/helper", () => ({
      useGetHoldings: () => ({
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
      })
    }));

    render(
      <Wrapper>
        <TestComponent />
      </Wrapper>
    );

    const output = await screen.findByTestId("test-id");
    // The snapshot should expect an empty array
    expect(output).toMatchInlineSnapshot(`
      <p
        data-testid="test-id"
      >
      </p>
    `);
  });
});
