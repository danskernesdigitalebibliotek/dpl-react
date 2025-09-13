// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from "cypress";
import plugins from "./cypress/plugins";

export default defineConfig({
  projectId: "4trcdv",
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
      // Install cypress-terminal-report plugin with options
      const terminalReportOptions = {
        printLogsToConsole: 'always', // Always print logs to console
        printLogsToFile: 'always',    // Always log to file (if configured)
        outputCompactLogs: 1,         // Compact output
        outputVerbose: false,         // Less verbose output
        includeSuccessfulHookLogs: true, // Include logs from successful hooks
      };
      require('cypress-terminal-report/src/installLogsPrinter')(on, terminalReportOptions);
      
      return plugins(on, config);
    }
  }
});
