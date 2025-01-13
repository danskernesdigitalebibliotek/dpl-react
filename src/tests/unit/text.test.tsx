import { configureStore, combineReducers } from "@reduxjs/toolkit";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { expect, test } from "vitest";
import { renderHook, act } from "@testing-library/react";
import textReducer from "../../core/text.slice";
import { useText } from "../../core/utils/text";

const store = configureStore({
  reducer: combineReducers({
    text: textReducer
  }),
  preloadedState: {
    text: {
      data: {
        simpleText: "This is a @simple test",
        placeholdersText: `{"type":"simple","text":["This is a text with a @placeholder embedded. Does it work? @result it does!"]}`,
        pluralText: `{"type":"plural","text":["You have 1 material on the waiting list","You have @count materials on the waiting list"]}`,
        emptyStringText: ""
      }
    }
  }
});

const Wrapper = ({ children }: { children: ReactNode }) => (
  <Provider store={store}> {children} </Provider>
);

test("Should handle strings with placeholders", () => {
  const { result } = renderHook(() => useText(), { wrapper: Wrapper });
  // We name it t, because that is how we normally use it in the code.
  const t = result.current;

  act(() => {
    const simpleOutput = t("simpleText", {
      placeholders: {
        "@simple": "simple"
      }
    });
    const placeholdersOutput = t("placeholdersText", {
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
  // We name it t, because that is how we normally use it in the code.
  const t = result.current;

  act(() => {
    const pluralTextZeroOutput = t("pluralText", {
      count: 0
    });
    const pluralTextOneOutput = t("pluralText", {
      count: 1
    });
    const pluralTextMultipleOutput = t("pluralText", {
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

test("Should throw an error if the text definition is not found", () => {
  const { result } = renderHook(() => useText(), { wrapper: Wrapper });
  // We name it t, because that is how we normally use it in the code.
  const t = result.current;

  act(() => {
    expect(() => t("nonExistingText")).toThrowError(
      "The translation for nonExistingText is not defined."
    );
  });
});

test("Shouldn't throw an error if the text is an empty string", () => {
  const { result } = renderHook(() => useText(), { wrapper: Wrapper });
  // We name it t, because that is how we normally use it in the code.
  const t = result.current;

  act(() => {
    // This test would be failing if an error was thrown for empty strings.
    // That's why we don't need to define anything else here to know that it works.
    t("emptyStringText");
  });
});
