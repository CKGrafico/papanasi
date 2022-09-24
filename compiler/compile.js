const Listr = require('listr');

(async () => {
  const execa = (await import('execa')).command;

  const tasks = new Listr([
    {
      title: 'Clean output',
      task: (ctx, task) => execa('yarn clean').catch(() => task.skip('Cannot remove output directory'))
    },
    {
      title: 'Compile Mitosis components',
      task: () => {
        return new Listr(
          [
            {
              title: 'Compile React',
              task: (ctx, task) => execa('yarn compile:react').catch(() => task.skip('Error compiling React'))
            },
            {
              title: 'Compile Vue',
              task: (ctx, task) => execa('yarn compile:vue').catch(() => task.skip('Error compiling Vue'))
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
