export type ThemeConfig = {
  name: string;
  src: string;
};

const defaultThemesConfigs: ThemeConfig[] = [
  { name: 'papanasi', src: 'papanasi.css' },
  { name: 'sketch', src: 'sketch.css' }
];

export default function useThemeExtension(themesConfigs: ThemeConfig[] = []) {
  const configs = [...defaultThemesConfigs, ...themesConfigs];
  let currentTheme: string = null;

  function switchTheme(theme: string | null) {
    currentTheme = theme ? configs.find((x) => x.name === theme).name : null;

    console.log(currentTheme);
  }

  return { switchTheme };
}
