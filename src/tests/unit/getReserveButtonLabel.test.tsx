import { configureStore, combineReducers } from "@reduxjs/toolkit";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { expect, test } from "vitest";
import { act, renderHook } from "@testing-library/react-hooks";
import textReducer from "../../core/text.slice";
import { useText } from "../../core/utils/text";
import { getReserveButtonLabel } from "../../components/material/material-buttons/helper";

const store = configureStore({
  reducer: combineReducers({
    text: textReducer
  }),
  preloadedState: {
    text: {
      data: {
        reserveText: "Reserve",
        reserveMaterialTypeText: "Reserve @materialType",
        reserveFromAnotherLibraryText: "Reserve @materialType elsewhere",
        reserveFromAnotherLibraryWithoutMaterialTypeText: "Reserve elsewhere"
      }
    }
  }
});

const Wrapper = ({ children }: { children: ReactNode }) => (
  <Provider store={store}> {children} </Provider>
);

test("Should be able to handle fluid reservation button labels", () => {
  const { result } = renderHook(() => useText(), {
    wrapper: Wrapper
  });
  // We name it t, because that is how we normally use it in the code.
  const t = result.current;
  act(() => {
    const labelLargeButton = getReserveButtonLabel({
      size: "xlarge",
      isFluid: true,
      materialType: "Book",
      t
    });
    const labelSmallButton = getReserveButtonLabel({
      size: "small",
      isFluid: true,
      materialType: "Book",
      t
    });

    expect(labelLargeButton).toBe("Reserve Book elsewhere");
    expect(labelSmallButton).toBe("Reserve elsewhere");
  });
});

test("Should be able to handle 'normal' reservation button labels", () => {
  const { result } = renderHook(() => useText(), {
    wrapper: Wrapper
  });
  // We name it t, because that is how we normally use it in the code.
  const t = result.current;

  act(() => {
    const labelLargeButton = getReserveButtonLabel({
      size: "xlarge",
      isFluid: false,
      materialType: "Book",
      t
    });
    const labelSmallButton = getReserveButtonLabel({
      size: "small",
      isFluid: false,
      materialType: "Book",
      t
    });

    expect(labelLargeButton).toBe("Reserve Book");
    expect(labelSmallButton).toBe("Reserve");
  });
});
