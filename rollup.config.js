import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import commonjs from 'rollup-plugin-commonjs';
import localResolve from 'rollup-plugin-local-resolve';

import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import filesize from 'rollup-plugin-filesize';

import pkg from './package.json';

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: pkg.main,
        name: pkg.name,
        globals: {
          react: 'React',
          'react-transition-group': 'ReactTransitionGroup',
          'styled-component': 'styled',
          '@material-ui/core': 'material-ui',
          '@material-ui/icons': 'material-ui',
          '@material-ui/styles': 'styles',
          '@mdi/js': 'js',
          '@mdi/react': 'Icon',
          'react-text-mask': 'MaskedInput',
          'material-ui-search-bar': 'SearchBar',
        },
        format: 'cjs',
        sourceMap: true,
      },
    ],

    plugins: [
      peerDepsExternal(),
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
        include: 'node_modules/**',
        namedExports: {
          'node_modules/@material-ui/core/colors/index.js': ['grey'],
          'node_modules/react-sizeme/dist/react-sizeme.js': ['SizeMe'],
          'node_modules/@material-ui/core/styles/index.js': ['createMuiTheme'],
          'node_modules/text-mask-core/dist/textMaskCore.js': ['conformToMask'],
          'node_modules/prop-types/index.js': [
            'array',
            'bool',
            'func',
            'number',
            'object',
            'string',
            'symbol',
            'any',
            'arrayOf',
            'element',
            'elementType',
            'instanceOf',
            'node',
            'objectOf',
            'oneOf',
            'oneOfType',
            'shape',
            'exact',
          ],
          'node_modules/react-dom/index.js': ['findDOMNode', 'createPortal'],
          'node_modules/react-is/index.js': [
            'ForwardRef',
            'isFragment',
            'Memo',
          ],
          'node_modules/@tecsinapse/es-utils/build/index.js': [
            'isEmptyOrNull',
            'isNotEmptyOrNull',
            'flatten',
            'getAnyFromArray',
            'omitDeep',
            'resolveObj',
            'isNotUndefOrNull',
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
