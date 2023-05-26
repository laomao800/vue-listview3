<script lang="tsx" setup>
import type { PropType } from 'vue'
import { computed } from 'vue'
import { ElInput } from 'element-plus'
import { useFilterField } from '@/utils'
import type { FilterFieldConfig } from '~/types'
import { unref } from 'vue'

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
