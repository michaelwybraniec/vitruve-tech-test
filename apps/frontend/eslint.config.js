const { FlatCompat } = require('@eslint/eslintrc');
const baseConfig = require('../../eslint.config.js');

const compat = new FlatCompat({
  recommendedConfig: {},
  // ... other options if any
});

module.exports = [
  ...compat.extends('eslint:recommended'),
  // Add other ESLint configurations or rules here
];
