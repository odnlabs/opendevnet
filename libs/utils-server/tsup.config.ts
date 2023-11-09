import { defineConfig, Options } from 'tsup';

export default defineConfig((options: Options) => ({
  entryPoints: ['src/index.ts'],
  platform: 'node',
  format: ['cjs', 'esm'],
  outDir: 'dist',
  keepNames: true,
  treeshake: true,
  splitting: true,
  dts: true,
  minify: true,
  sourcemap: true,
  clean: true,
  ...options,
}));
