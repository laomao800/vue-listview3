<script lang="tsx" setup>
import type { PropType } from 'vue'
import type { DatePickType } from 'element-plus'
import { computed, unref } from 'vue'
import { ElDatePicker } from 'element-plus'
import { useFilterField } from '@/utils'
import type { FilterFieldConfig } from '~/types'

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
