module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },

  globals: {
    window: true,
    define: true,
    require: true,
    module: true,
  },

  extends: [
    'plugin:react/recommended',
    'standard',
    'plugin:prettier/recommended',
  ],

  parser: '@babel/eslint-parser',

  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module',
    requireConfigFile: false,
    babelOptions: {
      presets: ["@babel/preset-react"]
    }
  },

  plugins: [
    'import',
    'react',
    'simple-import-sort',
    'unused-imports',
  ],

  settings: {
    'import/resolver': {
      alias: {
        map: mapAliases(),
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    },
    react: {
      version: 'detect'
    },
  },

  rules: {
    'dot-notation': 'off',
    'lines-between-class-members': ['warn', 'always'],
    'no-console': 'warn',
    'no-fallthrough': 'warn',
    'no-use-before-define': ["error", { "functions": false }],
    'no-unused-vars': 'off',
    'padding-line-between-statements': ['warn',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*'},
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var']},
    ],

    'import/export': 'off',
    'import/no-unresolved': 'error',

    'prettier/prettier': 'warn',

    'react/destructuring-assignment': ['warn', 'always', {
      ignoreClassFields: true
    }],
    "react/jsx-key": ['warn', {'checkKeyMustBeforeSpread': true}],
    'react/jsx-sort-props': ['warn', {
      'callbacksLast': true,
      'shorthandFirst': true,
      'shorthandLast': false,
      'ignoreCase': false,
      'noSortAlphabetically': false,
      'reservedFirst': true,
    }],
    'react/jsx-uses-react': 'warn',
    'react/jsx-uses-vars': 'warn',
    'react/prop-types': 'warn',
    'react/react-in-jsx-scope': 'off',
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
        '^(@|@@|@@(\\w+-?)*)(/.*(?<!\\.(jpe?g|png|svg|bmp|webp|css|scss|sass))$)',
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
        '\\.module\\.(css|scss|sass)$',
        '\\.scoped\\.(css|scss|sass)$',
        '\\.(css|scss|sass)$',
        // Images
        '^.+\\.bmp$',
        '^.+\\.jpe?g$',
        '^.+\\.png$',
        '^.+\\.svg$',
        '^.+\\.webp$'
      ],
    ] }],

    "unused-imports/no-unused-imports": "warn",
    "unused-imports/no-unused-vars": [ "warn", {
      "varsIgnorePattern": "^_$", "argsIgnorePattern": "^_$" }
    ]
  }
}

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

