import { defineConfig, Options } from 'tsup'
import { plugin as CopyAssetsPlugin } from './plugins/copy-assets';

const commonConfig: Options = {
  minify: true,
  target: 'es2018',
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
    esbuildPlugins: [CopyAssetsPlugin] // Add plugin to copy assets on one of the entrypoints
  },
]);