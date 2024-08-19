const path = require("path");

const customWebpack = require("../webpack.config.js");

// https://storybook.js.org/docs/configurations/custom-webpack-config/#full-control-mode
module.exports = async ({ config }) => {
  const custom = customWebpack(undefined, { mode: "development" });

  const rules = [...custom.module.rules];
  const plugins = [...config.plugins];
  return { ...config, plugins, module: { ...config.module, rules } };
};
