// @ts-ignore

module.exports = {
  extends: ['next/core-web-vitals', 'plugin:unicorn/recommended'],
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  plugins: ['prettier', 'react', 'react-hooks'],
  rules: {
    'react/no-children-prop': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/no-null': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
