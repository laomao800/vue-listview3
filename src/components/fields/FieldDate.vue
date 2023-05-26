<script lang="tsx" setup>
import type { PropType } from 'vue'
import { computed, unref } from 'vue'
import { ElDatePicker } from 'element-plus'
import { useFilterField } from '@/utils'
import type { FilterFieldConfig } from '~/types'

defineOptions({ name: 'FieldDate' })

const props = defineProps({
  field: { type: Object as PropType<FilterFieldConfig>, default: () => ({}) },
})

const { value, componentAttrs, componentSlots } = useFilterField<string>(
  props.field
)

const mergedAttrs = computed(() => ({
  clearable: true,
  style: { width: '180px' },
  ...unref(componentAttrs),
}))

defineRender(() => (
  <ElDatePicker v-model={value.value} {...unref(mergedAttrs)}>
    {{ ...unref(componentSlots) }}
  </ElDatePicker>
))
</script>
