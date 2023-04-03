import chokidar from 'chokidar';
import { Listr } from 'listr2';
import ora from 'ora';
import path from 'path';

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
      title: 'Compile Themes',
      task: () =>
        execa('yarn themes').catch((error) => {
          throw new Error('Error compiling Themes' + error);
        })
    },
    {
      title: 'Compile React Components',
      task: () =>
        execa('node ./compiler/platforms/react').catch((error) => {
          throw new Error('Error compiling React' + error);
        })
    },
    {
      title: 'Bundle React',
      task: () =>
        execa('yarn lerna --verbose --scope=@papanasi/react build').catch((error) => {
          throw new Error('Error bundling React ' + error);
        })
    },
    {
      title: 'Launch Watcher',
      task: async (ctx, task) => {
        task.title = 'Watching for changes';

        return chokidar.watch(['src/**/*']).on('all', async (event, pathName) => {
          if (event !== 'change') {
            return;
          }

          const file = path.parse(pathName);
          const name = file.dir.replace('src\\', '');
          const spinner = ora(`Changed ${name}, compiling... `).start();

          try {
            await execa('node ./compiler/platforms/react --dev');
            await execa('yarn lerna --verbose --scope=@papanasi/react build');
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
  ]);

  tasks.run().catch((err) => {
    console.error(err);
  });
})();
