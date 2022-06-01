import { addons } from '@storybook/addons';
import favicon from '../docs/resources/favicon.ico';
import { Themes } from './theme';

const link = document.createElement('link');
link.setAttribute('rel', 'shortcut icon');
link.setAttribute('href', favicon);
document.head.appendChild(link);

addons.setConfig({
  theme: Themes.manager
});
