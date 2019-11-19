import { configure } from '@storybook/react';
import '../src/components/components.scss';
import { setToken } from '../src/core/setToken.js'

/**
 * DDB_TOKEN is set in ".storybook/webpack.config.js"
 * Look for it in DefinePlugin.
 */
setToken(DDB_TOKEN);
configure(require.context('../src', true, /\.dev\.js$/), module);