import path, { resolve } from 'path'
import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import DefineOptions from 'unplugin-vue-define-options/vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import { visualizer } from 'rollup-plugin-visualizer'
import pkg from './package.json'

const depNames = Object.keys(pkg.dependencies)
depNames.push('vue')
const depNamesReg = new RegExp(`^(${depNames.join('|')})`)

process.env.NODE_ENV = 'development'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const plugins = [vue(), vueJsx(), DefineOptions(), cssInjectedByJsPlugin()]
  let publicDir: UserConfig['publicDir'] = 'public'

  if (command === 'build') {
    // plugins.push(visualizer())
    publicDir = false
  }

  return {
    publicDir,
    plugins,
    resolve: {
      alias: {
        '~': path.resolve(__dirname),
        '@': path.resolve(__dirname, 'src'),
      },
    },
    build: {
      // minify: false,
      lib: {
        entry: resolve('./src/index.ts'),
        name: 'listview',
        fileName: 'index',
        formats: ['es', 'cjs'],
      },
      rollupOptions: {
        external: (id) => depNamesReg.test(id),
        output: {
          globals: {
            'lodash-es': '_',
            'element-plus': 'ElementPlus',
            axios: 'axios',
          },
        },
      },
    },
  }
})
