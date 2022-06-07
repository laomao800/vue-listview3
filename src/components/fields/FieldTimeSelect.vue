<template>
  <ElTimeSelect v-model="value" v-bind="mergedAttrs" />
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { markRaw } from 'vue'
import { ElTimeSelect } from 'element-plus'
import { useFilterField } from '@/utils'
import { FilterField } from '~/types'

const props = defineProps({
  field: { type: Object as PropType<FilterField>, default: () => ({}) },
})

const { value, mergedAttrs } = useFilterField<string>(props.field)

const defaultAttrs = markRaw({
  clearable: true,
  style: { width: '160px' },
})

defineExpose({
  defaultAttrs,
})
</script>
