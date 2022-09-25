const { Listr } = require('listr2');
const chokidar = require('chokidar');
const path = require('path');
const ora = require('ora');

(async () => {
  const execa = (await import('execa')).command;

  const tasks = new Listr([
    {
      title: 'Clean output',
      task: () =>
        execa('yarn clean').catch(() => {
          throw new Error('Cannot remove output directory');
        })
    },
    {
      title: 'Compile React Components',
      task: () =>
        execa('node ./compiler/targets/react').catch(() => {
          throw new Error('Error compiling React');
        })
    },
    {
      title: 'Bundle React',
      task: () =>
        execa('yarn lerna --scope=@papanasi/react build').catch(() => {
          throw new Error('Error bundling React');
        })
    },
    {
      title: 'Launch Watcher',
      task: async (ctx, task) => {
        task.title = 'Watching for changes';

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
              await execa('node ./compiler/targets/react');
              await execa('yarn lerna --scope=@papanasi/react build');
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
    }
    // {
    //   title: 'Launch Storybook',
    //   task: () => {
    //     // const spinner = ora(`Launching Storybook`).start();
    //     // const storybook = execa('yarn start-storybook -p 6006 --no-manager-cache');

    //     // storybook.stdout.on('data', (data) => {
    //     //   spinner.text = data.toString().replace(/\\n/g, '');
    //     // });

    //     // storybook.on('close', (code) => {
    //     //   spinner.text = `child process exited with code ${code}`;
    //     //   spinner.fail();
    //     // });

    //     // storybook.on('exit', (code) => {
    //     //   spinner.text = `child process exited with code ${code}`;
    //     //   spinner.fail();
    //     // });

    //     // storybook.on('error', (code) => {
    //     //   spinner.text = `child process exited with code ${code}`;
    //     //   spinner.fail();
    //     // });

    //     return true;
    //   },
    //   options: {
    //     persistentOutput: true
    //   }
    // }
  ]);

  tasks.run().catch((err) => {
    console.error(err);
  });
})();
