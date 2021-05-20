const path = require("path");
const glob = require("glob");
const BundleAnalyzerPlugin = require("@bundle-analyzer/webpack-plugin");
const VersionFile = require("webpack-version-file-plugin");
const { EnvironmentPlugin } = require("webpack");

module.exports = (_env, argv) => {
  const production = argv.mode === "production";

  const entry = glob
    .sync("./src/apps/**/*.mount.js")
    .reduce((acc, entryPath) => {
      const distPath = entryPath
        .replace(/src\/apps\/.+\//, "")
        .replace(".mount.js", "");
      acc[distPath] = entryPath;
      return acc;
    }, {});

  const plugins = [
    new EnvironmentPlugin({
      NODE_ENV: "development"
    })
  ];
  if (process.env.BUNDLE_ANALYZER_TOKEN) {
    plugins.push(
      new BundleAnalyzerPlugin({ token: process.env.BUNDLE_ANALYZER_TOKEN })
    );
  }
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

  return {
    entry: {
      ...entry,
      mount: "./src/core/mount.js",
      polyfills: "./src/core/polyfills.js"
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
      extensions: [".js", ".jsx", ".json"]
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader", "eslint-loader"]
        }
      ]
    },
    stats: {
      entrypoints: false,
      modules: false
    },
    plugins
  };
};
