const path = require('path');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const babel = require('@rollup/plugin-babel').default;
const { visualizer } = require('rollup-plugin-visualizer');
const dtsPlugin = require('rollup-plugin-dts').default;
const typescript = require('rollup-plugin-ts');
const postcss = require('rollup-plugin-postcss');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const json = require('@rollup/plugin-json');
const postcssConfig = require('./postcss.config.js');

module.exports = (options) => {
  const {
    dir,
    packageJson,
    plugins = [],
    external = [],
    dts = true,
    compilerOptions = {},
    babelPresets = [],
    babelPlugins = [],
    disableCoreCompilation = false
  } = options;

  const tsconfig = require(path.resolve(__dirname, './tsconfig.json'));
  tsconfig.compilerOptions = { ...tsconfig.compilerOptions, ...compilerOptions };

  const defaultPresets = ['@babel/preset-env', ['@babel/preset-typescript', tsconfig.compilerOptions]];

  const inputs = [
    disableCoreCompilation
      ? null
      : {
          input: options.input || path.resolve(dir, 'src/index.ts'),
          output: [
            {
              file: packageJson.main,
              format: 'cjs',
              sourcemap: true
            },
            {
              file: packageJson.module,
              format: 'esm',
              sourcemap: true
            }
          ],
          treeshake: true,
          inlineDynamicImports: true,
          external,
          plugins: [
            ...plugins,

            resolve.nodeResolve({ extensions: ['.js', '.ts', '.tsx'] }),
            json(),
            typescript({ tsconfig: { ...tsconfig.compilerOptions, emitDeclarationOnly: true } }),
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
          input: path.resolve(dir, packageJson.module.replace('.js', '.d.ts')),
          output: [{ file: path.resolve(dir, 'dist/index.d.ts'), format: 'esm' }],
          plugins: [dtsPlugin()]
        }
      : null
  ];

  return inputs.filter((x) => x);
};
