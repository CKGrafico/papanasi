import { create } from '@storybook/theming';

export const Themes = {
  manager: create({
    base: 'light',
    brandTitle: 'Papanasi - Universal UI Library',
    brandUrl: 'https://github.com/ckgrafico/papanasi',
    brandImage: 'https://raw.githubusercontent.com/CKGrafico/papanasi/main/docs/resources/logo-github.svg'
  }),
  docs: create({
    base: 'light',
    fontBase: 'Work Sans, sans-serif'
  })
};
