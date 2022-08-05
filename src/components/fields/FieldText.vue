<template>
  <ElInput v-model="value" v-bind="mergedAttrs" @blur="onBlur">
    <template v-for="(slot, key) in componentSlots" #[key]>
      <component :is="slot" v-if="isVNode(slot)" :key="key" />
      <template v-else>{{ slot }}</template>
    </template>
  </ElInput>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { isVNode, computed } from 'vue'
import { ElInput } from 'element-plus'
import { useFilterField } from '@/utils'
import { FilterField } from '~/types'
import { unref } from 'vue'

defineOptions({ name: 'FieldText' })

const props = defineProps({
  field: { type: Object as PropType<FilterField>, default: () => ({}) },
})

const { value, componentAttrs, componentSlots } = useFilterField<string>(
  props.field
)

const onBlur = () => {
  if (props.field.trim !== false) {
    try {
      value.value = value.value.trim()
    } catch (error) {}
  }
}

const mergedAttrs = computed(() => ({
  ...unref(componentAttrs),
  clearable: true,
  style: { width: '180px' },
}))
</script>
