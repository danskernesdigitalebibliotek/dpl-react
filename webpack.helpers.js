const dotenv = require("dotenv");

const getEnvVariables = () => {
  return dotenv.config().parsed;
};
const convertEnvVariablesToWebpack = (env) =>
  Object.keys(env).reduce(
    (prev, next) => ({
      ...prev,
      [`process.env.${next}`]: JSON.stringify(env[next])
    }),
    {}
  );

exports.getWebPackEnvVariables = () => {
  const variables = getEnvVariables();
  return variables ? convertEnvVariablesToWebpack(variables) : null;
};
