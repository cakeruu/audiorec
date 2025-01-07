import { defineConfig } from 'vite'
import path from 'node:path'
import electron from 'vite-plugin-electron/simple'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    electron({
      main: {
        entry: path.join(__dirname, 'electron/main.ts'),
        vite: {
          build: {
            rollupOptions: {
              output: {
                format: 'es',
                entryFileNames: '[name].js'
              }
            }
          },
        },
      },
      preload: {
        input: path.join(__dirname, 'electron/preload.ts'),
        vite: {
          build: {
            rollupOptions: {
              output: {
                format: 'es',
                entryFileNames: '[name].mjs'
              }
            }
          },
        },
      },
      renderer: process.env.NODE_ENV === 'test'
        // https://github.com/electron-vite/vite-plugin-electron-renderer/issues/78#issuecomment-2053600808
        ? undefined
        : {},
    }),
  ],
})
