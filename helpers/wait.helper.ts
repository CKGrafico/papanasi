export function wait(ms = 10): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function waitUntilTrue(condition: () => boolean, maxTime = 1000): Promise<void> {
  const startTime = performance.now();

  return new Promise((resolve) => {
    const loop = () => {
      const now = performance.now();

      if (now - startTime > maxTime) {
        throw new Error('Maximum time waiting for be true');
      }

      if (condition()) {
        resolve();
      } else {
        requestAnimationFrame(loop);
      }
    };

    loop();
  });
}
