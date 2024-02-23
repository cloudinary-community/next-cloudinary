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
  },
  {
    ...commonConfig,
    entry: ['src/helpers.ts']
  },
  // moduleResolution: Node(10) support
  {
    ...commonConfig,
    entry: ['src/helpers.ts'],
    format: 'cjs',
    outDir: '.'
  },
]);