import task from "@cypress/code-coverage/task";
import webpackPreprocessor from "@cypress/webpack-preprocessor";
import installLogsPrinter from "cypress-terminal-report/src/installLogsPrinter";

export default (on, config) => {
  task(on, config);

  // Install cypress-terminal-report for better console logging
  installLogsPrinter(on, {
    printLogsToConsole: "always", // This will show logs for both passing and failing tests
    printLogsToFile: "always",
    outputRoot: config.projectRoot || ".",
    outputTarget: {
      "cypress-logs.txt": "txt",
      "cypress-logs.json": "json"
    },
    includeSuccessfulHookLogs: true,
    commandTrimLength: 2000, // Increase log length
    routeTrimLength: 8000 // Increase request/response log length
  });

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
                    target: "es2017",
                    lib: ["es2017", "dom"],
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
