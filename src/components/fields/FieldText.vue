<script lang="tsx" setup>
import { ElInput } from 'element-plus'
import type { PropType } from 'vue'
import { computed, unref } from 'vue'

import type { FilterFieldConfig } from '~/types'

import { useFilterField } from '@/utils'

defineOptions({ name: 'FieldText' })

const props = defineProps({
  field: { type: Object as PropType<FilterFieldConfig>, default: () => ({}) },
})

const { value, componentAttrs, componentSlots } = useFilterField<string>(
  props.field
)

const onBlur = () => {
  if (props.field.trim !== false) {
    try {
      value.value = value.value.trim()
    } catch (error) {}
  }
}

const mergedAttrs = computed(() => ({
  clearable: true,
  style: { width: '180px' },
  ...unref(componentAttrs),
}))

defineRender(() => (
  <ElInput v-model={value.value} {...unref(mergedAttrs)} onBlur={onBlur}>
    {{ ...unref(componentSlots) }}
  </ElInput>
))
</script>
