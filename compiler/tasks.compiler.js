const Listr = require('listr');

(async () => {
  const execa = (await import('execa')).command;

  const tasks = new Listr([
    {
      title: 'Pretasks',
      task: () => {
        return new Listr(
          [
            {
              title: 'Clean output',
              task: (ctx, task) => execa('yarn clean').catch(() => task.skip('Cannot remove output directory'))
            },
            {
              title: 'Linting Components',
              task: () => {
                return new Listr(
                  [
                    {
                      title: 'Lint Scripts',
                      task: (ctx, task) => execa('yarn lint:scripts').catch(() => task.skip('Error Linting Scripts'))
                    },
                    {
                      title: 'Lint Styles',
                      task: (ctx, task) => execa('yarn lint:styles').catch(() => task.skip('Error Linting Styles'))
                    },
                    {
                      title: 'Lint Other Files',
                      task: (ctx, task) => execa('yarn lint:editor').catch(() => task.skip('Error with Other Lintings'))
                    }
                  ],
                  { concurrent: true }
                );
              }
            }
          ],
          { concurrent: true }
        );
      }
    },
    {
      title: 'Compile Mitosis components',
      task: () => {
        return new Listr(
          [
            {
              title: 'Compile Angular',
              task: (ctx, task) => execa('yarn compile:angular').catch(() => task.skip('Error compiling Angular'))
            },
            {
              title: 'Compile React',
              task: (ctx, task) => execa('yarn compile:react').catch(() => task.skip('Error compiling React'))
            },
            {
              title: 'Compile Solid',
              task: (ctx, task) => execa('yarn compile:solid').catch(() => task.skip('Error compiling Solid'))
            },
            {
              title: 'Compile Svelte',
              task: (ctx, task) => execa('yarn compile:svelte').catch(() => task.skip('Error compiling Svelte'))
            },
            {
              title: 'Compile Vue',
              task: (ctx, task) => execa('yarn compile:vue').catch(() => task.skip('Error compiling Vue'))
            },
            {
              title: 'Compile Webcomponents',
              task: (ctx, task) =>
                execa('yarn compile:webcomponents').catch(() => task.skip('Error compiling Webcomponents'))
            }
          ],
          { concurrent: true }
        );
      }
    }
  ]);

  tasks.run().catch((err) => {
    console.error(err);
  });
})();
