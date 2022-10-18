<template>
  <ElTimePicker v-model="value" v-bind="mergedAttrs" />
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, unref } from 'vue'
import { ElTimePicker } from 'element-plus'
import { useFilterField } from '@/utils'
import { FilterFieldConfig } from '~/types'

defineOptions({ name: 'FieldTimePickerRange' })

const props = defineProps({
  field: { type: Object as PropType<FilterFieldConfig>, default: () => ({}) },
})

const { value, componentAttrs } = useFilterField<string>(props.field)

const mergedAttrs = computed(() => ({
  clearable: true,
  style: { width: '200px' },
  isRange: true,
  startPlaceholder: '开始时间',
  endPlaceholder: '结束时间',
  ...unref(componentAttrs),
}))
</script>
