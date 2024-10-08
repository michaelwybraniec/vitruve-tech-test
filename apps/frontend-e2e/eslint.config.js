const { FlatCompat } = require('@eslint/eslintrc');
const recommendedConfig = require('@eslint/js').configs.recommended;
const baseConfig = require('../../eslint.config.js');

const compat = new FlatCompat({
  recommendedConfig
});

module.exports = [
  ...compat.extends('plugin:cypress/recommended'),
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {},
  },
];
