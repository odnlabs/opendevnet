import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    testTimeout: 30_000,
    reporters: ['verbose'],
    coverage: {
      enabled: true,
      exclude: ['**/node_modules/**', '**/dist/**'],
    },
  },
});
