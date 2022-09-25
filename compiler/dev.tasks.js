const { Listr } = require('listr2');
const chokidar = require('chokidar');
const path = require('path');
const ora = require('ora');

(async () => {
  const execa = (await import('execa')).command;
  const { spawn } = require('node:child_process');

  const tasks = new Listr([
    {
      title: 'Launch Watcher',
      task: async () => {
        return chokidar
          .watch(['src/**/*', 'helpers/**/*', 'models/**/*', 'styles/**/*'])
          .on('all', async (event, pathName) => {
            if (event !== 'change') {
              return;
            }

            const file = path.parse(pathName);
            const name = file.dir.replace('src\\', '');
            const spinner = ora(`Changed ${name}, compiling... `).start();

            try {
              await execa(`node ./compiler/targets/react`);
            } catch (e) {
              spinner.text = `Error compiling ${e.message}.`;
              spinner.fail();

              return;
            }

            spinner.text = 'Compiled successfully.';
            spinner.succeed();
          });
      },
      options: {
        persistentOutput: true
      }
    },
    {
      title: 'Launch Storybook',
      task: () => {
        execa('yarn start-storybook -p 6006 --no-manager-cache');
        return true;
      }
    }
  ]);

  tasks.run().catch((err) => {
    console.error(err);
  });
})();
