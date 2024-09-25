// eslint-disable-next-line import/no-extraneous-dependencies
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "4trcdv",
  defaultCommandTimeout: 10000,
  testFiles: "@(apps|components)/**/*.test.@(ts|tsx)",
  integrationFolder: "./src",
  retries: {
    runMode: 3,
    openMode: 0
  },
  e2e: {
    baseUrl: "http://localhost:57021"
  }
});
