import { defineConfig, Options } from 'tsup';

export default defineConfig((options: Options) => ({
  entry: ['src/index.tsx'],
  format: ['esm'],
  dts: true,
  minify: true,
  clean: true,
  treeshake: true,
  splitting: true,
  external: ['react'],
  ...options,
}));
