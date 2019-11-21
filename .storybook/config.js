import { configure } from '@storybook/react';
import '../src/components/components.scss';
import getToken, { setToken } from '../src/core/token.js'

let token = getToken();
if (!token) {
  token = window.prompt("Do you have a token? Input it here.");
}

/**
 * DDB_TOKEN is set in ".storybook/webpack.config.js"
 * Look for it in DefinePlugin.
 */
setToken(token || DDB_TOKEN);
configure(require.context('../src', true, /\.dev\.js$/), module);