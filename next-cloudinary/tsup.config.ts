import { defineConfig, Options } from 'tsup'
import { plugin as CopyAssetsPlugin } from './plugins/copy-assets';

const commonConfig: Options = {
  minify: true,
  target: 'es2022',
  external: ['react'],
  dts: true,
  format: ['esm', 'cjs'],
  sourcemap: true,
  clean: true,
};

export default defineConfig([
  {
    ...commonConfig,
    entry: ['src/index.ts'],
    bundle: false,
    esbuildPlugins: [CopyAssetsPlugin] // Add plugin to copy assets on one of the entrypoints
  },
  {
    ...commonConfig,
    entry: ['src/helpers.ts']
  },
  {
    ...commonConfig,
    esbuildOptions(options) {
      options.banner = {
        js: '"use client";',
      };
    },
    entry: ['src/client.ts']
  },
]);