<script lang="tsx" setup>
import type { PropType } from 'vue'
import { computed, unref } from 'vue'
import { ElTimeSelect } from 'element-plus'
import { useFilterField } from '@/utils'
import type { FilterFieldConfig } from '~/types'

defineOptions({ name: 'FieldTimeSelect' })

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
  <ElTimeSelect v-model={value.value} {...unref(mergedAttrs)}>
    {{ ...unref(componentSlots) }}
  </ElTimeSelect>
))
</script>
