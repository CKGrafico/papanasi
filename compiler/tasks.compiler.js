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
              task: () =>
                execa('yarn clean').catch(() => {
                  throw new Error('Cannot remove output directory');
                })
            },
            {
              title: 'Linting Components',
              task: () => {
                return new Listr(
                  [
                    {
                      title: 'Lint Scripts',
                      task: () =>
                        execa('yarn lint:scripts').catch(() => {
                          throw new Error('Error Linting Scripts');
                        })
                    },
                    {
                      title: 'Lint Styles',
                      task: () =>
                        execa('yarn lint:styles').catch(() => {
                          throw new Error('Error Linting Styles');
                        })
                    },
                    {
                      title: 'Lint Other Files',
                      task: () =>
                        execa('yarn lint:editor').catch(() => {
                          throw new Error('Error with Other Lintings');
                        })
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
              task: () =>
                execa('yarn compile:angular').catch(() => {
                  throw new Error('Error compiling Angular');
                })
            },
            {
              title: 'Compile React',
              task: () =>
                execa('yarn compile:react').catch(() => {
                  throw new Error('Error compiling React');
                })
            },
            {
              title: 'Compile Solid',
              task: () =>
                execa('yarn compile:solid').catch(() => {
                  throw new Error('Error compiling Solid');
                })
            },
            {
              title: 'Compile Svelte',
              task: () =>
                execa('yarn compile:svelte').catch(() => {
                  throw new Error('Error compiling Svelte');
                })
            },
            {
              title: 'Compile Vue',
              task: () =>
                execa('yarn compile:vue').catch(() => {
                  throw new Error('Error compiling Vue');
                })
            },
            {
              title: 'Compile Web Components',
              task: () =>
                execa('yarn compile:webcomponents').catch(() => {
                  throw new Error('Error compiling Web Components');
                })
            }
          ],
          { concurrent: true }
        );
      }
    },
    {
      title: 'Bundle Packages',
      task: () => {
        return new Listr(
          [
            {
              title: 'Bundle Angular',
              task: () =>
                execa('yarn compile:lerna --scope=@papanasi/angular build').catch(() => {
                  throw new Error('Error bundling Angular');
                })
            },
            {
              title: 'Bundle React',
              task: () =>
                execa('yarn compile:lerna --scope=@papanasi/react build').catch(() => {
                  throw new Error('Error bundling React');
                })
            },
            {
              title: 'Bundle Solid',
              task: () =>
                execa('yarn compile:lerna --scope=@papanasi/solid build').catch(() => {
                  throw new Error('Error bundling Solid');
                })
            },
            {
              title: 'Bundle Svelte',
              task: () =>
                execa('yarn compile:lerna --scope=@papanasi/svelte build').catch(() => {
                  throw new Error('Error bundling Svelte');
                })
            },
            {
              title: 'Bundle Vue',
              task: () =>
                execa('yarn compile:lerna --scope=@papanasi/vue build').catch(() => {
                  throw new Error('Error bundling Vue');
                })
            },
            {
              title: 'Bundle Web Components',
              task: () =>
                execa('yarn compile:lerna --scope=@papanasi/webcomponents build').catch(() => {
                  throw new Error('Error bundling Web Components');
                })
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
