<script lang="tsx" setup>
import type { DatePickType } from 'element-plus'
import { ElDatePicker } from 'element-plus'
import type { PropType } from 'vue'
import { computed, unref } from 'vue'

import type { FilterFieldConfig } from '~/types'

import { useFilterField } from '@/utils'

defineOptions({ name: 'FieldDateTime' })

const props = defineProps({
  field: { type: Object as PropType<FilterFieldConfig>, default: () => ({}) },
})

const { value, componentAttrs, componentSlots } = useFilterField<string>(
  props.field
)

const mergedAttrs = computed(() => ({
  clearable: true,
  style: { width: '200px' },
  type: 'datetime' as DatePickType,
  ...unref(componentAttrs),
}))

defineRender(() => (
  <ElDatePicker v-model={value.value} {...unref(mergedAttrs)}>
    {{ ...unref(componentSlots) }}
  </ElDatePicker>
))
</script>
