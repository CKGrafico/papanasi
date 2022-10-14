import { create } from '@storybook/theming';

export const Themes = {
  manager: create({
    base: 'light',
    brandTitle: 'Papanasi - Universal UI Library',
    brandUrl: 'https://github.com/ckgrafico/papanasi',
    brandImage: 'https://raw.githubusercontent.com/CKGrafico/papanasi/main/docs/resources/logo-github.svg',
    colorSecondary: '#ad99ff',
    fontBase: '"Source Sans Pro", sans-serif'
  }),
  docs: create({
    base: 'light',
    fontBase: '"Source Sans Pro", sans-serif'
  })
};
