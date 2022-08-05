import React, { useEffect, useState } from "react";
import { RootState, store, useSelector } from "../store";
import { addTextEntries } from "../text.slice";

export type UseTextFunction = (key: string) => string;
export const useText = (): UseTextFunction => {
  const { data } = useSelector((state: RootState) => state.text);
  return (key: string) => data?.[key] ?? key;
};

export const withText = <T,>(Component: React.ComponentType<T>) => {
  return (props: T) => {
    const [propsWithoutText, setPropsWithoutText] = useState({});

    useEffect(() => {
      const pattern = /.*Text$/g;
      // Match all props that ends with "Text".
      const textEntries = Object.fromEntries(
        Object.entries(props).filter(([prop]) => {
          return String(prop).match(pattern);
        })
      );
      // and match all props that do NOT end with "Text".
      const nonTextEntries = Object.fromEntries(
        Object.entries(props).filter(([prop]) => {
          return !String(prop).match(pattern);
        })
      );
      // If we do have props that are not text props
      // make sure they are set to state so we can use them in the returned component.
      if (Object.keys(nonTextEntries).length) {
        setPropsWithoutText(nonTextEntries);
      }
      // Put found texts in redux store.
      store.dispatch(
        addTextEntries({
          entries: textEntries
        })
      );
    }, [props]);

    // Since this is a High Order Functional Component
    // we do not know what props we are dealing with.
    // That is a part of the design.
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component {...(propsWithoutText as T)} />;
  };
};

export default {};
