<template>
  <ElDatePicker v-model="value" v-bind="mergedAttrs" />
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, unref } from 'vue'
import { ElDatePicker } from 'element-plus'
import { useFilterField } from '@/utils'
import { FilterFieldConfig } from '~/types'

defineOptions({ name: 'FieldDate' })

const props = defineProps({
  field: { type: Object as PropType<FilterFieldConfig>, default: () => ({}) },
})

const { value, componentAttrs } = useFilterField<string>(props.field)

const mergedAttrs = computed(() => ({
  clearable: true,
  style: { width: '180px' },
  ...unref(componentAttrs),
}))
</script>
