const path = require("path");
const glob = require("glob");
const BundleAnalyzerPlugin = require('@bundle-analyzer/webpack-plugin');

module.exports = (_env, argv) => {
  const production = argv.mode !== "development";

  const entry = glob.sync("./src/apps/**/*.mount.js").reduce((acc, path) => {
    const distPath = path.replace(/src\/apps\/.+\//, '').replace(".mount.js", "");
    acc[distPath] = path;
    return acc;
  }, {});

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
      extensions: ['.js', '.jsx', '.json']
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
    plugins: [new BundleAnalyzerPlugin({ token: process.env.BUNDLE_ANALYZER_TOKEN })]
  };
};
