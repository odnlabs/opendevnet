import { defineConfig, Options } from 'tsup';

export default defineConfig((options: Options) => ({
  platform: 'node',
  entryPoints: ['src/index.tsx'],
  format: ['esm'],
  outDir: 'dist',
  external: ['react'],
  keepNames: true,
  treeshake: true,
  splitting: true,
  dts: true,
  minify: true,
  sourcemap: true,
  clean: true,
  ...options,
}));
