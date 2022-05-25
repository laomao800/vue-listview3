<template>
  <el-date-picker v-model="value" v-bind="mergedAttrs" />
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { markRaw } from 'vue'
import { useFilterField } from '@/utils'
import { FilterField } from '~/types'

const props = defineProps({
  field: { type: Object as PropType<FilterField>, default: () => ({}) },
})

const { value, mergedAttrs } = useFilterField<string>(props.field)

const defaultProps = markRaw({
  clearable: true,
  style: { width: '200px' },
  type: 'datetime',
})

defineExpose({
  defaultProps,
})
</script>
