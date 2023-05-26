<script lang="tsx" setup>
import { ElTimePicker } from 'element-plus'
import type { PropType } from 'vue'
import { computed, unref } from 'vue'

import type { FilterFieldConfig } from '~/types'

import { useFilterField } from '@/utils'

defineOptions({ name: 'FieldTimePickerRange' })

const props = defineProps({
  field: { type: Object as PropType<FilterFieldConfig>, default: () => ({}) },
})

const { value, componentAttrs, componentSlots } = useFilterField<string>(
  props.field
)

const mergedAttrs = computed(() => ({
  clearable: true,
  style: { width: '200px' },
  isRange: true,
  startPlaceholder: '开始时间',
  endPlaceholder: '结束时间',
  ...unref(componentAttrs),
}))

defineRender(() => (
  <ElTimePicker v-model={value.value} {...unref(mergedAttrs)}>
    {{ ...unref(componentSlots) }}
  </ElTimePicker>
))
</script>
