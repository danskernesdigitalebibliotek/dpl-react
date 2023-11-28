const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const VersionFile = require("webpack-version-file-plugin");
const { EnvironmentPlugin } = require("webpack");
const ESLintPlugin = require("eslint-webpack-plugin");
const { getWebPackEnvVariables } = require("./webpack.helpers");

module.exports = (_env, argv) => {
  const production = argv.mode === "production";

  const entry = glob
    .sync("./src/apps/**/*.mount.ts")
    .reduce((acc, entryPath) => {
      const distPath = entryPath
        .replace(/src\/apps\/.+\//, "")
        .replace(".mount.ts", "");
      acc[distPath] = entryPath;
      return acc;
    }, {});

  const plugins = [
    new EnvironmentPlugin({
      NODE_ENV: "development"
    }),
    new ESLintPlugin({
      files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
      context: path.resolve(__dirname, "./src"),
      useEslintrc: true
    })
  ];

  if (process.env.VERSION_FILE_NAME && process.env.VERSION_FILE_VERSION) {
    plugins.push(
      new VersionFile({
        template: path.join(__dirname, ".version.json.ejs"),
        outputFile: path.join(__dirname, "dist/version.json"),
        name: process.env.VERSION_FILE_NAME,
        version: process.env.VERSION_FILE_VERSION,
        // We intentionally do not use any information from package.json but
        // VersionFile require that we provide it.
        packageFile: path.join(__dirname, "package.json")
      })
    );
  }

  // Add environment variables to webpack in development mode
  if (!production) {
    const variables = getWebPackEnvVariables();
    if (variables) {
      plugins.push(new webpack.DefinePlugin(variables));
    }
  }

  return {
    entry: {
      ...entry,
      mount: "./src/core/mount.js"
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist")
    },
    mode: argv.mode,
    devtool: production ? "source-map" : "inline-source-map",
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        name: () => "bundle",
        chunks: "all"
      }
    },
    resolve: {
      extensions: [".js", ".jsx", ".tsx", ".ts", ".json"]
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"]
        },
        // We consume css and svg files from dpl-design-system package
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: "svg-url-loader"
            }
          ]
        }
      ]
    },
    stats: {
      assets: true,
      chunks: true,
      modules: true
    },
    plugins
  };
};
