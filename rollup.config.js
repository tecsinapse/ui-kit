import autoExternal from 'rollup-plugin-auto-external';
import commonjs from 'rollup-plugin-commonjs';
import localResolve from 'rollup-plugin-local-resolve';

import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import filesize from 'rollup-plugin-filesize';

import pkg from './package.json';

export default [
  {
    input: 'src/index.js',
    output: [
      { file: pkg.main, name: pkg.name, format: 'cjs' },
      { file: pkg.browser, name: pkg.name, format: 'umd' },
    ],
    plugins: [
      globals(),
      builtins(),
      babel({
        exclude: ['node_modules/**'],
      }),
      localResolve(),
      autoExternal(),
      resolve({
        module: true,
        jsnext: true,
        main: true,
        preferBuiltins: true,
        browser: true,
        modulesOnly: true,
      }),
      commonjs(),

      filesize(),
    ],
  },
];
