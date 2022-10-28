const { Listr } = require('listr2');
const commandLineArgs = require('command-line-args');

const optionDefinitions = [
  { name: 'elements', alias: 'e', type: String, multiple: true },
  { name: 'platforms', alias: 'p', type: String, multiple: true },
  { name: 'lint', type: Boolean, defaultValue: true },
  { name: 'no-lint', type: Boolean }
];

(async () => {
  const execa = (await import('execa')).command;

  const cliConfig = commandLineArgs(optionDefinitions);
  cliConfig.lint = cliConfig.lint && !cliConfig['no-lint'];

  function getCompilerCommand(target) {
    return `node ./compiler/platforms/${target} ${
      cliConfig.elements ? `--elements ${cliConfig.elements.join(' ')}` : ''
    }`;
  }

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
              enabled: () => cliConfig.lint,
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
      title: `Compile Mitosis components ${cliConfig.elements?.join(', ') || ''}${
        cliConfig.elements && cliConfig.platforms ? ' -> ' : ''
      }${cliConfig.platforms?.join(', ') || ''}`,
      task: () => {
        return new Listr(
          [
            {
              title: 'Compile Angular',
              enabled: () => cliConfig.platforms?.includes('angular') || !cliConfig.platforms,
              task: () =>
                execa(getCompilerCommand('angular')).catch((error) => {
                  throw new Error('Error compiling Angular ' + error.message);
                })
            },
            {
              title: 'Compile Preact',
              enabled: () => cliConfig.platforms?.includes('preact') || !cliConfig.platforms,
              task: () =>
                execa(getCompilerCommand('preact')).catch((error) => {
                  throw new Error('Error compiling Preact ' + error.message);
                })
            },
            {
              title: 'Compile Qwik',
              enabled: () => cliConfig.platforms?.includes('qwik') || !cliConfig.platforms,
              task: () =>
                execa(getCompilerCommand('qwik')).catch((error) => {
                  throw new Error('Error compiling Qwik ' + error.message);
                })
            },
            {
              title: 'Compile React',
              enabled: () => cliConfig.platforms?.includes('react') || !cliConfig.platforms,
              task: () =>
                execa(getCompilerCommand('react')).catch((error) => {
                  throw new Error('Error compiling React ' + error.message);
                })
            },
            {
              title: 'Compile Solid',
              enabled: () => cliConfig.platforms?.includes('solid') || !cliConfig.platforms,
              task: () =>
                execa(getCompilerCommand('solid')).catch((error) => {
                  throw new Error('Error compiling Solid ' + error.message);
                })
            },
            {
              title: 'Compile Svelte',
              enabled: () => cliConfig.platforms?.includes('svelte') || !cliConfig.platforms,
              task: () =>
                execa(getCompilerCommand('svelte')).catch((error) => {
                  throw new Error('Error compiling Svelte ' + error.message);
                })
            },
            {
              title: 'Compile Vue',
              enabled: () => cliConfig.platforms?.includes('vue') || !cliConfig.platforms,
              task: () =>
                execa(getCompilerCommand('vue')).catch((error) => {
                  throw new Error('Error compiling Vue ' + error.message);
                })
            },
            {
              title: 'Compile Web Components',
              enabled: () => cliConfig.platforms?.includes('webcomponents') || !cliConfig.platforms,
              task: () =>
                execa(getCompilerCommand('webcomponents')).catch((error) => {
                  throw new Error('Error compiling Web Components ' + error.message);
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
              enabled: () => cliConfig.platforms?.includes('angular') || !cliConfig.platforms,
              task: () =>
                execa('yarn lerna --scope=@papanasi/angular build').catch((error) => {
                  throw new Error('Error bundling Angular ' + error);
                })
            },
            {
              title: 'Bundle Preact',
              enabled: () => cliConfig.platforms?.includes('preact') || !cliConfig.platforms,
              task: () =>
                execa('yarn lerna --scope=@papanasi/preact build').catch((error) => {
                  throw new Error('Error bundling Qwik ' + error);
                })
            },
            {
              title: 'Bundle Qwik',
              enabled: () => cliConfig.platforms?.includes('qwik') || !cliConfig.platforms,
              task: () =>
                execa('yarn lerna --scope=@papanasi/qwik build').catch((error) => {
                  throw new Error('Error bundling Qwik ' + error);
                })
            },
            {
              title: 'Bundle React',
              enabled: () => cliConfig.platforms?.includes('react') || !cliConfig.platforms,
              task: () =>
                execa('yarn lerna --scope=@papanasi/react build').catch((error) => {
                  throw new Error('Error bundling React ' + error);
                })
            },
            {
              title: 'Bundle Solid',
              enabled: () => cliConfig.platforms?.includes('solid') || !cliConfig.platforms,
              task: () =>
                execa('yarn lerna --scope=@papanasi/solid build').catch((error) => {
                  throw new Error('Error bundling Solid ' + error);
                })
            },
            {
              title: 'Bundle Svelte',
              enabled: () => cliConfig.platforms?.includes('svelte') || !cliConfig.platforms,
              task: () =>
                execa('yarn lerna --scope=@papanasi/svelte build').catch((error) => {
                  throw new Error('Error bundling Svelte ' + error);
                })
            },
            {
              title: 'Bundle Vue',
              enabled: () => cliConfig.platforms?.includes('vue') || !cliConfig.platforms,
              task: () =>
                execa('yarn lerna --scope=@papanasi/vue build').catch((error) => {
                  throw new Error('Error bundling Vue ' + error);
                })
            },
            {
              title: 'Bundle Web Components',
              enabled: () => cliConfig.platforms?.includes('webcomponents') || !cliConfig.platforms,
              task: () =>
                execa('yarn lerna --scope=@papanasi/webcomponents build').catch((error) => {
                  throw new Error('Error bundling Web Components ' + error);
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
