const { Listr } = require('listr2');

(async () => {
  const execa = (await import('execa')).command;

  const tasks = new Listr([
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
      title: 'Launch Storybook',
      task: () => {
        execa('yarn start-storybook -p 6006 --no-manager-cache').catch((error) => {
          throw new Error(error);
        });

        return true;
      }
    },
    {
      title: 'Launch Watcher',
      task: () => {
        execa('chokidar "src/**/*" "styles/**/*" -c "node ./compiler/targets/react"').catch((error) => {
          throw new Error(error);
        });

        return true;
      }
    }
  ]);

  tasks.run().catch((err) => {
    console.error(err);
  });
})();
