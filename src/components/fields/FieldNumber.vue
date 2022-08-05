<template>
  <ElInputNumber v-model="value" v-bind="mergedAttrs" />
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, unref } from 'vue'
import { ElInputNumber } from 'element-plus'
import { useFilterField } from '@/utils'
import { FilterField } from '~/types'

defineOptions({ name: 'FieldNumber' })

const props = defineProps({
  field: { type: Object as PropType<FilterField>, default: () => ({}) },
})

const { value, componentAttrs } = useFilterField<number>(props.field)

const mergedAttrs = computed(() => ({
  ...unref(componentAttrs),
  controlsPosition: 'right',
  style: { width: '100px' },
}))
</script>
