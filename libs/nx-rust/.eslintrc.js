const path = require('path');

module.exports = {
  root: true,
  extends: ['odn'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: [path.resolve(__dirname, 'tsconfig.lib.json')],
  },
  ignorePatterns: ['jest.config.ts', '*.spec.ts', 'tsup.config.ts', 'dist/'],
  // ignorePatterns: ['!**/*'],
  rules: {
    'no-console': 0,
  },
  overrides: [
    {
      files: ['*.json'],
      parser: 'jsonc-eslint-parser',
      rules: {
        '@nx/dependency-checks': 'error',
      },
    },
    {
      files: ['./package.json', './executors.json'],
      parser: 'jsonc-eslint-parser',
      rules: {
        '@nx/nx-plugin-checks': 'error',
      },
    },
  ],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: [path.resolve(__dirname, 'tsconfig.lib.json')],
      },
      node: true,
    },
  },
};
