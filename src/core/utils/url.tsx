import React, { useMemo } from "react";
import { RootState, useSelector } from "../store";
import { addUrlEntries } from "../url.slice";
import { turnUrlStringsIntoObjects } from "./helpers/url";
import withSuffix from "./withSuffix";

export const useUrls = () => {
  const { data } = useSelector((state: RootState) => state.url);
  return useMemo(() => turnUrlStringsIntoObjects(data), [data]);
};
export const withUrls = <T,>(Component: React.ComponentType<T>) => {
  return withSuffix(Component, "Url", addUrlEntries);
};

export default {};
