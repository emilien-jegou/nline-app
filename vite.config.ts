import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import UnocssPlugin from '@unocss/vite';
import checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [
    solidPlugin(),
    UnocssPlugin({
      // your config or in uno.config.ts
    }),
    checker({
      typescript: true,
      eslint: {
        lintCommand: "eslint 'src/**/*.{ts,tsx,js,jsx}'",
        dev: {
          overrideConfig: {
            overrideConfig: {
              rules: {
                'no-console': 1,
              },
            },
          },
          logLevel: ['error', 'warning'],
        },
      },
    }),
  ],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
});
