<template>
  <ElDatePicker v-model="value" v-bind="mergedAttrs" />
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { DatePickType } from 'element-plus'
import { computed, unref } from 'vue'
import { ElDatePicker } from 'element-plus'
import { useFilterField } from '@/utils'
import { FilterFieldConfig } from '~/types'

defineOptions({ name: 'FieldMonthRange' })

const props = defineProps({
  field: { type: Object as PropType<FilterFieldConfig>, default: () => ({}) },
})

const { value, componentAttrs } = useFilterField<string>(props.field)

const mergedAttrs = computed(() => ({
  clearable: true,
  style: { width: '240px' },
  type: 'monthrange' as DatePickType,
  startPlaceholder: '开始月份',
  endPlaceholder: '结束月份',
  ...unref(componentAttrs),
}))
</script>
