import { RootState, useSelector } from "../store";
import { setConfig } from "../config.slice";
import withSuffix from "./withSuffix";

export type UseConfigFunction = (key: string) => string;
export const useConfig = (): UseConfigFunction => {
  const { data } = useSelector((state: RootState) => state.config);
  return (key: string) => data?.[key] ?? key;
};

export const withConfig = <T>(Component: React.ComponentType<T>) => {
  return withSuffix(Component, "Config", setConfig);
};

export default {};
