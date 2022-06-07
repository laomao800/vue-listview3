<template>
  <div
    ref="wrapperRef"
    :style="{ height: parseSize(wrapperHeight) }"
    class="lv__wrapper"
  >
    <div ref="headerRef" class="lv__header-wrapper">
      <slot name="header" v-bind="scopeProps" />
    </div>
    <div ref="filterbarRef" class="lv__filterbar-wrapper">
      <slot name="filterbar" v-bind="scopeProps" />
    </div>
    <div v-loading="contentLoading" class="lv__body-wrapper">
      <div ref="contentRef" class="lv__content-wrapper">
        <slot name="content" v-bind="scopeProps" />
      </div>
      <div ref="footerRef" class="lv__footer-wrapper">
        <slot name="footer" v-bind="scopeProps" />
      </div>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import {
  computed,
  onMounted,
  ref,
  nextTick,
  unref,
  onBeforeUnmount,
  onActivated,
  onDeactivated,
} from 'vue'
import { vLoading } from 'element-plus'
import { pick } from 'lodash-es'
import { parseSize, useLvStore } from '@/utils'

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
  inheritAttrs: false,
  directives: {
    loading: vLoading,
  },
})

const props = defineProps({
  height: { type: [String, Number], default: null },
  fullHeight: { type: Boolean, default: true },
})

const emit = defineEmits(['update-layout'])

const lvStore = useLvStore()
const scopeProps = computed(() =>
  pick(lvStore, [
    'contentHeight',
    'contentLoading',
    'contentData',
    'filterModel',
    'contentMessage',
  ])
)

const wrapperRef = ref<Element | null>(null)
const contentRef = ref<Element | null>(null)
const footerRef = ref<Element | null>(null)
const wrapperHeight = ref<number | string | null>(null)
const contentHeight = computed({
  get: () => lvStore.contentHeight,
  set(newVal) {
    lvStore.contentHeight = newVal
  },
})
const contentLoading = computed(() => !!lvStore.contentLoading)
const bottomOffset = computed<number>(() =>
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  getElBottomOffset(unref(wrapperRef)!)
)

const _initListener = () => {
  props.fullHeight && window.addEventListener('resize', updateLayout)
}
const _cleanupListener = () =>
  window.removeEventListener('resize', updateLayout)

async function updateLayout() {
  await nextTick()
  updateWrapperHeight()
  // 非全屏情况下，内部内容高度需等待外部渲染后再执行计算
  await nextTick()
  updateContentHeight()
  emit('update-layout')
}

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
  _cleanupListener()
})

onDeactivated(() => {
  _cleanupListener()
})

defineExpose({
  updateLayout,
})
</script>

<style>
.lv__wrapper {
  overflow: hidden;
  box-sizing: border-box;
  padding: 10px;
  padding-bottom: 5px;
  background-color: #fff;
}

.lv__wrapper > * {
  box-sizing: border-box;
}

.lv__body-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.lv__content-wrapper {
  flex: 1;
  overflow: auto;
}
</style>
