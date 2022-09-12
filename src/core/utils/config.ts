import { RootState, useSelector } from "../store";
import withConfigSuffix from "./withConfigSuffix";

export type UseConfigFunction = (key: string) => string;
export const useConfig = (): UseConfigFunction => {
  const { data } = useSelector((state: RootState) => state.config);
  return (key: string) => data?.[key] ?? key;
};

export const withConfig = <T>(Component: React.ComponentType<T>) => {
  return withConfigSuffix(Component);
};

export default {};
