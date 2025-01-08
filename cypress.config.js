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
      return plugins(on, config);
    }
  }
});
