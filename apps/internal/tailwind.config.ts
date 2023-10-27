import type { Config } from 'tailwindcss';

import sharedConfig from 'tailwind-config/tailwind.config.js';

const config: Omit<Config, 'content'> = {
  presets: [sharedConfig],
};

export default config;
