import { defineConfig } from 'tsup'
import { plugin as CopyAssetsPlugin } from './plugins/copy-assets';

export default defineConfig({
  minify: true,
  target: 'es2018',
  external: ['react'],
  sourcemap: true,
  dts: true,
  format: ['esm', 'cjs'],
  esbuildPlugins: [CopyAssetsPlugin]
})