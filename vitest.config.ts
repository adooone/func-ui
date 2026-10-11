import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    // Testing-library's auto-cleanup registers through the global
    // afterEach hook, so globals stay on even though tests import
    // describe/it/expect explicitly.
    globals: true,
  },
});
