<template>
  <el-date-picker v-model="value" v-bind="mergedProps" v-on="mergedEvents" />
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { markRaw } from 'vue'
import { useFilterField } from '@/utils'
import { FilterField } from '~/types'

const props = defineProps({
  field: { type: Object as PropType<FilterField>, default: () => ({}) },
})

const { value, mergedProps, mergedEvents } = useFilterField<string>(props.field)

const defaultProps = markRaw({
  clearable: true,
  style: { width: '180px' },
})

defineExpose({
  defaultProps,
})
</script>
