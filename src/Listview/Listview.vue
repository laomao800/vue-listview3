<template>
  <StoreProvider ref="storeProviderRef" v-bind="mergedAttrs" @root-emit="$emit">
    <ListviewLayout
      ref="layoutRef"
      v-bind="mergedAttrs"
      @update-layout="handleUpdateLayout"
    >
      <template #header>
        <component :is="headerComponent" v-bind="mergedAttrs" />
      </template>
      <template #filterbar>
        <component
          :is="filterbarComponent"
          ref="filterbarRef"
          v-bind="mergedAttrs"
          @fold-change="handleFilterFold"
        >
          <template v-if="$slots['filterbar-top']" #filterbar-top>
            <slot name="filterbar-top" />
          </template>
          <template v-if="$slots['filterbar-bottom']" #filterbar-bottom>
            <slot name="filterbar-bottom" />
          </template>
          <template v-if="$slots['filterbar-left']" #filterbar-left>
            <slot name="filterbar-left" />
          </template>
          <template v-if="$slots['filterbar-right']" #filterbar-right>
            <slot name="filterbar-right" />
          </template>
          <template v-if="$slots['prepend-more']" #prepend-more>
            <slot name="prepend-more" />
          </template>
          <template v-if="$slots['append-more']" #append-more>
            <slot name="append-more" />
          </template>
          <template v-if="$slots['prepend-submit']" #prepend-submit>
            <slot name="prepend-submit" />
          </template>
          <template v-if="$slots['append-submit']" #append-submit>
            <slot name="append-submit" />
          </template>
        </component>
      </template>
      <template #content="props">
        <slot v-bind="props">
          <component :is="contentComponent" v-bind="mergedAttrs" />
        </slot>
      </template>
      <template #footer>
        <component :is="footerComponent" v-bind="mergedAttrs">
          <template v-if="$slots['footer-left']" #footer-left>
            <slot name="footer-left" />
          </template>
          <template v-if="$slots['footer-center']" #footer-center>
            <slot name="footer-center" />
          </template>
          <template v-if="$slots['footer-right']" #footer-right>
            <slot name="footer-right" />
          </template>
        </component>
      </template>
    </ListviewLayout>
  </StoreProvider>
</template>

<script lang="tsx" setup>
import type { Component } from 'vue'
import {
  ref,
  unref,
  computed,
  getCurrentInstance,
  nextTick,
  useAttrs,
} from 'vue'
import { useThrottleFn } from '@vueuse/core'
import { isPlainObject } from 'is-what'
import { get } from '@/utils'
import StoreProvider from '@/components/StoreProvider.vue'
import ListviewLayout from '@/components/ListviewLayout.vue'
import ListviewHeader from '@/components/ListviewHeader.vue'
import ListviewFilterbar from '@/components/ListviewFilterbar.vue'
import ListviewContent from '@/components/ListviewContent.vue'
import ListviewContentFooter from '@/components/ListviewContentFooter.vue'

defineOptions({
  inheritAttrs: false,
})

defineEmits([
  'filter-submit',
  'filter-reset',
  'before-request',
  'request-valid-error',
  'request-success',
  'request-error',
  'requested',
])

const storeProviderRef = ref(null)
const layoutRef = ref(null)
const filterbarRef = ref(null)
const _cur = getCurrentInstance()
const attrs = useAttrs()

function _getReplaceComponent(name: string, defaultComp: Component) {
  const _r: Record<string, any> = (_cur?.data?.replaceComponents__ as any) || {}
  return _r ? get(_r, name, defaultComp) : defaultComp
}

const mergedAttrs = computed<Record<string, any>>(() => {
  const _r: Record<string, any> = (_cur?.data?.presetProps__ as any) || {}
  return isPlainObject(_r) ? { ..._r, ...attrs } : attrs
})
const headerComponent = computed(() =>
  _getReplaceComponent('header', ListviewHeader)
)
const filterbarComponent = computed(() =>
  _getReplaceComponent('filterbar', ListviewFilterbar)
)
const contentComponent = computed(() =>
  _getReplaceComponent('content', ListviewContent)
)
const footerComponent = computed(() =>
  _getReplaceComponent('footer', ListviewContentFooter)
)

const _updateWrapperLayout = () => unref<any>(layoutRef)?.updateLayout?.call()
const _updateFilterLayout = () => unref<any>(filterbarRef)?.updateLayout?.call()
const handleUpdateLayout = () => nextTick().then(_updateFilterLayout)
const handleFilterFold = () => nextTick().then(_updateWrapperLayout)

const updateLayout = useThrottleFn(_updateWrapperLayout, 100)
const resetFilter = () => unref<any>(filterbarRef)?.handleFilterReset.call()
const search = (keepInPage: boolean) =>
  unref<any>(storeProviderRef)?.search(keepInPage)
const setContentMessage = (text: string, type: string, cleanData = false) =>
  unref<any>(storeProviderRef)?.setContentMessage(text, type, cleanData)

defineExpose({
  updateLayout,
  resetFilter,
  search,
  setContentMessage,
})
</script>
