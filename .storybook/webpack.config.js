const path = require("path");
const webpack = require("../webpack.config.js");
// https://storybook.js.org/docs/configurations/custom-webpack-config/#full-control-mode
module.exports = async ({ config, mode }) => {
  const custom = webpack(undefined, { mode: 'development' })
  const rules = [
    ...custom.module.rules,
    // We need to make use of css modules in our stories.
    {
      test: /\.scss$/,
      use: ["style-loader", "postcss-loader"],
      include: path.resolve(__dirname, "../")
    }
  ];
  return { ...config, module: { ...config.module, rules } };
};
