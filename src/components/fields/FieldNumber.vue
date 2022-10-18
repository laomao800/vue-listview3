<template>
  <ElInputNumber v-model="value" v-bind="mergedAttrs" />
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, unref } from 'vue'
import { ElInputNumber } from 'element-plus'
import { useFilterField } from '@/utils'
import { FilterFieldConfig } from '~/types'

defineOptions({ name: 'FieldNumber' })

const props = defineProps({
  field: { type: Object as PropType<FilterFieldConfig>, default: () => ({}) },
})

const { value, componentAttrs } = useFilterField<number>(props.field)

const mergedAttrs = computed(() => ({
  controlsPosition: 'right',
  style: { width: '100px' },
  ...unref(componentAttrs),
}))
</script>
