import { RootState, useSelector } from "../store";
import { addConfigEntries } from "../config.slice";
import withSuffix from "./withSuffix";

export type UseConfigFunction = <T>(
  key: string,
  options?: { jsonParse?: boolean; stringToArray?: boolean }
) => string | T[] | undefined;

export const useConfig = (): UseConfigFunction => {
  const { data } = useSelector((state: RootState) => state.config);

  return (key, options) => {
    if (!data?.[key]) {
      return undefined;
    }
    if (options?.jsonParse) {
      return JSON.parse(data[key]);
    }
    if (options?.stringToArray) {
      return data[key].split(",");
    }
    return data?.[key];
  };
};

export const withConfig = <T,>(Component: React.ComponentType<T>) => {
  return withSuffix(Component, "Config", addConfigEntries);
};

export default {};
