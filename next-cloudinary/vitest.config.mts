import { defineConfig } from 'vitest/config';
import pkg from './package.json';

export default defineConfig({
  // Mirror the Babel replacement for src/constants/analytics.ts during tests
  define: {
    __NEXT_CLOUDINARY_VERSION__: JSON.stringify(pkg.version),
  },
});
