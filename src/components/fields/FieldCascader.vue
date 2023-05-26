<script lang="tsx" setup>
import type { CascaderProps } from 'element-plus'
import type { PropType } from 'vue'
import { ref, unref, computed, watch } from 'vue'
import { ElCascader } from 'element-plus'
import { resolveOptions, useFilterField } from '@/utils'
import type { FilterFieldConfig } from '~/types'

defineOptions({ name: 'FieldCascader' })

const props = defineProps({
  field: { type: Object as PropType<FilterFieldConfig>, default: () => ({}) },
})

const { value, componentAttrs, componentSlots } = useFilterField<string>(
  props.field
)

const isMultiple = !!props.field.multiple

const mergedAttrs = computed(() => ({
  clearable: true,
  style: { width: '240px' },
  props: { expandTrigger: 'hover', multiple: isMultiple } as CascaderProps,
  collapseTags: isMultiple,
  collapseTagsTooltip: isMultiple,
  ...unref(componentAttrs),
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

defineRender(() => (
  <ElCascader
    v-model={value.value}
    {...unref(mergedAttrs)}
    options={unref(options)}
  >
    {{ ...unref(componentSlots) }}
  </ElCascader>
))
</script>
