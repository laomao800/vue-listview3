import path, { resolve } from 'path'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueMacros from 'unplugin-vue-macros'
import { defineConfig } from 'vite'
import type { UserConfig } from 'vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

import pkg from './package.json'

const depNames = [
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.peerDependencies),
]
const depNamesReg = new RegExp(`^(${depNames.join('|')})`)

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const plugins = [VueMacros.vite(), vue(), vueJsx(), cssInjectedByJsPlugin()]
  let publicDir: UserConfig['publicDir'] = 'public'

  if (command === 'build') {
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
