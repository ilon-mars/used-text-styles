/* eslint-env node */

module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  plugins: ['@typescript-eslint', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'es6',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
    'prettier/prettier': ['error'],
    '@typescript-eslint/no-explicit-any': ['off'],
    'class-methods-use-this': 'off',
    'global-require': 0,
  },
  env: {
    node: true,
  },
};
