<template>
  <ElSelect v-model="value" v-bind="mergedAttrs" :loading="loading">
    <ElOption v-for="(option, index) in options" v-bind="option" :key="index" />
  </ElSelect>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { markRaw, ref, watch } from 'vue'
import { ElSelect, ElOption } from 'element-plus'
import { resolveOptions, useFilterField } from '@/utils'
import { FilterField } from '~/types'

const props = defineProps({
  field: { type: Object as PropType<FilterField>, default: () => ({}) },
})

const { value, mergedAttrs } = useFilterField<string>(props.field)

const isMultiple = props.field.type === 'multipleSelect'

const defaultAttrs = markRaw({
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
  defaultAttrs,
})
</script>
