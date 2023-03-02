import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['../next-cloudinary/src/index.ts'],
  minify: true,
  target: 'es2018',
  external: ['react'],
  sourcemap: true,
  dts: true,
  clean: true,
  format: ['esm', 'cjs'],
  outDir: './internals/next-cloudinary'
})