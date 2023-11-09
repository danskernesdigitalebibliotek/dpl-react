import { configureStore, combineReducers } from "@reduxjs/toolkit";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import configReducer from "../../core/config.slice";
import StatusBadge from "../../apps/loan-list/materials/utils/status-badge";

const store = configureStore({
  reducer: combineReducers({
    config: configReducer
  }),
  preloadedState: {
    config: {
      data: {
        expirationWarningDaysBeforeConfig: "6"
      }
    }
  }
});

const Wrapper = ({ children }: { children: ReactNode }) => (
  <Provider store={store}> {children} </Provider>
);
describe("Status Badge tests", () => {
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  beforeEach(() => {
    vi.useFakeTimers();
    const date = new Date("2023-11-09T12:00:00+0100");
    vi.setSystemTime(date);
  });

  test("Should not render anything if no props are given", () => {
    const { getByTestId } = render(
      <Wrapper>
        <div data-testid="badge-wrapper">
          <StatusBadge />
        </div>
      </Wrapper>
    );

    const html = getByTestId("badge-wrapper");

    expect(html).toMatchInlineSnapshot(`
    <div
      data-testid="badge-wrapper"
    />
  `);
  });

  test("Expiring soon warning if within threshold", () => {
    const { getByTestId } = render(
      <Wrapper>
        <div data-testid="badge-wrapper">
          <StatusBadge
            showBadgeWithDueDate
            // Since the due date is tomorrow and the warning threshold is set to within 6 days
            // we should get a warning.
            badgeDate="2023-11-10 12:00:00+0100"
            dangerText="Expired"
            warningText="Expiring soon"
          />
        </div>
      </Wrapper>
    );

    const html = getByTestId("badge-wrapper");

    expect(html).toMatchInlineSnapshot(`
      <div
        data-testid="badge-wrapper"
      >
        <div
          class="status-label status-label--warning"
        >
          Expiring soon
        </div>
      </div>
    `);
  });

  test("No label if outside of threshold", () => {
    const { getByTestId } = render(
      <Wrapper>
        <div data-testid="badge-wrapper">
          <StatusBadge
            showBadgeWithDueDate
            // This is one day over the threshold, so no warning should be shown.
            badgeDate="2023-11-16 12:00:00+0100"
            dangerText="Expired"
            warningText="Expiring soon"
          />
        </div>
      </Wrapper>
    );

    const html = getByTestId("badge-wrapper");

    expect(html).toMatchInlineSnapshot(`
      <div
        data-testid="badge-wrapper"
      />
    `);
  });

  test("Same day should show 'Expiring soon'", () => {
    const { getByTestId } = render(
      <Wrapper>
        <div data-testid="badge-wrapper">
          <StatusBadge
            showBadgeWithDueDate
            // We are at the exact same day/time as the due date,
            // so we should get a warning.
            badgeDate="2023-11-09 12:00:00+0100"
            dangerText="Expired"
            warningText="Expiring soon"
          />
        </div>
      </Wrapper>
    );

    const html = getByTestId("badge-wrapper");

    expect(html).toMatchInlineSnapshot(`
      <div
        data-testid="badge-wrapper"
      >
        <div
          class="status-label status-label--warning"
        >
          Expiring soon
        </div>
      </div>
    `);
  });

  test("One day over should show 'Expired'", () => {
    const { getByTestId } = render(
      <Wrapper>
        <div data-testid="badge-wrapper">
          <StatusBadge
            showBadgeWithDueDate
            // We are one day over the due date, so we should get a warning.
            badgeDate="2023-11-08 12:00:00+0100"
            dangerText="Expired"
            warningText="Expiring soon"
          />
        </div>
      </Wrapper>
    );

    const html = getByTestId("badge-wrapper");

    expect(html).toMatchInlineSnapshot(`
      <div
        data-testid="badge-wrapper"
      >
        <div
          class="status-label status-label--danger"
        >
          Expired
        </div>
      </div>
    `);
  });
});
