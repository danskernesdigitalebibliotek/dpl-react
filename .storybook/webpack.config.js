const path = require("path");

const customWebpack = require("../webpack.config.js");

// https://storybook.js.org/docs/configurations/custom-webpack-config/#full-control-mode
module.exports = async ({ config }) => {
  const custom = customWebpack(undefined, { mode: "development" });

  // Remove first rule since we don't need that.
  const [excludeRule, ...globalRules] = custom.module.rules;

  const rules = [
    ...globalRules,
    // We need to make use of css modules in our stories.
    {
      test: /\.scss$/,
      use: ["style-loader", "postcss-loader"],
      include: path.resolve(__dirname, "../")
    },
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ["babel-loader"],
      include: path.resolve(__dirname, "../")
    },
    // For some reason we need to split up babel-loader and eslint-loader
    // in order to get rid of eslint warnings like
    // [these](https://github.com/storybookjs/storybook/issues/10878).
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ["eslint-loader"],
      include: path.resolve(__dirname, "../src")
    }
  ];
  const plugins = [...config.plugins];
  return { ...config, plugins, module: { ...config.module, rules } };
};
