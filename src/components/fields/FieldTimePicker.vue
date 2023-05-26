<script lang="tsx" setup>
import { ElTimePicker } from 'element-plus'
import type { PropType } from 'vue'
import { computed, unref } from 'vue'

import type { FilterFieldConfig } from '~/types'

import { useFilterField } from '@/utils'

defineOptions({ name: 'FieldTimePicker' })

const props = defineProps({
  field: { type: Object as PropType<FilterFieldConfig>, default: () => ({}) },
})

const { value, componentAttrs, componentSlots } = useFilterField<string>(
  props.field
)

const mergedAttrs = computed(() => ({
  clearable: true,
  style: { width: '160px' },
  ...unref(componentAttrs),
}))

defineRender(() => (
  <ElTimePicker v-model={value.value} {...unref(mergedAttrs)}>
    {{ ...unref(componentSlots) }}
  </ElTimePicker>
))
</script>
