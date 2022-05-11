<script lang="tsx">
import type { LvStore } from '~/types'
import {
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  onMounted,
  ref,
  nextTick,
  unref,
  onBeforeUnmount,
  onActivated,
  onDeactivated,
} from 'vue'
import { pick } from 'lodash-es'
import { parseSize } from '@/utils'
import storeProviderMixin from '@/mixins/storeProviderMixin'

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

export default defineComponent({
  name: 'ListviewLayout',

  mixins: [storeProviderMixin],

  inheritAttrs: false,

  props: {
    height: { type: [String, Number], default: null },
    fullHeight: { type: Boolean, default: true },
  },

  emits: ['update-layout'],

  setup(props, { slots, emit, expose }) {
    const vm = getCurrentInstance()?.proxy

    const lvStore = inject<LvStore>('lvStore')
    const scopeProps = pick(lvStore, [
      'contentHeight',
      'contentLoading',
      'contentData',
      'filterModel',
      'contentMessage',
    ])

    const wrapperRef = ref<Element | null>(null)
    const contentRef = ref<Element | null>(null)
    const wrapperHeight = ref<number | string | null>(null)
    const contentHeight = computed({
      get() {
        return lvStore.contentHeight
      },
      set(newVal: number) {
        lvStore.contentHeight = newVal
      },
    })
    const contentLoading = computed(() => !!lvStore.contentLoading)
    const bottomOffset = computed<number>(() =>
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      getElBottomOffset(unref(wrapperRef)!)
    )

    const _init = () => {
      props.fullHeight && window.addEventListener('resize', updateLayout)
    }
    const _cleanup = () => window.removeEventListener('resize', updateLayout)

    async function updateLayout() {
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
        const wrapOffsetTop =
          unref(wrapperRef)?.getBoundingClientRect().top || 0
        wrapperHeight.value = window.innerHeight - wrapOffsetTop
      } else {
        wrapperHeight.value = null
      }
    }

    function updateContentHeight() {
      const height = props.height
      let maxHeight
      if (height) {
        if (/\d+%/.test(String(height))) {
          maxHeight = vm?.$el.getBoundingClientRect().height
        } else {
          maxHeight = parseInt(String(height), 10)
        }
      } else if (props.fullHeight) {
        maxHeight = unref(wrapperHeight) as number
      }

      if (maxHeight && isDom(contentRef)) {
        const footerHeight = getSlotHeight('footer')
        const contentTop = unref(contentRef)?.getBoundingClientRect().top || 0
        const contentOffsetTop =
          contentTop - vm?.$el.getBoundingClientRect().top
        contentHeight.value =
          maxHeight - contentOffsetTop - unref(bottomOffset) - footerHeight
      }
    }

    function getSlotHeight(name: string): number {
      const slot = vm?.$refs[name] as Element
      return slot ? slot.getBoundingClientRect().height : 0
    }

    function renderSlot(name: string, attrs = {}) {
      return (
        slots[name] && (
          <div class={`lv__${name}-wrapper`} ref={`${name}Ref`} {...attrs}>
            {(slots as any)[name](scopeProps)}
          </div>
        )
      )
    }

    onMounted(() => {
      updateLayout()
      _init()
    })

    onBeforeUnmount(() => {
      _cleanup()
    })

    onActivated(() => {
      updateLayout()
      _init()
    })

    onDeactivated(() => {
      _cleanup()
    })

    expose({
      scopeProps,
      wrapperHeight,
      contentHeight,
      contentLoading,
      bottomOffset,
      renderSlot,
    })

    return () => (
      <div
        ref="wrapperRef"
        style={{ height: parseSize(unref(wrapperHeight)) }}
        class="lv__wrapper"
      >
        {renderSlot('header')}
        {renderSlot('filterbar')}
        <div class="lv__body-wrapper" v-loading={unref(contentLoading)}>
          {renderSlot('content')}
          {renderSlot('footer')}
        </div>
      </div>
    )
  },
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
