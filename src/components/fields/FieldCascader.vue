<template>
  <ElCascader
    v-model="value"
    v-bind="mergedAttrs"
    :options="options"
    :loading="loading"
  />
</template>

<script lang="ts" setup>
import type { CascaderProps } from 'element-plus'
import { computed, PropType, unref } from 'vue'
import { ref, watch } from 'vue'
import { ElCascader } from 'element-plus'
import { resolveOptions, useFilterField } from '@/utils'
import { FilterField } from '~/types'

defineOptions({ name: 'FieldCascader' })

const props = defineProps({
  field: { type: Object as PropType<FilterField>, default: () => ({}) },
})

const { value, componentAttrs } = useFilterField<string>(props.field)

const mergedAttrs = computed(() => ({
  ...unref(componentAttrs),
  clearable: true,
  style: { width: '180px' },
  props: { expandTrigger: 'hover' } as CascaderProps,
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
