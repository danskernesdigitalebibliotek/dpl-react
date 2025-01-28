import { configureStore, combineReducers } from "@reduxjs/toolkit";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { expect, test } from "vitest";
import { renderHook, act } from "@testing-library/react";
import configReducer from "../../core/config.slice";
import { useConfig } from "../../core/utils/config";

const store = configureStore({
  reducer: combineReducers({
    config: configReducer
  }),
  preloadedState: {
    config: {
      data: {
        someStringArrayConfig: "a,b,c",
        someJsonArrayConfig:
          '[{"animal": "Blue macaw parrot", "isBlue": true},{"animal": "Bee", "isBlue": false}]',
        someJsonObjectConfig: `{"title": "Think Again", "author": "Adam Grant"}`
      }
    }
  }
});

const Wrapper = ({ children }: { children: ReactNode }) => (
  <Provider store={store}> {children} </Provider>
);

test("Should handle config with string arrays", () => {
  const { result } = renderHook(() => useConfig(), { wrapper: Wrapper });
  const config = result.current;

  act(() => {
    const output = config("someStringArrayConfig", {
      transformer: "stringToArray"
    });

    expect(output).toStrictEqual(["a", "b", "c"]);
  });
});

test("Should handle config with array with objects", () => {
  const { result } = renderHook(() => useConfig(), { wrapper: Wrapper });
  const config = result.current;

  act(() => {
    const output = config("someJsonArrayConfig", {
      transformer: "jsonParse"
    });

    expect(output).toStrictEqual([
      { animal: "Blue macaw parrot", isBlue: true },
      { animal: "Bee", isBlue: false }
    ]);
  });
});

test("Should handle config with an object", () => {
  const { result } = renderHook(() => useConfig(), { wrapper: Wrapper });
  const config = result.current;

  act(() => {
    const output = config("someJsonObjectConfig", {
      transformer: "jsonParse"
    });

    expect(output).toStrictEqual({
      title: "Think Again",
      author: "Adam Grant"
    });
  });
});
