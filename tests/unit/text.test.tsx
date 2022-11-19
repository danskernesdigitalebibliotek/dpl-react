import { configureStore, combineReducers } from "@reduxjs/toolkit";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { expect, test } from "vitest";
import { renderHook, act } from "@testing-library/react-hooks";
import textReducer from "../../src/core/text.slice";
import { useText } from "../../src/core/utils/text";

const store = configureStore({
  reducer: combineReducers({
    text: textReducer
  }),
  preloadedState: {
    text: {
      data: {
        simpleText: "This is a @simple test",
        placeholdersText: `{"type":"simple","text":["This is a text with a @placeholder embedded. Does it work? @result it does!"]}`,
        pluralText: `{"type":"plural","text":["You have 1 material on the waiting list","You have @count materials on the waiting list"]}`
      }
    }
  }
});

const Wrapper = ({ children }: { children: ReactNode }) => (
  <Provider store={store}> {children} </Provider>
);

test("Should strings with placeholders", () => {
  const { result } = renderHook(() => useText(), { wrapper: Wrapper });

  act(() => {
    const simpleOutput = result.current("simpleText", {
      placeholders: {
        "@simple": "simple"
      }
    });
    const placeholdersOutput = result.current("placeholdersText", {
      placeholders: {
        "@placeholder": "placeholder",
        "@result": "yes"
      }
    });

    expect(simpleOutput).toBe("This is a simple test");
    expect(placeholdersOutput).toBe(
      "This is a text with a placeholder embedded. Does it work? yes it does!"
    );
  });
});

test("Should handle plural text definitions", () => {
  const { result } = renderHook(() => useText(), { wrapper: Wrapper });

  act(() => {
    const pluralTextZeroOutput = result.current("pluralText", {
      count: 0
    });
    const pluralTextOneOutput = result.current("pluralText", {
      count: 1
    });
    const pluralTextMultipleOutput = result.current("pluralText", {
      count: 10,
      placeholders: { "@count": 10 }
    });

    expect(pluralTextZeroOutput).toBe(
      "You have 0 materials on the waiting list"
    );
    expect(pluralTextOneOutput).toBe("You have 1 material on the waiting list");
    expect(pluralTextMultipleOutput).toBe(
      "You have 10 materials on the waiting list"
    );
  });
});
