import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import commonjs from 'rollup-plugin-commonjs';
import localResolve from 'rollup-plugin-local-resolve';

import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import filesize from 'rollup-plugin-filesize';

import pkg from './package.json';

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: pkg.main,
        name: pkg.name,
        format: 'cjs',
        sourcemap: true,
      },
    ],

    plugins: [
      peerDepsExternal(),
      builtins(),
      babel({
        exclude: ['node_modules/**'],
        extensions: ['.js'],
      }),
      localResolve(),
      resolve({
        jsnext: true,
        main: true,
        browser: true,
      }),
      commonjs({
        namedExports: {
          'node_modules/@material-ui/core/colors/index.js': ['grey'],
          'node_modules/@material-ui/core/styles/index.js': ['createMuiTheme'],
          'node_modules/text-mask-core/dist/textMaskCore.js': ['conformToMask'],
          'node_modules/prop-types/index.js': [
            'string',
            'bool',
            'array',
            'func',
            'oneOfType',
            'object',
          ],
          'node_modules/@material-ui/core/useMediaQuery/index.js': [
            'unstable_useMediaQuery',
          ],
        },
      }),

      filesize(),
    ],
    onwarn(warning, warn) {
      // skip certain warnings
      if (warning.code === 'THIS_IS_UNDEFINED') {
        return;
      }
      // Use default for everything else
      warn(warning);
    },
  },
];
