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

          <div v-if="rawCode" class="db__tab db__tab-link" @click="gotoCS">
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

function gotoCS() {}
</script>
<style lang="less" scoped>
.db {
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
