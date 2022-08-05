<template>
  <ElDatePicker v-model="value" v-bind="mergedAttrs" />
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, unref } from 'vue'
import { ElDatePicker } from 'element-plus'
import { useFilterField } from '@/utils'
import { FilterField } from '~/types'

defineOptions({ name: 'FieldDate' })

const props = defineProps({
  field: { type: Object as PropType<FilterField>, default: () => ({}) },
})

const { value, componentAttrs } = useFilterField<string>(props.field)

const mergedAttrs = computed(() => ({
  ...unref(componentAttrs),
  clearable: true,
  style: { width: '180px' },
}))
</script>
