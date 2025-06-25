module.exports = {
  extends: ['next/core-web-vitals'],
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  plugins: ['prettier', 'react', 'react-hooks'],
  rules: {
    'react/no-children-prop': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
