const path = require("path");
const glob = require("glob");
const BundleAnalyzerPlugin = require("@bundle-analyzer/webpack-plugin");

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

  const plugins = [];
  if (process.env.BUNDLE_ANALYZER_TOKEN) {
    plugins.push(
      new BundleAnalyzerPlugin({ token: process.env.BUNDLE_ANALYZER_TOKEN })
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
