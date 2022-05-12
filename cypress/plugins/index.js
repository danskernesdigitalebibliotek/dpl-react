const task = require("@cypress/code-coverage/task");
const browserify = require("@cypress/browserify-preprocessor");

// In order to use both babelrc and typescript in browserify
// we copy the functionality from @cypress/code-coverage/use-babelrc
// and merge it with the typescript setting.
// The plugin @cypress/code-coverage/use-babelrc basically
// sets babelrc: true in the browserify options.
const { browserifyOptions } = browserify.defaultOptions;
browserifyOptions.transform[1][1].babelrc = true;

module.exports = (on, config) => {
  task(on, config);
  on(
    "file:preprocessor",
    browserify({
      typescript: require.resolve("typescript"),
      browserifyOptions: {
        extensions: [".js", ".ts"],
        ...browserifyOptions
      }
    })
  );
  return config;
};
