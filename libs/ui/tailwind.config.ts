import type { Config } from 'tailwindcss';

import sharedConfig from '@odnlabs/tailwind-config/tailwind.config.js';

const config: Omit<Config, 'content'> = {
  // prefix: 'ui-',
  presets: [sharedConfig],
};

export default config;
