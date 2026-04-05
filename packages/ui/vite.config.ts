import { resolve } from 'node:path'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: () => 'index.mjs',
      cssFileName: 'components',
    },
    rollupOptions: {
      external: ['vue', 'reka-ui', 'class-variance-authority', 'clsx', 'tailwind-merge'],
    },
    outDir: 'dist',
    emptyOutDir: false,
  },
})
