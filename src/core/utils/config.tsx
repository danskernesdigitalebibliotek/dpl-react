import { RootState, useSelector } from "../store";
import { addConfigEntries } from "../config.slice";
import withSuffix from "./withSuffix";

function config(key: string): string;

function config<T>(
  key: string,
  options: {
    transformer: "jsonParse";
  }
): T;

function config(
  key: string,
  options: {
    transformer: "stringToArray";
  }
): string[];

function config(
  key: string,
  options: {
    transformer: "stringToNumber";
  }
): number;

function config<T>(key: string): T;

function config<T>(): T | string | string[] {
  return [];
}

export type UseConfigFunction = typeof config;

export const useConfig = (): UseConfigFunction => {
  const { data } = useSelector((state: RootState) => state.config);

  return (
    key: string,
    options?: {
      transformer?: "jsonParse" | "stringToArray" | "stringToNumber";
    }
  ) => {
    if (typeof data[key] !== "string") {
      throw new Error(`Config entry "${key}" is not defined.`);
    }
    if (options?.transformer === "jsonParse") {
      return JSON.parse(data[key]);
    }
    if (options?.transformer === "stringToArray") {
      return data[key].split(",");
    }
    if (options?.transformer === "stringToNumber") {
      return Number(data[key]);
    }
    return data?.[key];
  };
};

export const withConfig = <T extends object>(
  Component: React.ComponentType<T>
) => {
  return withSuffix(Component, "Config", addConfigEntries);
};

export default {};
