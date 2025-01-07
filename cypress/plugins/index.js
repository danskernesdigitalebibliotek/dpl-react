const task = require("@cypress/code-coverage/task");
const webpackPreprocessor = require("@cypress/webpack-preprocessor");

module.exports = (on, config) => {
  task(on, config);

  const options = {
    webpackOptions: {
      resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        modules: ["node_modules", "src"]
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: [
              {
                loader: "ts-loader",
                options: {
                  transpileOnly: true,
                  compilerOptions: {
                    module: "esnext",
                    target: "es5",
                    lib: ["es5", "dom"],
                    jsx: "react",
                    allowJs: true,
                    esModuleInterop: true,
                    allowSyntheticDefaultImports: true,
                    noEmit: false
                  }
                }
              }
            ],
            exclude: /node_modules/
          }
        ]
      }
    }
  };

  on("file:preprocessor", webpackPreprocessor(options));

  return config;
};
