import { configure, addParameters } from '@storybook/react';
import '../src/components/components.scss';

configure(require.context('../src', true, /\.stories\.js$/), module);