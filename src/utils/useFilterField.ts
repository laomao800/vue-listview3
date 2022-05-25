import { computed, getCurrentInstance, onMounted, unref } from 'vue'
import { merge } from 'lodash-es'
import { isPlainObject, isFunction } from 'is-what'
import type { FilterField } from '../../types'
import { useLvStore, error, get } from './index'

export function useFilterField<T = any>(field: FilterField) {
  const lvStore = useLvStore()

  const disabled = computed(() => field.disabled)
  const placeholder = computed(() => field.label)
  const value = computed<T>({
    get() {
      const modelProperty = field.model
      let value = null
      if (modelProperty) {
        value = get(lvStore.filterModel, modelProperty)
      }
      return value
    },
    set(newVal) {
      const modelProperty = field.model
      if (modelProperty) {
        lvStore.filterModel[modelProperty] = newVal
      } else {
        /* istanbul ignore next */
        if (process.env.NODE_ENV !== 'production') {
          error(`${JSON.stringify(field)}\n 未配置 model 属性，无法写入值。`)
        }
      }
    },
  })

  const mergedAttrs = computed<FilterField['componentAttrs']>(() => {
    let defaultProps = (getCurrentInstance()?.proxy as any)?.defaultProps
    defaultProps = isPlainObject(defaultProps) ? defaultProps : {}
    const componentAttrs = isPlainObject(field.componentAttrs)
      ? field.componentAttrs
      : {}
    return merge(defaultProps, componentAttrs, {
      disabled: unref(disabled),
      placeholder: unref(placeholder),
    })
  })
  const componentSlots = computed<FilterField['componentSlots']>(() => {
    return field.componentSlots || {}
  })

  onMounted(() => {
    if (isFunction(field.effect)) {
      field.effect({
        vm: getCurrentInstance()?.proxy,
        filterModel: lvStore.filterModel,
      })
    }
  })

  return {
    value,
    disabled,
    placeholder,
    mergedAttrs,
    componentSlots,
  }
}
