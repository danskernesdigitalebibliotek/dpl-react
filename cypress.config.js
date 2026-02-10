// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from "cypress";
import plugins from "./cypress/plugins";

export default defineConfig({
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 10000,
  requestTimeout: 30000,
  retries: {
    runMode: 3,
    openMode: 0
  },
  e2e: {
    supportFile: "cypress/support/index.ts",
    specPattern: "./src/@(apps|components)/**/*.test.@(ts|tsx)",
    baseUrl: "http://localhost:57021",
    testIsolation: false,
    setupNodeEvents(on, config) {
      const terminalReportOptions = {
        printLogsToConsole: "onFail",
        printLogsToFile: "always",
        outputCompactLogs: 1,
        outputVerbose: false,
        includeSuccessfulHookLogs: false
      };
      require("cypress-terminal-report/src/installLogsPrinter")(
        on,
        terminalReportOptions
      );

      return plugins(on, config);
    }
  }
});
