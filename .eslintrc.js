module.exports = {
  env: {
    node: true,
    es6: true,
    'jest/globals': true
  },
  extends: [
    /* The order here matters: one overwrittes the other,
    please do NOT change the order */
    'standard-with-typescript',
    'plugin:jest/all'
  ],
  plugins: ['@typescript-eslint', 'jest'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    project: './tsconfig.eslint.json'
  },
  rules: {
    'no-unused-vars': 0,
    'jest/lowercase-name': 'off',
    indent: ['error', 2],
    '@typescript-eslint/explicit-function-return-type': 'off',
    'jest/no-hooks': 'off',
    'jest/prefer-inline-snapshots': 'off'
  },
  overrides: [
    {
      files: ['e2e_tests/**', '*.test.ts'],
      globals: {
        cy: 'readonly'
      }
    }
  ],
  ignorePatterns: [
    '__snapshots__',
    '*.gif',
    '*.ico',
    '*.jpeg',
    '*.jpg',
    '*.json',
    '*.md',
    '*.png',
    '*.snap',
    '*.svg',
    '*.webp',
    'next-env.d.ts',
    'node_modules'
  ]
}