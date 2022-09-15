import withConfigSuffix from "./withConfigSuffix";

export const withConfig = <T>(Component: React.ComponentType<T>) => {
  return withConfigSuffix(Component);
};

export default {};
