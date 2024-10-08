const { FlatCompat } = require('@eslint/eslintrc');
const recommendedConfig = require('@eslint/js').configs.recommended;
const nxPlugin = require('@nx/eslint-plugin');

const compat = new FlatCompat({
  recommendedConfig
});

module.exports = [
  ...compat.config({
    extends: ['plugin:@nx/javascript']
  }),
  {
    plugins: {
      '@nx': nxPlugin
    }
  }
];
