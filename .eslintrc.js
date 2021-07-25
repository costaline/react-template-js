module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },

  globals: {
    window: true,
    define: true,
    require: true,
    module: true,
  },

  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
      es6: true,
    },
  },

  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      alias: {
        map: mapAliases(),
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    },
  },

  plugins: ['import', 'simple-import-sort'],

  extends: [
    'eslint:recommended',
    'react-app',
    'react-app/jest',
    'plugin:prettier/recommended',
  ],

  rules: {
    'lines-between-class-members': ['warn', 'always'],
    'no-console': 'warn',
    'no-fallthrough': ['warn'],
    'no-unused-vars': ['warn', {
      "varsIgnorePattern": "^_$", "argsIgnorePattern": "^_$"
    }],
    'padding-line-between-statements': ['warn',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*'},
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var']},
    ],

    'import/no-unresolved': 'error',
    'prettier/prettier': 'warn',

    'react/destructuring-assignment': ['warn', 'always'],
    "react/jsx-key": ['warn', {'checkKeyMustBeforeSpread': true}],
    'react/jsx-sort-props': ['warn', {
      'callbacksLast': true,
      'shorthandFirst': true,
      'shorthandLast': false,
      'ignoreCase': false,
      'noSortAlphabetically': false,
      'reservedFirst': true,
    }],
    'react/prop-types': 'warn',
    'react/self-closing-comp': ['warn', { component: true, html: true }],

    'simple-import-sort/exports': 'warn',
    'simple-import-sort/imports': ['warn', { groups: [
        [
          // React
          '^(react)$',
          // Node.js builtins
          `^(${require('module').builtinModules.join('|')})(/|$)`,
          // Other packages
          '^@?\\w'
        ],
        [
          // Side effects
          '^\\u0000'
        ],
        [
          // Alias imports
          '^(@|@@|@@(\\w+-?)*)(/.*(?<!\\.(jpe?g|png|svg|bmp|webp|s?css))$)',
          // Parent imports
          '^\\.\\.(?!/?$)',
          '^\\.\\./?$',
          // Relative imports
          '^\\./(?=.*!/)(?!/?$)',
          '^\\.(?!/?$)',
          '^\\./?$',
        ],
        [
          //Styles
          '\\.module\\.s?css$',
          '\\.scoped\\.s?css$',
          '\\.s?css$',
          // Images
          '^.+\\.bmp$',
          '^.+\\.jpe?g$',
          '^.+\\.png$',
          '^.+\\.svg$',
          '^.+\\.webp$'
        ]
      ]}],
  },
};

function mapAliases() {
  const { paths, baseUrl } = require('./jsconfig.json').compilerOptions;

  const toMappedAliases = ([a, p]) => {
    const [_, alias] = a.match(/^(.+)\/\*$/) || [];

    const toValidAlias = (el) => {
      const [_, path] = el.match(/^\.\/(.*)\/\*$/) || [];

      return [alias, baseUrl + (path ? '/' + path : '')];
    };

    return p.map(toValidAlias);
  };

  return Object.entries(paths).map(toMappedAliases).flat();
}
