<script lang="tsx" setup>
import type { PropType } from 'vue'
import type { FilterField } from '~/types'
import {
  ref,
  unref,
  computed,
  nextTick,
  useAttrs,
  watch,
  useSlots,
  renderSlot,
} from 'vue'
import { useThrottleFn } from '@vueuse/core'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import zipObject from 'lodash-es/zipObject'
import ListviewLayout from '@/components/ListviewLayout.vue'
import ListviewHeader from '@/components/ListviewHeader.vue'
import ListviewFilterbar from '@/components/ListviewFilterbar.vue'
import ListviewContent from '@/components/ListviewContent.vue'
import ListviewContentFooter from '@/components/ListviewContentFooter.vue'
import { useProvideLvStore } from '@/useLvStore'
import { hasOwn, get } from '@/utils'

type Data = Record<string, unknown>

defineOptions({
  name: 'Listview',
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
  filterFields: {
    type: Array as PropType<FilterField[]>,
    default: () => [],
  },

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

  replaceComponents: { type: Object, default: () => ({}) },
})

const layoutRef = ref<any>(null)
const lvStoreRef = computed(() => unref(layoutRef)?.lvStore)

const _unwatchStore = watch(lvStoreRef, () => {
  if (unref(lvStoreRef)) {
    unref(lvStoreRef).emitter.on('root-emit', ({ event, payload }: any) => {
      emits(event, payload)
    })
    unref(lvStoreRef).emitter.on('update:selection', (selection: any) => {
      emits('update:selection', selection)
    })
    _unwatchStore()
  }
})

const attrs = useAttrs()
const mergedAttrs = computed<Data>(() => ({
  ...props,
  ...attrs,
}))

// TODO: type fix
useProvideLvStore(unref(props) as any)

const _updateLayout = () => unref(lvStoreRef).emitter.emit('updateLayout')
const handleFilterFold = () => nextTick(_updateLayout)
const updateFilterLayout = () =>
  nextTick(() => unref(lvStoreRef).emitter.emit('updateFilterLayout'))

defineExpose({
  updateLayout: useThrottleFn(_updateLayout, 100),
  resetFilter: () => unref(lvStoreRef).resetFilterModel(),
  search: (keepInPage: boolean) => unref(lvStoreRef).search(keepInPage),
  setContentMessage: (text: string, type: string, cleanData = false) =>
    unref(lvStoreRef).setContentMessage(text, type, cleanData),
})

const REPLACE_COMPONENTS_MAP = {
  header: ListviewHeader,
  filterbar: ListviewFilterbar,
  content: ListviewContent,
  footer: ListviewContentFooter,
}
const slots = useSlots()
const renderLvSlot = (
  name: keyof typeof REPLACE_COMPONENTS_MAP,
  slotProps: Data,
  childSlotNames: string[] = [],
  extProps: Data = {}
) => {
  const fallback = () => {
    const DefaultComponent = get(
      props.replaceComponents,
      name,
      REPLACE_COMPONENTS_MAP[name]
    )
    childSlotNames = childSlotNames.filter((name) => hasOwn(slots, name))
    return [
      <DefaultComponent {...{ ...unref(mergedAttrs), ...extProps }}>
        {zipObject(
          childSlotNames,
          childSlotNames.map((name) => () => renderSlot(slots, name, slotProps))
        )}
      </DefaultComponent>,
    ]
  }
  return renderSlot(slots, name, slotProps, fallback)
}

defineRender(() => (
  <ElConfigProvider locale={zhCn}>
    <ListviewLayout
      ref={(vm: any) => (layoutRef.value = vm)}
      {...unref(mergedAttrs)}
      onUpdateLayout={updateFilterLayout}
    >
      {{
        header: (props: Data) => renderLvSlot('header', props),
        filterbar: (props: Data) =>
          renderLvSlot(
            'filterbar',
            props,
            [
              'filterbar-top',
              'filterbar-bottom',
              'filterbar-left',
              'filterbar-right',
              'prepend-more',
              'append-more',
              'prepend-submit',
              'append-submit',
            ],
            { onFoldChange: handleFilterFold }
          ),
        content: (props: Data) =>
          renderLvSlot('content', props, ['content-empty']),
        footer: (props: Data) =>
          renderLvSlot('footer', props, [
            'footer-left',
            'footer-center',
            'footer-right',
          ]),
      }}
    </ListviewLayout>
  </ElConfigProvider>
))
</script>
