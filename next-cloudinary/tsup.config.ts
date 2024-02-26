import { defineConfig, Options } from 'tsup'
import { plugin as CopyAssetsPlugin } from './plugins/copy-assets';

const commonConfig: Options = {
  dts: true,
  external: ['react'],
  format: ['esm', 'cjs'],
  minify: true,
  sourcemap: true,
};

export default defineConfig([
  {
    ...commonConfig,
    entry: ['src/index.ts'],
    esbuildPlugins: [CopyAssetsPlugin] // Add plugin to copy assets on one of the entrypoints
  }
]);