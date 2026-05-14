'use strict';

module.exports = {
  printWidth: 100,
  plugins: ['prettier-plugin-ember-template-tag'],
  overrides: [
    {
      files: ['*.js', '*.ts', '*.cjs', '.mjs', '.cts', '.mts', '.gjs', '.gts'],
      options: {
        singleQuote: true,
        templateSingleQuote: false,
        trailingComma: 'es5',
      },
    },
  ],
};
