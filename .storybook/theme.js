import { create } from '@storybook/theming';

export const Themes = {
  manager: create({
    base: 'light',
    brandTitle: 'Papanasi - Universal UI Library',
    brandUrl: 'https://github.com/ckgrafico/papanasi',
    brandImage: 'https://raw.githubusercontent.com/CKGrafico/papanasi/main/docs/resources/logo-github.svg',
    fontBase: 'Source Sans Pro, sans-serif',
    colorPrimary: '#0675C1',
    colorSecondary: '#ad99ff',

    // UI
    appBg: '#f3f3f3',
    appContentBg: 'white',
    appBorderColor: '#C6C6C6',
    appBorderRadius: 4,

    // Typography
    fontBase: '"Source Sans Pro", sans-serif',
    fontCode: '"Inconsolata", monospace',

    // Text colors
    textColor: '#202020',
    textInverseColor: 'rgba(255,255,255,0.9)',

    // Toolbar default and active colors
    barTextColor: '#555555',
    barSelectedColor: '#202020',
    barBg: 'white'
  }),
  docs: create({
    base: 'light',
    fontBase: 'Source Sans Pro, sans-serif'
  })
};
