import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { store } from "../store";

export default <T,>(
  Component: React.ComponentType<T>,
  suffix: string,
  reduxAction: ActionCreatorWithPayload<unknown, string>
) => {
  return (props: T) => {
    const [propsWithoutSuffix, setPropsWithoutSuffix] = useState({});

    useEffect(() => {
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
      // If we do have props that are not suffixed
      // make sure they are set to state so we can use them in the returned component.
      if (Object.keys(nonSuffixEntries).length) {
        setPropsWithoutSuffix(nonSuffixEntries);
      }
      // Put found urls in redux store.
      store.dispatch(
        reduxAction({
          entries: suffixEntries
        })
      );
    }, [props]);

    // Since this is a High Order Functional Component
    // we do not know what props we are dealing with.
    // That is a part of the design.
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component {...(propsWithoutSuffix as T)} />;
  };
};
