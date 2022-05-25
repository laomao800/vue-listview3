<template>
  <el-cascader
    v-model="value"
    v-bind="mergedProps"
    :options="options"
    :loading="loading"
    v-on="mergedEvents"
  />
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

const defaultProps = markRaw({
  clearable: true,
  style: { width: '180px' },
  props: { expandTrigger: 'hover' },
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
