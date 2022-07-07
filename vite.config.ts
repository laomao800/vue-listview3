import path, { resolve } from 'path'
import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import pkg from './package.json'

const depNames = Object.keys(pkg.dependencies)
depNames.push('vue')
const depNamesReg = new RegExp(`^(${depNames.join('|')})`)

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const plugins = [vue(), vueJsx(), DefineOptions()]
  let publicDir: UserConfig['publicDir'] = 'public'

  if (command === 'build') {
    plugins.push(visualizer())
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
      lib: {
        entry: resolve('./src/index.ts'),
        name: 'listview',
        fileName: 'index',
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
