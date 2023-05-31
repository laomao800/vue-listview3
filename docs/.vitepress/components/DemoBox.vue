<template>
  <ClientOnly>
    <div class="db">
      <header class="db__header">
        <div class="db__tabs">
          <div
            class="db__tab"
            :class="{ 'db__tab--active': activeCode }"
            @click="activeCode = !activeCode"
          >
            <IconCode class="icon" />
            查看代码
          </div>

          <div
            v-if="rawCode"
            class="db__tab db__tab-link"
            @click="gotoCS(rawCode)"
          >
            <IconCodeSandbox class="icon" />
            CodeSandbox
          </div>
        </div>
      </header>

      <div class="db__content">
        <div v-show="!activeCode" class="db__demo">
          <component :is="demo" />
        </div>
        <div ref="codeRef" v-show="activeCode" class="db__code">
          <div class="vp-doc">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { getParameters } from 'codesandbox/lib/api/define'
import { ref, unref, computed } from 'vue'
import IconCode from './IconCode.vue'
import IconCodeSandbox from './IconCodeSandbox.vue'

defineProps({
  demo: {
    type: Object,
    required: true,
  },
  codesandbox: {
    type: String,
    default: '',
  },
})

const activeCode = ref(false)
const codeRef = ref(null)
const rawCode = computed(() => unref(codeRef)?.querySelector('pre')?.innerText)

function gotoCS(code: string) {
  const formEl = document.createElement('form')
  formEl.action = 'https://codesandbox.io/api/v1/sandboxes/define'
  formEl.method = 'POST'
  formEl.target = '_blank'
  const parametersEl = document.createElement('input')
  parametersEl.name = 'parameters'
  parametersEl.value = getParameters({
    files: {
      'package.json': {
        content: {
          scripts: {
            dev: 'vite',
          },
          dependencies: {
            vue: '^3.2.37',
            'normalize.css': '^8.0.1',
            '@laomao800/vue-listview': process.env.TARGET_VERSION || '3.x',
            mitt: '^3.0.0',
          },
          devDependencies: {
            '@vitejs/plugin-vue': '^3.0.3',
            '@vitejs/plugin-vue-jsx': '2.0.1',
            typescript: '^4.6.4',
            vite: '^3.0.7',
            'vue-tsc': '^0.39.5',
          },
        },
      },
      'App.vue': {
        content: code,
      },
      'main.ts': {
        content: `import 'normalize.css';
import { createApp } from "vue";
import { Listview, ListviewContainer } from '@laomao800/vue-listview'
import App from "./App.vue";
const app = createApp(App);
app.use(Listview)
app.use(ListviewContainer)
app.mount("#app");
      `,
      },
      'index.html': {
        content:
          `<!DOCTYPE html>
<html>
<body>
  <div id="app"></div>
  <script type="module" src="./main.ts"></scr` +
          `ipt>
</body>
</html>`,
      },
      'mock-list.json': {
        content: `{
    "success": true,
    "result": {
      "items": [
        {
          "id": "745785",
          "name": "月分却给据专放面志以选完其传什议政眼则党海意手展",
          "sale_price": 1864,
          "discount": 0.63,
          "seller": "曾杰",
          "date": "2016-06-14",
          "quantity": 99,
          "enable": false
        },
        {
          "id": "582245",
          "name": "级七其与问品利好保空北压放少研五思气六物受在",
          "sale_price": 527,
          "discount": 0.12,
          "seller": "郑平",
          "date": "1979-09-24",
          "quantity": 112,
          "enable": true
        }
    ]
  }
}`,
      },
      'vite.config.ts': {
        content: `import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from '@vitejs/plugin-vue-jsx';
export default defineConfig({ plugins: [vue(), vueJsx()] });
`,
      },
    },
  })
  formEl.appendChild(parametersEl)
  document.body.appendChild(formEl)
  formEl.submit()
  document.body.removeChild(formEl)
}
</script>
<style lang="less" scoped>
.db {
  // 修正按钮被 vitepress 默认主题头部导航栏遮挡
  position: relative;
  z-index: 20;

  &__header {
    width: 100%;
    height: 48px;
    padding: 4px 8px;
    background-color: var(--vp-c-bg-soft);
    border-bottom: 1px solid var(--vp-c-divider-light);
  }

  &__tabs {
    display: flex;
    gap: 8px;
  }

  &__tab {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    color: var(--vp-c-text-1);
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      color: var(--vp-c-brand);
    }

    &--active {
      background: var(--vp-c-bg);
      color: var(--vp-c-text-1);
      border-radius: 5px 5px 0 0;
      transform: translateY(5px);

      &:hover {
        color: var(--vp-c-text-2);
      }
    }

    svg {
      margin-right: 6px;
      width: 20px;
      height: 20px;
      fill: currentColor;
    }
  }

  ::v-deep(.language-vue) {
    margin: 0;
    border-radius: 0;
  }
}
</style>
