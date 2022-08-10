import React, { useEffect, useState } from "react";
import { RootState, store, useSelector } from "../store";
import { addUrlEntries } from "../url.slice";

export const useUrls = () => {
  const { data } = useSelector((state: RootState) => state.url);
  return data;
};

export const withUrl = <T,>(Component: React.ComponentType<T>) => {
  return (props: T) => {
    const [propsWithoutUrl, setPropsWithoutUrl] = useState({});

    useEffect(() => {
      const pattern = /.*Url$/g;
      // Match all props that ends with "Text".
      const urlEntries = Object.fromEntries(
        Object.entries(props).filter(([prop]) => {
          return String(prop).match(pattern);
        })
      );
      // and match all props that do NOT end with "Text".
      const nonUrlEntries = Object.fromEntries(
        Object.entries(props).filter(([prop]) => {
          return !String(prop).match(pattern);
        })
      );
      // If we do have props that are not text props
      // make sure they are set to state so we can use them in the returned component.
      if (Object.keys(nonUrlEntries).length) {
        setPropsWithoutUrl(nonUrlEntries);
      }
      // Put found texts in redux store.
      store.dispatch(
        addUrlEntries({
          entries: urlEntries
        })
      );
    }, [props]);

    // Since this is a High Order Functional Component
    // we do not know what props we are dealing with.
    // That is a part of the design.
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component {...(propsWithoutUrl as T)} />;
  };
};

export default {};
