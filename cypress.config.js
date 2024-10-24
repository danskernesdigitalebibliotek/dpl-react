// eslint-disable-next-line import/no-extraneous-dependencies
const { defineConfig } = require("cypress");

module.exports = defineConfig({
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
    testIsolation: false
  }
});
