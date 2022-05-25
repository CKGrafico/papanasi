const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const path = require('path');
const typescript = require('@rollup/plugin-typescript');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
// const dts = require('rollup-plugin-dts');

module.exports = (dir, packageJson) => {
  return [
    {
      input: path.resolve(dir, 'src/index.js'),
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
      plugins: [
        peerDepsExternal(),
        resolve.nodeResolve(),
        commonjs(),
        typescript({ tsconfig: path.resolve(__dirname, './tsconfig.json') })
      ]
    }
    // {
    //   input: path.resolve(dir, 'dist/esm/types/index.d.ts'),
    //   output: [{ file: path.resolve(dir, 'dist/index.d.ts'), format: 'esm' }]
    //   // plugins: [dts()]
    // }
  ];
};
