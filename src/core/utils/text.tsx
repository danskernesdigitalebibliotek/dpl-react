import { RootState, useSelector } from "../store";
import { addTextEntries } from "../text.slice";
import withSuffix from "./withSuffix";

export type UseTextFunction = (key: string) => string;
export const useText = (): UseTextFunction => {
  const { data } = useSelector((state: RootState) => state.text);
  return (key: string) => data?.[key] ?? key;
};

export const withText = <T,>(Component: React.ComponentType<T>) => {
  return withSuffix(Component, "Text", addTextEntries);
};

export default {};
