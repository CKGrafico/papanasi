import commandLineArgs from 'command-line-args';
import { Listr } from 'listr2';

const optionDefinitions = [
  { name: 'elements', alias: 'e', type: String, multiple: true },
  {
    name: 'platforms',
    alias: 'p',
    type: String,
    multiple: true,
    defaultValue: ['angular', 'preact', 'qwik', 'react', 'solid', 'svelte', 'vue', 'webcomponents']
  },
  { name: 'lint', type: Boolean, defaultValue: true },
  { name: 'no-lint', type: Boolean }
];

(async () => {
  const execa = (await import('execa')).command;

  const cliConfig = commandLineArgs(optionDefinitions);
  cliConfig.lint = cliConfig.lint && !cliConfig['no-lint'];

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
      title: 'Compile Themes',
      task: () =>
        execa('yarn themes').catch(() => {
          throw new Error('Cannot compile themes');
        })
    },
    {
      title: `Compile Mitosis Elements: ${cliConfig.elements?.join(', ') || 'all'}`,
      task: () => {
        return new Listr(
          cliConfig.platforms.map((platform) => ({
            title: `Compile ${platform}`,
            task: () =>
              execa(
                `node ./compiler/platforms/${platform} ${
                  cliConfig.elements ? `--elements ${cliConfig.elements.join(' ')}` : ''
                }`
              ).catch((error) => {
                throw new Error(`Error compiling ${platform} ${error.message}`);
              })
          })),
          { concurrent: true }
        );
      }
    },
    {
      title: `Bundle Packages: ${cliConfig.platforms?.join(', ') || ''}`,
      task: () =>
        execa(
          `yarn lerna --verbose --scope=@papanasi/${
            cliConfig.platforms.length > 1 ? `{${cliConfig.platforms?.join(',')}}` : cliConfig.platforms
          } build`
        ).catch((error) => {
          throw new Error('Error bundling Packages ' + error);
        })
    }
  ]);

  tasks.run().catch((err) => {
    console.error(err);
  });
})();
