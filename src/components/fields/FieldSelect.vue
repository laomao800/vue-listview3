<template>
  <ElSelect v-model="value" v-bind="mergedAttrs" :loading="loading">
    <ElOption v-for="(option, index) in options" v-bind="option" :key="index" />
  </ElSelect>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, unref, ref, watch } from 'vue'
import { ElSelect, ElOption } from 'element-plus'
import { resolveOptions, useFilterField, warn } from '@/utils'
import { FilterFieldConfig } from '~/types'

defineOptions({ name: 'FieldSelect' })

const props = defineProps({
  field: { type: Object as PropType<FilterFieldConfig>, default: () => ({}) },
})

const { value, componentAttrs } = useFilterField<string>(props.field)

// @ts-ignore
if (props.field.type === 'multipleSelect') {
  warn(
    `[Migration][filterFields]: 请使用 { type: 'select', multiple: true } 代替 { type: 'multipleSelect' }`,
    props.field
  )
}

const isMultiple = !!props.field.multiple

const mergedAttrs = computed(() => ({
  ...unref(componentAttrs),
  clearable: true,
  filterable: true,
  style: { width: '180px' },
  multiple: isMultiple,
  collapseTags: isMultiple,
}))
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
      optionsPromise.finally(() => {
        loading.value = false
      })
    }
  },
  { immediate: true }
)
</script>
