const path = require("path");
const fs = require("fs").promises
const DefinePlugin = require('webpack').DefinePlugin;
const chalk = require("chalk");

const customWebpack = require("../webpack.config.js");

// https://storybook.js.org/docs/configurations/custom-webpack-config/#full-control-mode
module.exports = async ({ config }) => {
  let tokens = {};
  try {
    tokens = await fs.readFile(path.resolve(__dirname, "../.tokens"), "utf8");
    tokens = JSON.parse(tokens);
  } catch (err) {
    console.warn(
      chalk.yellow("warn") + " => Could not find the .tokens file in root"
    );
  }
  ["user", "library"].forEach(type => {
    if (!tokens.hasOwnProperty(type)) {
      console.warn(
        chalk.yellow("warn") +
          ` => No ${type} entry in .tokens file. Requests to external services might not work!`
      );
    }
  });

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
      DDB_TOKEN_USER: tokens.hasOwnProperty("user")
        ? JSON.stringify(tokens.user)
        : null,
      DDB_TOKEN_LIBRARY: tokens.hasOwnProperty("library")
        ? JSON.stringify(tokens.library)
        : null,
      ENV: JSON.stringify(process.env.NODE_ENV)
    })
  ]
  return { ...config, plugins, module: { ...config.module, rules } };
};
