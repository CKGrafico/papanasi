const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const path = require('path');
const typescript = require('rollup-plugin-ts');
const postcss = require('rollup-plugin-postcss');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const dtsPlugin = require('rollup-plugin-dts');
const postcssConfig = require('./postcss.config.js');

module.exports = (options) => {
  const { dir, packageJson, plugins = [], external = [], dts = true, compilerOptions = {} } = options;

  const tsconfig = require(path.resolve(__dirname, './tsconfig.json'));
  tsconfig.compilerOptions = { ...tsconfig.compilerOptions, ...compilerOptions };

  const inputs = [
    {
      input: path.resolve(dir, 'src/index.ts'),
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
      external,
      plugins: [
        ...plugins,
        peerDepsExternal(),
        resolve.nodeResolve(),
        commonjs(),
        typescript({ tsconfig: tsconfig.compilerOptions }),
        postcss(postcssConfig)
      ]
    },
    {
      input: path.resolve(dir, '../../styles/themes/papanasi/index.css'),
      output: [
        {
          file: packageJson.style,
          sourcemap: true
        }
      ],
      plugins: [postcss({ ...postcssConfig, inject: false, extract: 'papanasi.css' })]
    }
  ];

  if (dts) {
    inputs.push({
      input: path.resolve(dir, packageJson.module.replace('.js', '.d.ts')),
      output: [{ file: path.resolve(dir, 'dist/index.d.ts'), format: 'esm' }],
      plugins: [dtsPlugin.default()]
    });
  }

  return inputs;
};
