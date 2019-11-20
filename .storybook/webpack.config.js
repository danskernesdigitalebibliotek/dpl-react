const path = require("path");
const fs = require("fs").promises
const DefinePlugin = require('webpack').DefinePlugin;
const chalk = require("chalk");

const customWebpack = require("../webpack.config.js");

// https://storybook.js.org/docs/configurations/custom-webpack-config/#full-control-mode
module.exports = async ({ config }) => {
  let token;
  try {
    token = await fs.readFile(path.resolve(__dirname, "../.token"), "utf8");
  } catch(err) {
    console.warn(chalk.red("warn") + " => Could not find the .token file in root");
  }
  if (!token) {
    console.warn(chalk.red("warn") + " => Token is empty. Requests to external services won't work!");
  }

  const custom = customWebpack(undefined, { mode: 'development' })
  const rules = [
    ...custom.module.rules,
    // We need to make use of css modules in our stories.
    {
      test: /\.scss$/,
      use: ["style-loader", "postcss-loader"],
      include: path.resolve(__dirname, "../")
    }
  ];
  const plugins = [
    ...config.plugins,
    new DefinePlugin({
      DDB_TOKEN: JSON.stringify(token)
    })
  ]
  return { ...config, plugins, module: { ...config.module, rules } };
};
