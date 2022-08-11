import React, { useEffect, useMemo, useState } from "react";
import { RootState, store, useSelector } from "../store";
import { addUrlEntries } from "../url.slice";
import { turnUrlStringsIntoObjects } from "./helpers/url";

export const useUrls = () => {
  const { data } = useSelector((state: RootState) => state.url);
  return useMemo(() => turnUrlStringsIntoObjects(data), [data]);
};

export const withUrls = <T,>(Component: React.ComponentType<T>) => {
  return (props: T) => {
    const [propsWithoutUrl, setPropsWithoutUrl] = useState({});

    useEffect(() => {
      const pattern = /.*Url$/g;
      // Match all props that ends with "Url".
      const urlEntries = Object.fromEntries(
        Object.entries(props).filter(([prop]) => {
          return String(prop).match(pattern);
        })
      );
      // and match all props that do NOT end with "Url".
      const nonUrlEntries = Object.fromEntries(
        Object.entries(props).filter(([prop]) => {
          return !String(prop).match(pattern);
        })
      );
      // If we do have props that are not url props
      // make sure they are set to state so we can use them in the returned component.
      if (Object.keys(nonUrlEntries).length) {
        setPropsWithoutUrl(nonUrlEntries);
      }
      // Put found urls in redux store.
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
