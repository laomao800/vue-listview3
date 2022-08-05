<template>
  <ElDatePicker v-model="value" v-bind="mergedAttrs" />
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { DatePickType } from 'element-plus'
import { computed, unref } from 'vue'
import { ElDatePicker } from 'element-plus'
import { useFilterField } from '@/utils'
import { FilterField } from '~/types'

defineOptions({ name: 'FieldDateRange' })

const props = defineProps({
  field: { type: Object as PropType<FilterField>, default: () => ({}) },
})

const { value, componentAttrs } = useFilterField<string>(props.field)

const mergedAttrs = computed(() => ({
  ...unref(componentAttrs),
  clearable: true,
  style: { width: '240px' },
  type: 'daterange' as DatePickType,
  startPlaceholder: '开始日期',
  endPlaceholder: '结束日期',
}))
</script>
