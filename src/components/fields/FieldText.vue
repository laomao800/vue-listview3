<template>
  <el-input
    v-model="value"
    v-bind="mergedProps"
    v-on="mergedEvents"
    @blur="onBlur"
  >
    <template v-for="(slot, key) in componentSlots" #[key]>
      <component :is="slot" v-if="isVNode(slot)" :key="key" />
      <template v-else>{{ slot }}</template>
    </template>
  </el-input>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { isVNode, markRaw } from 'vue'
import { useFilterField } from '@/utils'
import { FilterField } from '~/types'

const props = defineProps({
  field: { type: Object as PropType<FilterField>, default: () => ({}) },
})

const { value, mergedProps, mergedEvents, componentSlots } =
  useFilterField<string>(props.field)

const onBlur = () => {
  if (props.field.trim !== false) {
    try {
      value.value = value.value.trim()
    } catch (error) {}
  }
}

const defaultProps = markRaw({
  clearable: true,
  style: { width: '180px' },
})

defineExpose({
  defaultProps,
})
</script>
