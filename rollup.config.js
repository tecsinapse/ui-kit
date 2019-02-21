import autoExternal from 'rollup-plugin-auto-external';
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
      { file: pkg.main, name: pkg.name, format: 'cjs' },
      {
        file: pkg.browser,
        name: pkg.name,
        format: 'umd',
        globals: {
          react: 'React',
          'react-router': 'Link',
          'react-transition-group': 'ReactTransitionGroup',
          'styled-component': 'styled',
          'bootstrap-styled': 'Jumbotron',
          '@material-ui/core': 'material-ui',
          '@material-ui/icons': 'material-ui',
          classnames: 'cn',
        },
      },
    ],

    plugins: [
      builtins(),
      babel({
        exclude: ['node_modules/**'],
        extensions: ['.js'],
      }),
      localResolve(),
      autoExternal(),
      resolve({
        jsnext: true,
        main: true,
        browser: true,
      }),
      commonjs({
        include: 'node_modules/**',
        namedExports: {
          'node_modules/@material-ui/core/colors/index.js': ['grey'],
          'node_modules/@material-ui/core/styles/index.js': ['withStyles'],
          'node_modules/@material-ui/core/useMediaQuery/index.js': [
            'unstable_useMediaQuery',
          ],
          'node_modules/@material-ui/utils/node_modules/react-is/index.js': [
            'isValidElementType',
            'ForwardRef',
          ],
        },
      }),

      filesize(),
    ],
  },
];
