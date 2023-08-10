const sharedConfig = require('tailwind-config/tailwind.config.js');

module.exports = {
  // prefix ui lib classes to avoid conflicting with the app
  content: ['src/**/*.{js,ts,jsx,tsx}'],
  prefix: 'ui-',
  presets: [sharedConfig],
};
