import path from 'path';
import { UserConfigExport } from 'vite';
import dts from 'vite-dts';

export function getBaseViteConfig(dirname: string, override?: UserConfigExport): UserConfigExport {
  const isExternal = (id: string) => !id.startsWith('.') && !path.isAbsolute(id);

  return {
    esbuild: {
      jsxInject: "import React from 'react'"
    },
    build: {
      lib: {
        entry: path.resolve(dirname, 'index.ts'),
        formats: ['es']
      },
      rollupOptions: {
        external: isExternal
      }
    },
    plugins: [dts()],
    ...override
  };
}
