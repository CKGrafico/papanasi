export type ThemeConfig = {
  name: string;
  importer: () => Promise<any>;
};

const defaultThemesConfigs: ThemeConfig[] = [
  {
    name: 'papanasi',
    importer: async () => {
      const a = await import('./papanasi.css');
      debugger;
      return a;
    }
  }
];

export default function useThemeExtension(themesConfigs: ThemeConfig[] = []) {
  const configs = [...defaultThemesConfigs, ...themesConfigs];
  let currentTheme: ThemeConfig = null;

  function switchTheme(theme: string | null) {
    currentTheme = theme ? configs.find((x) => x.name === theme) : null;

    currentTheme.importer();
    console.log(currentTheme);
  }

  return { switchTheme };
}
