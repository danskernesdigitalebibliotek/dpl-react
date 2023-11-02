import { describe, expect, it } from "vitest";
import React, { ReactNode } from "react";
import { configure, render } from "@testing-library/react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import InfoLabel from "../../components/atoms/labels/InfoLabel";
import ReservationStatusInfoLabel from "../../components/reservation/ReservationStatusInfoLabel";
import textReducer from "../../core/text.slice";

configure({
  testIdAttribute: "data-cy"
});

const store = configureStore({
  reducer: combineReducers({
    text: textReducer
  }),
  preloadedState: {
    text: {
      data: {
        reservationListLoanBeforeText: "Borrow before @date"
      }
    }
  }
});

const Wrapper = ({ children }: { children: ReactNode }) => (
  <Provider store={store}> {children} </Provider>
);

describe("InfoLabel", () => {
  it("Should show the markup for the simple info label", async () => {
    const { getByTestId } = render(<InfoLabel>Some text</InfoLabel>);

    const label = getByTestId("info-label");

    expect(label).toMatchSnapshot();
  });
});

describe("ReservationStatusInfoLabel", () => {
  it("Should show the markup for the for a reservation status for a reservation status info label", async () => {
    const { getByText } = render(
      <Wrapper>
        <ReservationStatusInfoLabel date="12-12-22 12:12" isDigital={false} />
      </Wrapper>
    );

    const label = getByText("Borrow before 12-12-2022");

    expect(label).toMatchSnapshot();
  });

  it("Should show the markup for the for a reservation status for a DIGITAL reservation status info label", async () => {
    const { getByText } = render(
      <Wrapper>
        <ReservationStatusInfoLabel date="12-12-22 12:12" isDigital />
      </Wrapper>
    );

    const label = getByText("Borrow before 12-12-2022 12:12");

    expect(label).toMatchSnapshot();
  });
});
