const path = require('path');

module.exports = {
  root: true,
  extends: ['odn'],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['tsup.config.ts', 'dist/'],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: [path.resolve(__dirname, '.tsconfig.json')],
      },
      node: true,
    },
  },
};
