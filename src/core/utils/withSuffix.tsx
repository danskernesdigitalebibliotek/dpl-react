import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import React from "react";
import { store } from "../store";

export default function withSuffix<T extends object>(
  Component: React.ComponentType<T>,
  suffix: string,
  reduxAction: ActionCreatorWithPayload<unknown, string>
) {
  const component = (props: T) => {
    const pattern = new RegExp(`.*${suffix}$`, "g");

    // Match all props that ends with suffix.
    const suffixEntries = Object.fromEntries(
      Object.entries(props).filter(([prop]) => {
        return String(prop).match(pattern);
      })
    );
    // and match all props that do NOT end with suffix.
    const nonSuffixEntries = Object.fromEntries(
      Object.entries(props).filter(([prop]) => {
        return !String(prop).match(pattern);
      })
    );

    // Put found props in redux store - if any.
    if (Object.keys(suffixEntries).length) {
      store.dispatch(
        reduxAction({
          entries: suffixEntries
        })
      );
    }

    // Since this is a High Order Functional Component
    // we do not know what props we are dealing with.
    // That is a part of the design.
    return <Component {...(nonSuffixEntries as T)} />;
  };

  return component;
}
