import { RootState, useSelector } from "../store";
import { addConfigEntries } from "../config.slice";
import withSuffix from "./withSuffix";

type ReturnValue<T> = T extends string ? string : T[];

type UseConfigFunction = <T>(
  key: string,
  options?: {
    transformer?: "jsonParse" | "stringToArray";
  }
) => ReturnValue<T>;

export const useConfig = (): UseConfigFunction => {
  const { data } = useSelector((state: RootState) => state.config);

  return (key, options) => {
    if (!data?.[key]) {
      return undefined;
    }
    if (options?.transformer === "jsonParse") {
      return JSON.parse(data[key]);
    }
    if (options?.transformer === "stringToArray") {
      return data[key].split(",");
    }
    return data?.[key];
  };
};

export const withConfig = <T,>(Component: React.ComponentType<T>) => {
  return withSuffix(Component, "Config", addConfigEntries);
};

export default {};
