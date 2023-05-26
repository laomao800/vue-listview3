<script lang="tsx" setup>
import { ElInputNumber, type InputNumberProps } from 'element-plus'
import type { PropType } from 'vue'
import { computed, unref } from 'vue'

import type { FilterFieldConfig } from '~/types'

import { useFilterField } from '@/utils'

defineOptions({ name: 'FieldNumber' })

const props = defineProps({
  field: { type: Object as PropType<FilterFieldConfig>, default: () => ({}) },
})

const { value, componentAttrs, componentSlots } = useFilterField<number>(
  props.field
)

const mergedAttrs = computed(() => ({
  controlsPosition: 'right' as InputNumberProps['controlsPosition'],
  style: { width: '100px' },
  ...unref(componentAttrs),
}))

defineRender(() => (
  <ElInputNumber v-model={value.value} {...unref(mergedAttrs)}>
    {{ ...unref(componentSlots) }}
  </ElInputNumber>
))
</script>
