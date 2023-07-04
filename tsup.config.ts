import { defineConfig } from 'tsup';

export default defineConfig({
  sourcemap: false,
  minify: true,
  dts: true,
  format: ['esm'],
  outExtension: () => ({
    js: '.js',
  }),
  loader: {
    '.js': 'jsx',
  },
});
