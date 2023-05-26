<script lang="tsx" setup>
import type { PropType } from 'vue'
import { computed, unref, ref, watch } from 'vue'
import { ElSelect, ElOption } from 'element-plus'
import { resolveOptions, useFilterField, warn } from '@/utils'
import type { FilterFieldConfig } from '~/types'

defineOptions({ name: 'FieldSelect' })

const props = defineProps({
  field: { type: Object as PropType<FilterFieldConfig>, default: () => ({}) },
})

const { value, componentAttrs, componentSlots } = useFilterField<string>(
  props.field
)

if (
  process.env.NODE_ENV !== 'production' &&
  // @ts-expect-error
  props.field.type === 'multipleSelect'
) {
  warn(
    `[Migration][filterFields]: 请使用 { type: 'select', multiple: true } 代替 { type: 'multipleSelect' }`,
    props.field
  )
}

const isMultiple = !!props.field.multiple

const mergedAttrs = computed(() => ({
  clearable: true,
  filterable: true,
  style: { width: '180px' },
  multiple: isMultiple,
  collapseTags: isMultiple,
  ...unref(componentAttrs),
}))
const options = ref<any[]>([])
const loading = ref(false)

watch(
  () => props.field.options,
  () => {
    loading.value = true
    resolveOptions(props.field.options)
      .then((newOpts) => (options.value = newOpts))
      .finally(() => (loading.value = false))
  },
  { immediate: true }
)

defineRender(() => (
  <ElSelect
    v-model={value.value}
    {...unref(mergedAttrs)}
    loading={unref(loading)}
  >
    {{
      ...unref(componentSlots),
      default: () =>
        unref(options).map((option, index) => (
          <ElOption {...option} key={index} />
        )),
    }}
  </ElSelect>
))
</script>
