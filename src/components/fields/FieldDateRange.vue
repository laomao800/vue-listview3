<script lang="tsx" setup>
import type { DatePickType } from 'element-plus'
import { ElDatePicker } from 'element-plus'
import type { PropType } from 'vue'
import { computed, unref } from 'vue'

import type { FilterFieldConfig } from '~/types'

import { useFilterField } from '@/utils'

defineOptions({ name: 'FieldDateRange' })

const props = defineProps({
  field: { type: Object as PropType<FilterFieldConfig>, default: () => ({}) },
})

const { value, componentAttrs, componentSlots } = useFilterField<string>(
  props.field
)

const mergedAttrs = computed(() => ({
  clearable: true,
  style: { width: '240px' },
  type: 'daterange' as DatePickType,
  startPlaceholder: '开始日期',
  endPlaceholder: '结束日期',
  ...unref(componentAttrs),
}))

defineRender(() => (
  <ElDatePicker v-model={value.value} {...unref(mergedAttrs)}>
    {{ ...unref(componentSlots) }}
  </ElDatePicker>
))
</script>
