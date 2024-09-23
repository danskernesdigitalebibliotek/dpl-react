import React, { useMemo } from "react";
import { RootState, useSelector } from "../store";
import { addUrlEntries } from "../url.slice";
import { turnUrlStringsIntoObjects } from "./helpers/url";
import withSuffix from "./withSuffix";

export const useUrls = () => {
  const { data } = useSelector((state: RootState) => state.url);
  const urls = useMemo(() => turnUrlStringsIntoObjects(data), [data]);

  return (name: string, returnFalseIfUndefined = false) => {
    if (returnFalseIfUndefined) {
      return urls[name] || false;
    }

    if (!urls[name]) {
      throw new Error(`The url ${name} is not defined`);
    }

    return urls[name];
  };
};
export const withUrls = <T extends object>(
  Component: React.ComponentType<T>
) => {
  return withSuffix(Component, "Url", addUrlEntries);
};

export default {};
