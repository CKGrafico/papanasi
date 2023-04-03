import { Listr } from 'listr2';

(async () => {
  const execa = (await import('execa')).command;
  const themes = ['papanasi', 'sketch'];

  const tasks = new Listr([
    {
      title: `Compile Themes: ${themes.join(', ')}`,
      task: () => {
        return new Listr(
          themes.map((theme) => ({
            title: `Generate ${theme} theme`,
            task: () =>
              execa(`rollup -c rollup.themes.config.js --theme ${theme}`).catch(() => {
                throw new Error(`Cannot generate the theme ${theme}`);
              })
          })),
          { concurrent: true }
        );
      }
    }
  ]);

  tasks.run().catch((err) => {
    console.error(err);
  });
})();
