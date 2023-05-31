<template>
  <div
    ref="wrapperRef"
    class="lv-wrapper"
    :style="{ height: parseSize(wrapperHeight) }"
  >
    <div ref="headerRef" class="lv-header-wrapper">
      <slot name="header" v-bind="scopeProps" />
    </div>
    <div ref="filterbarRef" class="lv-filterbar-wrapper">
      <slot name="filterbar" v-bind="scopeProps" />
    </div>
    <div v-loading="contentLoading" class="lv-body-wrapper">
      <div ref="contentRef" class="lv-content-wrapper">
        <slot name="content" v-bind="scopeProps" />
      </div>
      <div ref="footerRef" class="lv-footer-wrapper">
        <slot name="footer" v-bind="scopeProps" />
      </div>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { vLoading } from 'element-plus'
import {
  computed,
  nextTick,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  provide,
  ref,
  unref,
} from 'vue'

import { useLvStore } from '@/useLvStore'
import { parseSize } from '@/utils'

function isDom(item: any): item is Element {
  return item instanceof Element
}

function getIntStyleValue(el: Element, prototype: string) {
  return parseInt(getComputedStyle(el)[prototype as any], 10) || 0
}

function getElBottomOffset(el: Element) {
  if (!el) return 0

  const bottomOffset =
    getIntStyleValue(el, 'padding-bottom') +
    getIntStyleValue(el, 'margin-bottom') +
    getIntStyleValue(el, 'border-bottom-width')
  return bottomOffset
}

defineOptions({
  name: 'ListviewLayout',
  directives: {
    loading: vLoading,
  },
  inheritAttrs: false,
})

const props = defineProps({
  height: { type: [String, Number], default: null },
  fullHeight: { type: Boolean, default: true },
})

const emit = defineEmits(['updateLayout'])

const lvStore = useLvStore()
provide('lvStore', lvStore)

const scopeProps = computed(() => lvStore)
const wrapperRef = ref<Element | null>(null)
const contentRef = ref<Element | null>(null)
const footerRef = ref<Element | null>(null)
const wrapperHeight = ref<number | string | null>(null)
const contentHeight = computed({
  get: () => unref(lvStore.state.contentHeight),
  set(newVal) {
    lvStore.state.contentHeight = newVal
  },
})
const contentLoading = computed(() => !!unref(lvStore.state.contentLoading))
const bottomOffset = computed<number>(() =>
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  getElBottomOffset(unref(wrapperRef)!)
)

const _initListener = () => window.addEventListener('resize', updateLayout)
const _cleanListener = () => window.removeEventListener('resize', updateLayout)

async function updateLayout() {
  await nextTick()
  updateWrapperHeight()
  // 非全屏情况下，内部内容高度需等待外部渲染后再执行计算
  await nextTick()
  updateContentHeight()
  emit('updateLayout')
}
lvStore.emitter.on('updateLayout', updateLayout)

function updateWrapperHeight() {
  if (props.height) {
    wrapperHeight.value = props.height
  } else if (props.fullHeight) {
    const wrapOffsetTop = unref(wrapperRef)?.getBoundingClientRect().top || 0
    wrapperHeight.value = window.innerHeight - wrapOffsetTop
  } else {
    wrapperHeight.value = null
  }
}

function updateContentHeight() {
  const el = unref(wrapperRef)
  const height = props.height
  let maxHeight
  if (height) {
    if (/\d+%/.test(String(height))) {
      maxHeight = el?.getBoundingClientRect().height
    } else {
      maxHeight = parseInt(String(height), 10)
    }
  } else if (props.fullHeight) {
    maxHeight = unref(wrapperHeight) as number
  }

  if (maxHeight && isDom(unref(contentRef))) {
    const footerHeight = unref(footerRef)?.getBoundingClientRect().height || 0
    const contentTop = unref(contentRef)?.getBoundingClientRect().top || 0
    const contentOffsetTop = contentTop - (el?.getBoundingClientRect().top || 0)
    contentHeight.value =
      maxHeight - contentOffsetTop - unref(bottomOffset) - footerHeight
  }
}

onMounted(() => {
  updateLayout()
  _initListener()
})

onActivated(() => {
  updateLayout()
  _initListener()
})

onBeforeUnmount(() => {
  _cleanListener()
})

onDeactivated(() => {
  _cleanListener()
})

defineExpose({
  lvStore,
})
</script>

<style>
.lv-header-wrapper {
  margin: -10px -10px 10px;
}

.lv-body-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.lv-content-wrapper {
  flex: 1;
  overflow: auto;
}
</style>
