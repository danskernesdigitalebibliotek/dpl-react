import "./dev-fonts.scss";
import "../src/components/components.scss";
import { setToken } from "../src/core/token";
import "../src/core/mount";
import Store from "../src/components/store";
import { store } from "../src/core/store";
// Needed for the Store component.
import React from "react";
import { updateStatus } from "../src/core/user.slice";

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
    // We want to pretend that the user is authenticated.
    if (process.env.NODE_ENV === "test") {
      store.dispatch(updateStatus({
        hasToken: true
      }))
    }
  }

  tokenConfig.setValue(token);
});

// TODO: Using addon-redux would be much nicer, but it doesn't seem to
// be compatible with Storybook 6.
export const decorators = [
  (Story) => (
      <Store>
      <Story />
      </Store>
  ),
];
