import { config } from "dotenv";

const getEnvVariables = () => {
  return config().parsed;
};
const convertEnvVariablesToWebpack = (env) =>
  Object.keys(env).reduce(
    (prev, next) => ({
      ...prev,
      [`process.env.${next}`]: JSON.stringify(env[next])
    }),
    {}
  );

export function getWebPackEnvVariables() {
  const variables = getEnvVariables();
  return variables ? convertEnvVariablesToWebpack(variables) : null;
}
