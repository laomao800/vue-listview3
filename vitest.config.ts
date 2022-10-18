/// <reference types="vitest" />

import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueMacros from 'unplugin-vue-macros/vite'

export default defineConfig({
  plugins: [
    VueMacros({
      setupSFC: {
        exclude: 'vitest.setup.ts',
      },
    }),
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    clearMocks: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    transformMode: {
      web: [/\.[jt]sx$/],
    },
    coverage: {
      provider: 'istanbul',
      reporter: ['lcov'],
      reportsDirectory: path.resolve(__dirname, 'tests/unit/coverage'),
    },
    deps: {
      inline: ['element-plus'],
    },
  },
})
