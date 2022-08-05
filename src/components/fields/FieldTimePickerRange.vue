<template>
  <ElTimePicker v-model="value" v-bind="mergedAttrs" />
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, unref } from 'vue'
import { ElTimePicker } from 'element-plus'
import { useFilterField } from '@/utils'
import { FilterField } from '~/types'

defineOptions({ name: 'FieldTimePickerRange' })

const props = defineProps({
  field: { type: Object as PropType<FilterField>, default: () => ({}) },
})

const { value, componentAttrs } = useFilterField<string>(props.field)

const mergedAttrs = computed(() => ({
  ...unref(componentAttrs),
  clearable: true,
  style: { width: '200px' },
  isRange: true,
  startPlaceholder: '开始时间',
  endPlaceholder: '结束时间',
}))
</script>
