import "./dev-fonts.scss";
import "../src/components/components.scss";
import "@danskernesdigitalebibliotek/dpl-design-system/build/css/base.css";
import getToken, {
  setToken,
  TOKEN_LIBRARY_KEY,
  TOKEN_USER_KEY
} from "../src/core/token";
import "../src/core/mount";
import Store from "../src/components/store";
import { store } from "../src/core/store";

import React from "react";
import { setStatusAuthenticated, updateStatus } from "../src/core/user.slice";

if (process.env.NODE_ENV === "test") {
  store.dispatch(
    updateStatus({
      hasToken: true
    })
  );
}

if (window.sessionStorage.getItem(TOKEN_USER_KEY)) {
  // We can use the user token because it atleast provide the same access as a library token.
  setToken(TOKEN_USER_KEY, window.sessionStorage.getItem(TOKEN_USER_KEY));
  setToken(TOKEN_LIBRARY_KEY, window.sessionStorage.getItem(TOKEN_USER_KEY));
}

// TODO: Using addon-redux would be much nicer, but it doesn't seem to
// be compatible with Storybook 6.
export const decorators = [
  Story => (
    <Store>
      <Story />
    </Store>
  )
];
