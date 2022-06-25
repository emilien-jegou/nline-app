import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import UnocssPlugin from '@unocss/vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    solidPlugin(),
    UnocssPlugin({
      // your config or in uno.config.ts
    }),
    eslint({
      include: /\.(jsx?|tsx?)$/,
      fix: true,
    }),
  ],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
});
