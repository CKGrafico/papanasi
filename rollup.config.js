import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import path from 'path';
import dtsPlugin from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import * as tsModule from 'typescript';
//import { visualizer } from 'rollup-plugin-visualizer';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const tsconfig = require('./tsconfig.json');
const typescript = require('rollup-plugin-ts');

const ts = tsModule.default;

export default async (options) => {
  const {
    dir,
    packageJson,
    prePlugins = [],
    postPlugins = [],
    external = [],
    dts = true,
    compilerOptions = {},
    babelPresets = [],
    babelPlugins = [],
    disableCoreCompilation = false,
    cancelBrowserListForTypescript = true
  } = options;

  const __dirname = dirname(fileURLToPath(import.meta.url));
  const dirnameConfig = path.resolve(__dirname, dir);

  const postcssConfig = (await import('./postcss.config.cjs')).default;

  tsconfig.compilerOptions = { ...tsconfig.compilerOptions, ...compilerOptions };

  const defaultPresets = ['@babel/preset-env', ['@babel/preset-typescript', tsconfig.compilerOptions]];

  const externals = Array.from(new Set([...external, '@trutoo/event-bus', 'ofetch']));

  const inputs = [
    disableCoreCompilation
      ? null
      : {
          input: options.input || path.resolve(dirnameConfig, 'src/index.ts'),
          output: [
            {
              file: packageJson.main,
              format: 'cjs',
              sourcemap: true,
              inlineDynamicImports: true
            },
            {
              file: packageJson.module,
              format: 'esm',
              sourcemap: true,
              inlineDynamicImports: true
            }
          ],
          treeshake: true,
          external: externals,
          plugins: [
            ...prePlugins,
            nodeResolve({
              extensions: ['.mjs', '.js', '.cjs', '.ts', '.tsx'],
              mainFields: ['module', 'main'],
              exportConditions: ['default', 'import', 'module']
            }),
            json(),
            typescript({
              browserslist: cancelBrowserListForTypescript ? false : undefined,
              tsconfig: { ...tsconfig.compilerOptions, emitDeclarationOnly: true }
            }),
            ...postPlugins,
            babel({
              plugins: [['@babel/plugin-proposal-decorators', { legacy: true }, ...babelPlugins]],
              extensions: ['.js', '.ts', '.tsx'],
              presets: babelPresets.length > 0 ? [...babelPresets, ...defaultPresets] : defaultPresets,
              babelHelpers: 'bundled',
              ignore: [/node_modules/]
            }),
            postcss(postcssConfig),
            peerDepsExternal(),
            commonjs()
            // visualizer() // TODO next version, use a strategy for visualizer
          ]
        },
    dts && !disableCoreCompilation
      ? {
          input: path.resolve(dirnameConfig, packageJson.module.replace('.js', '.d.ts')),
          output: [{ file: path.resolve(dirnameConfig, 'dist/index.d.ts'), format: 'esm' }],
          plugins: [dtsPlugin()]
        }
      : null
  ];

  return inputs.filter((x) => x);
};
