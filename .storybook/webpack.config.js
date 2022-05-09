const path = require("path");

const customWebpack = require("../webpack.config.js");

// https://storybook.js.org/docs/configurations/custom-webpack-config/#full-control-mode
module.exports = async ({ config }) => {
  const custom = customWebpack(undefined, { mode: "development" });

  const rules = [
    ...custom.module.rules,
    // We consume css from the dpl-design-system package.
    {
      test: /\.css$/i,
      use: ["style-loader", "css-loader"],
      include: path.resolve(__dirname, "../")
    },
    // We need to make use of css modules in our stories.
    {
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "postcss-loader"],
      include: path.resolve(__dirname, "../")
    },
    // We consume svg files from dpl-design-system package
    {
      test: /\.svg$/,
      use: [
        {
          loader: "svg-url-loader",
          options: {
            limit: 10000
          }
        }
      ]
    }
  ];
  const plugins = [...config.plugins];
  return { ...config, plugins, module: { ...config.module, rules } };
};
