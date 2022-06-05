import React, { useEffect } from "react";
import { RootState, store, useSelector } from "../store";
import { setTextEntry } from "../text.slice";

export const useText = (): ((key: string) => string) => {
  const { data } = useSelector((state: RootState) => state.text);

  return (key: string) => data?.[key] ?? key;
};

export const withText = <T,>(Component: React.ComponentType<T>) => {
  return (props: T) => {
    useEffect(() => {
      // We do this in order to prevent an eslint error later.
      const values = { ...props };
      // Match all props that ends with "Text" and put them in redux store.
      (Object.keys(values) as Array<keyof T>).forEach((prop) => {
        const pattern = /.*Text$/g;
        if (String(prop).match(pattern)) {
          store.dispatch(
            setTextEntry({
              key: prop,
              value: values[prop]
            })
          );
        }
      });
    }, [props]);

    // Since this is a High Order Functional Component
    // we do not know what props we are dealing with.
    // That is a part of the design.
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component {...(props as T)} />;
  };
};

export default {};
