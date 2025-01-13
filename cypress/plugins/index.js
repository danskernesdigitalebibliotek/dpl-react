import task from "@cypress/code-coverage/task";
import webpackPreprocessor from "@cypress/webpack-preprocessor";

export default (on, config) => {
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
