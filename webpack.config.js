const path = require("path");
const glob = require("glob");

module.exports = (_env, argv) => {
  const production = argv.mode !== "development";

  const entry = glob.sync("./src/apps/**/*.mount.js").reduce((acc, path) => {
    const distPath = path.replace(/src\/apps\/.+\//, '').replace(".mount.js", "");
    acc[distPath] = path;
    return acc;
  }, {});

  return {
    entry,
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist")
    },
    devtool: production ? "source-map" : "inline-source-map",
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        name: () => "bundle",
        chunks: "all"
      }
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
    }
  };
};
