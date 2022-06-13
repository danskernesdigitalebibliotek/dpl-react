import { useEffect, useRef } from "react";

export const usePrevious = <Type>(value: Type) => {
  const ref = useRef<Type>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

export const getUrlQueryParam = (): null | string => {
  const queryParams = new URLSearchParams(window.location.search);
  return queryParams.get("q");
};

export default {};
