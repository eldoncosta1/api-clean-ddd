module.exports = {
  extends: [
    'google',
    'eslint-config-prettier',
    'plugin:vitest-globals/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto', singleQuote: true }],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
      },
    ],
    'require-jsdoc': ['off'],
    'new-cap': ['off'],
    camelcase: 'off',
  },
  env: {
    'vitest-globals/env': true,
  },
}
