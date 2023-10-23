module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-odn`
  extends: ['odn'],
  settings: {
    next: {
      rootDir: ['apps/*/', 'packages/*/'],
    },
  },
};
