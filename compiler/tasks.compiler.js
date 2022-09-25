const Listr = require('listr');
const commandLineArgs = require('command-line-args');

const optionDefinitions = [
  { name: 'files', alias: 'f', type: String, multiple: true },
  { name: 'targets', alias: 't', type: String, multiple: true },
  { name: 'lint', type: Boolean, defaultValue: true },
  { name: 'no-lint', type: Boolean }
];

(async () => {
  const execa = (await import('execa')).command;

  const cliConfig = commandLineArgs(optionDefinitions);
  cliConfig.lint = cliConfig.lint && !cliConfig['no-lint'];

  function getCompilerCommand(target) {
    return `node ./compiler/targets/${target} ${cliConfig.files ? `--files ${cliConfig.files.join(' ')}` : ''}`;
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
      title: `Compile Mitosis components ${cliConfig.files?.join(', ') || ''}${
        cliConfig.files && cliConfig.targets ? ' -> ' : ''
      }${cliConfig.targets?.join(', ') || ''}`,
      task: () => {
        return new Listr(
          [
            {
              title: 'Compile Angular',
              enabled: () => cliConfig.targets?.includes('angular') || !cliConfig.targets,
              task: () =>
                execa(getCompilerCommand('angular')).catch(() => {
                  throw new Error('Error compiling Angular');
                })
            },
            {
              title: 'Compile React',
              enabled: () => cliConfig.targets?.includes('react') || !cliConfig.targets,
              task: () =>
                execa(getCompilerCommand('react')).catch(() => {
                  throw new Error('Error compiling React');
                })
            },
            {
              title: 'Compile Solid',
              enabled: () => cliConfig.targets?.includes('solid') || !cliConfig.targets,
              task: () =>
                execa(getCompilerCommand('solid')).catch(() => {
                  throw new Error('Error compiling Solid');
                })
            },
            {
              title: 'Compile Svelte',
              enabled: () => cliConfig.targets?.includes('svelte') || !cliConfig.targets,
              task: () =>
                execa(getCompilerCommand('svelte')).catch(() => {
                  throw new Error('Error compiling Svelte');
                })
            },
            {
              title: 'Compile Vue',
              enabled: () => cliConfig.targets?.includes('vue') || !cliConfig.targets,
              task: () =>
                execa(getCompilerCommand('vue')).catch(() => {
                  throw new Error('Error compiling Vue');
                })
            },
            {
              title: 'Compile Web Components',
              enabled: () => cliConfig.targets?.includes('webcomponents') || !cliConfig.targets,
              task: () =>
                execa(getCompilerCommand('webcomponents')).catch(() => {
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
              enabled: () => cliConfig.targets?.includes('angular') || !cliConfig.targets,
              task: () =>
                execa('yarn compile:lerna --scope=@papanasi/angular build').catch(() => {
                  throw new Error('Error bundling Angular');
                })
            },
            {
              title: 'Bundle React',
              enabled: () => cliConfig.targets?.includes('react') || !cliConfig.targets,
              task: () =>
                execa('yarn compile:lerna --scope=@papanasi/react build').catch(() => {
                  throw new Error('Error bundling React');
                })
            },
            {
              title: 'Bundle Solid',
              enabled: () => cliConfig.targets?.includes('solid') || !cliConfig.targets,
              task: () =>
                execa('yarn compile:lerna --scope=@papanasi/solid build').catch(() => {
                  throw new Error('Error bundling Solid');
                })
            },
            {
              title: 'Bundle Svelte',
              enabled: () => cliConfig.targets?.includes('svelte') || !cliConfig.targets,
              task: () =>
                execa('yarn compile:lerna --scope=@papanasi/svelte build').catch(() => {
                  throw new Error('Error bundling Svelte');
                })
            },
            {
              title: 'Bundle Vue',
              enabled: () => cliConfig.targets?.includes('vue') || !cliConfig.targets,
              task: () =>
                execa('yarn compile:lerna --scope=@papanasi/vue build').catch(() => {
                  throw new Error('Error bundling Vue');
                })
            },
            {
              title: 'Bundle Web Components',
              enabled: () => cliConfig.targets?.includes('webcomponents') || !cliConfig.targets,
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
