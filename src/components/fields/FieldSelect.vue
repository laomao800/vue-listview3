<template>
  <el-select
    v-model="value"
    v-bind="mergedProps"
    :loading="loading"
    v-on="mergedEvents"
  >
    <el-option
      v-for="(option, index) in options"
      v-bind="option"
      :key="index"
    />
  </el-select>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { markRaw, ref, watch } from 'vue'
import { resolveOptions, useFilterField } from '@/utils'
import { FilterField } from '~/types'

const props = defineProps({
  field: { type: Object as PropType<FilterField>, default: () => ({}) },
})

const { value, mergedProps, mergedEvents } = useFilterField<string>(props.field)

const isMultiple = props.field.type === 'multipleSelect'

const defaultProps = markRaw({
  clearable: true,
  filterable: true,
  style: { width: '180px' },
  multiple: isMultiple,
  collapseTags: isMultiple,
})
const options = ref<any[]>([])
const loading = ref(false)

watch(
  () => props.field.options,
  () => {
    const setOptions = (newOpts: any[]) => {
      if (Array.isArray(newOpts)) {
        options.value = newOpts
      }
    }
    const optionsPromise = resolveOptions(props.field.options, setOptions)
    if (optionsPromise) {
      loading.value = true
      optionsPromise.then(setOptions).finally(() => {
        loading.value = false
      })
    }
  },
  { immediate: true }
)

defineExpose({
  defaultProps,
})
</script>
