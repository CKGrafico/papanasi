const Listr = require('listr');

(async () => {
  const execa = (await import('execa')).command;

  const tasks = new Listr([
    {
      title: 'Compile all packages',
      task: () => {
        return new Listr(
          [
            {
              title: 'Compile Vue from Mitosis',
              task: (ctx, task) =>
                execa('yarn compile:vue').catch(() => {
                  task.skip('Error compiling Vue');
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
