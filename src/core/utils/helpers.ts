import { useEffect, useRef } from "react";
import { FaustId, Pid } from "./types/ids";

export const usePrevious = <Type>(value: Type) => {
  const ref = useRef<Type>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

export const getUrlQueryParam = (param: string): null | string => {
  const queryParams = new URLSearchParams(window.location.search);
  return queryParams.get(param);
};

export const convertPostIdToFaustId = (postId: Pid): FaustId | null => {
  const matches = postId.match(/^[0-9]+-[a-z]+:([0-9]+)$/);
  return matches?.[1] ? (matches?.[1] as FaustId) : null;
};
