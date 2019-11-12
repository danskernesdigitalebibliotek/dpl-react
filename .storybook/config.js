import { configure, addParameters } from '@storybook/react';
import '../src/components/components.scss';

configure(require.context('../src', true, /\.dev\.js$/), module);