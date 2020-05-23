import "./dev-fonts.scss";
import "../src/components/components.scss";
import { setToken } from "../src/core/token";
import "../src/core/mount";

/**
 * Environment variables are set in ".storybook/webpack.config.js:
 * - DDB_TOKEN_USER
 * - DDB_TOKEN_LIBRARY
 * Look for them in DefinePlugin.
 */
const tokenConfigs = [
  {
    type: "user",
    value: DDB_TOKEN_USER,
    setValue: token => setToken("user", token)
  },
  {
    type: "library",
    value: DDB_TOKEN_LIBRARY,
    setValue: token => setToken("library", token)
  }
];

tokenConfigs.forEach(function(tokenConfig) {
  const { type, value } = tokenConfig;
  const valueKey = `ddb-token-${type}`;

  let token = localStorage.getItem(valueKey) || value;

  if (!token) {
    // We do not want to keep prompting people if they have already cancelled the prompt once.
    const seenKey = `ddb-token-${type}-prompt-seen`;
    const promptHasBeenCancelled = localStorage.getItem(seenKey);
    if (!promptHasBeenCancelled && ENV != "test") {
      token = window.prompt(
        `Do you have a ${type} token for Adgangsplatformen? Input it here.`
      );
      if (token === null) {
        // which means the prompt has been cancelled
        localStorage.setItem(seenKey, "seen");
      } else {
        localStorage.setItem(valueKey, token);
      }
    }
  }

  tokenConfig.setValue(token);
});

/**
 * This emulates the way we would set from the server that a user is authenticated aka. logged in.
 * In a production/server environment this value is set before "init()" in "/src/core/mount.js" has been run.
 * In this development instance we want to set explicitly to true after the "ddbReact" object has been initialized
 * as to not override the ddbReact object. We presume for now that if a user is in a development environment
 * they are authenticated and only in a development environment a token is available.
 */
window.ddbReact.userAuthenticated = true;
