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
    if (!promptHasBeenCancelled && process.env.NODE_ENV !== "test") {
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
