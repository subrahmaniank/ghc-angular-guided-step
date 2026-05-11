// Learn more about Vitest configuration options at https://vitest.dev/config/
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '~environments': resolve(__dirname, 'src/environments'),
      '~locale': resolve(__dirname, 'src/locale'),
      '~core': resolve(__dirname, 'src/app/core'),
      '~shared': resolve(__dirname, 'src/app/shared'),
      '~features': resolve(__dirname, 'src/app/features'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['vitest-setup.config.ts'],
    coverage: {
      reportsDirectory: 'coverage',
      exclude: ['**/*.html'],
    },
    globals: true,
  },
});
