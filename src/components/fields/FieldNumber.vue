<template>
  <el-input-number v-model="value" v-bind="mergedProps" v-on="mergedEvents" />
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { markRaw } from 'vue'
import { useFilterField } from '@/utils'
import { FilterField } from '~/types'

const props = defineProps({
  field: { type: Object as PropType<FilterField>, default: () => ({}) },
})

const { value, mergedProps, mergedEvents } = useFilterField<number>(props.field)

const defaultProps = markRaw({
  controlsPosition: 'right',
  style: { width: '100px' },
})

defineExpose({
  defaultProps,
})
</script>
