import { addons } from '@storybook/manager-api';
import { initialize } from './initialize';
import './storybook.css';
import { Themes } from './theme';

addons.setConfig({
  theme: Themes.manager
});

initialize();
