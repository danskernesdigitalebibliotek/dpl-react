import { RootState, useSelector } from "../store";
import { addConfigEntries } from "../config.slice";
import withSuffix from "./withSuffix";

export type UseConfigFunction = (key: string) => unknown;
export const useConfig = (): UseConfigFunction => {
  const { data } = useSelector((state: RootState) => state.config);

  return (key: string) => data?.[key];
};

export const withConfig = <T,>(Component: React.ComponentType<T>) => {
  return withSuffix(Component, "Config", addConfigEntries);
};

export default {};
