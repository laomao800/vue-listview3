<template>
  <ElConfigProvider :locale="zhCn">
    <ListviewLayout
      ref="layoutRef"
      v-bind="mergedAttrs"
      @update-layout="handleUpdateLayout"
    >
      <template #header="scopedProps">
        <slot name="header" v-bind="scopedProps">
          <component :is="headerComponent" v-bind="mergedAttrs" />
        </slot>
      </template>

      <template #filterbar="scopedProps">
        <slot name="filterbar" v-bind="scopedProps">
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
        </slot>
      </template>

      <template #content="scopedProps">
        <slot v-bind="scopedProps">
          <component :is="contentComponent" v-bind="mergedAttrs">
            <template v-if="$slots['content-empty']" #content-empty="scoped">
              <slot name="content-empty" v-bind="scoped" />
            </template>
          </component>
        </slot>
      </template>

      <template #footer="scopedProps">
        <slot name="footer" v-bind="scopedProps">
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
        </slot>
      </template>
    </ListviewLayout>
  </ElConfigProvider>
</template>

<script lang="tsx" setup>
import type { Component } from 'vue'
import { watch } from 'vue'
import { ref, unref, computed, nextTick, useAttrs } from 'vue'
import { useThrottleFn } from '@vueuse/core'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { get } from '@/utils'
import ListviewLayout from '@/components/ListviewLayout.vue'
import ListviewHeader from '@/components/ListviewHeader.vue'
import ListviewFilterbar from '@/components/ListviewFilterbar.vue'
import ListviewContent from '@/components/ListviewContent.vue'
import ListviewContentFooter from '@/components/ListviewContentFooter.vue'
import { useProvideLvStore } from '@/useLvStore'

defineOptions({
  name: 'ListviewMain',
  inheritAttrs: false,
})

const emits = defineEmits([
  'filter-submit',
  'filter-reset',
  'before-request',
  'request-valid-error',
  'request-success',
  'request-error',
  'requested',
  'update:selection',
])

const props = defineProps({
  // Data request
  pressEnterSearch: { type: Boolean, default: true },
  autoload: { type: Boolean, default: true },
  requestUrl: { type: String, default: '' },
  requestMethod: { type: String, default: 'post' },
  requestConfig: { type: Object, default: () => ({}) },
  filterModel: { type: Object, default: () => ({}) },

  // Adv request
  requestHandler: { type: Function, default: null },
  transformRequestData: { type: Function, default: null },

  // Adv response
  transformResponseData: { type: Function, default: null },
  contentDataMap: {
    type: Object,
    default: () => ({
      items: 'result.items',
      total: 'result.total',
    }),
  },

  // Request error handler
  contentMessage: { type: [Object, String], default: null },
  validateResponse: { type: Function, default: null },
  resolveResponseErrorMessage: { type: Function, default: null },

  // Pager
  usePage: { type: [Object, Boolean], default: true },
  pageSize: { type: Number, default: 20 },
  pageSizes: { type: Array, default: () => [20, 50, 100] },
  pageAttrs: { type: Object, default: () => ({}) },
  pagePosition: { type: String, default: 'left' },

  replaceComponents: { type: Object, default: null },
})

const layoutRef = ref<any>(null)
const filterbarRef = ref(null)
const lvStoreRef = computed(() => unref(layoutRef)?.lvStore)

const unwatchStore = watch(lvStoreRef, () => {
  if (unref(lvStoreRef)) {
    unref(lvStoreRef).emitter.on('root-emit', ({ event, payload }: any) => {
      emits(event, payload)
    })
    unref(lvStoreRef).emitter.on('update:selection', (selection: any) => {
      emits('update:selection', selection)
    })
    unwatchStore()
  }
})

function _getReplaceComponent(name: string, defaultComp: Component) {
  return get(props.replaceComponents, name, defaultComp)
}

// ListviewProps
const attrs = useAttrs()
const mergedAttrs = computed<Record<string, any>>(() => ({
  ...props,
  ...attrs,
}))
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
const resetFilter = () => unref<any>(filterbarRef)?.resetFilter.call()
const search = (keepInPage: boolean) => unref(lvStoreRef).search(keepInPage)
const setContentMessage = (text: string, type: string, cleanData = false) =>
  unref(lvStoreRef).setContentMessage(text, type, cleanData)

// TODO: type fix
useProvideLvStore(unref(mergedAttrs) as any)

defineExpose({
  updateLayout,
  resetFilter,
  search,
  setContentMessage,
})
</script>
