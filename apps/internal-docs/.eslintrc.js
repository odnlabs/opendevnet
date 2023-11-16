module.exports = {
  extends: ['slekup/next'],
  ignorePatterns: ['tailwind.config.ts'],
  parserOptions: {
    project: ['./tsconfig.json', './apps/internal-docs/tsconfig.json'],
  },
};
