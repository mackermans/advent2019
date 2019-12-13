module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'quote-props': ['error', 'as-needed'],
    'comma-dangle': ['error', 'always-multiline'],
    indent: ['error', 2, {
      SwitchCase: 1,
    }],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    '@typescript-eslint/no-use-before-define': ['warn'],
  }
};
