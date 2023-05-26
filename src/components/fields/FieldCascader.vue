<script lang="tsx" setup>
import type { CascaderProps } from 'element-plus'
import { ElCascader } from 'element-plus'
import type { PropType } from 'vue'
import { computed, ref, unref, watch } from 'vue'

import type { FilterFieldConfig } from '~/types'

import { resolveOptions, useFilterField } from '@/utils'

defineOptions({ name: 'FieldCascader' })

const props = defineProps({
  field: { type: Object as PropType<FilterFieldConfig>, default: () => ({}) },
})

const { value, componentAttrs, componentSlots } = useFilterField<string>(
  props.field
)

const isMultiple = !!props.field.multiple

const mergedAttrs = computed(() => ({
  clearable: true,
  style: { width: '240px' },
  props: { expandTrigger: 'hover', multiple: isMultiple } as CascaderProps,
  collapseTags: isMultiple,
  collapseTagsTooltip: isMultiple,
  ...unref(componentAttrs),
}))
const options = ref<any[]>([])

watch(
  () => props.field.options,
  () =>
    resolveOptions(props.field.options).then(
      (newOpts) => (options.value = newOpts)
    ),
  { immediate: true }
)

defineRender(() => (
  <ElCascader
    v-model={value.value}
    {...unref(mergedAttrs)}
    options={unref(options)}
  >
    {{ ...unref(componentSlots) }}
  </ElCascader>
))
</script>
