const task = require("@cypress/code-coverage/task");
const rc = require("@cypress/code-coverage/use-babelrc");

module.exports = (on, config) => {
  on("task", task);
  on("file:preprocessor", rc);
  return config;
};
