const path = require("path");
const webpack = require("webpack");

const customWebpack = require("../webpack.config.js");

// https://storybook.js.org/docs/configurations/custom-webpack-config/#full-control-mode
module.exports = async ({ config }) => {
  const custom = customWebpack(undefined, { mode: "development" });

  const rules = [
    ...custom.module.rules,
    // We need to make use of css modules in our stories.
    {
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "postcss-loader"],
      include: path.resolve(__dirname, "../")
    }
  ];
  const plugins = [
    ...config.plugins,
    // Define process.env variables for browser environment
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.STORYBOOK_USER_TOKEN': JSON.stringify(process.env.STORYBOOK_USER_TOKEN || ''),
      'process.env.STORYBOOK_LIBRARY_TOKEN': JSON.stringify(process.env.STORYBOOK_LIBRARY_TOKEN || '')
    })
  ];
  return { ...config, plugins, module: { ...config.module, rules } };
};
