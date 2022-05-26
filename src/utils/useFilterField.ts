import { computed, getCurrentInstance, onMounted, ref, unref } from 'vue'
import { merge } from 'lodash-es'
import { isPlainObject, isFunction } from 'is-what'
import type { FilterField } from '../../types'
import { useLvStore, error, get } from './index'

export function useFilterField<T = any>(field: FilterField) {
  const lvStore = useLvStore()

  const fieldRef = ref(field)
  const disabled = computed(() => unref(fieldRef).disabled)
  const placeholder = computed(() => unref(fieldRef).label)
  const value = computed<T>({
    get() {
      const modelProperty = unref(fieldRef).model
      let value = null
      if (modelProperty) {
        value = get(lvStore.filterModel, modelProperty)
      }
      return value
    },
    set(newVal) {
      const modelProperty = unref(fieldRef).model
      if (modelProperty) {
        lvStore.filterModel[modelProperty] = newVal
      } else {
        /* istanbul ignore next */
        if (process.env.NODE_ENV !== 'production') {
          error(
            `${JSON.stringify(
              unref(fieldRef)
            )}\n 未配置 model 属性，无法写入值。`
          )
        }
      }
    },
  })

  const mergedAttrs = computed<FilterField['componentAttrs']>(() => {
    let defaultProps = (getCurrentInstance()?.proxy as any)?.defaultProps
    defaultProps = isPlainObject(defaultProps) ? defaultProps : {}
    const componentAttrs = isPlainObject(unref(fieldRef).componentAttrs)
      ? unref(fieldRef).componentAttrs
      : {}
    return merge(defaultProps, componentAttrs, {
      disabled: unref(disabled),
      placeholder: unref(placeholder),
    })
  })
  const componentSlots = computed<FilterField['componentSlots']>(() => {
    return unref(fieldRef).componentSlots || {}
  })

  onMounted(() => {
    if (isFunction(field.effect)) {
      field.effect({
        fieldRef,
        filterModel: lvStore.filterModel,
      } as any)
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
