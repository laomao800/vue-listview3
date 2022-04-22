import type { FilterField } from '~/types'
import { PropType } from 'vue'
import { merge, isPlainObject, isFunction } from 'lodash-es'
import storeProviderMixin from '@/mixins/storeProviderMixin'
import { error, get } from '@/utils'

export default {
  mixins: [storeProviderMixin],

  props: {
    field: { type: Object as PropType<FilterField>, default: () => ({}) },
  },

  data() {
    return {
      disabled: this.field.disabled,
      placeholder: this.field.label,
    }
  },

  computed: {
    value: {
      get(): any {
        const modelProperty = this.field.model
        let value = null
        if (modelProperty) {
          value = get(this.lvStore.filterModel, modelProperty)
        }
        return value
      },
      set(newVal: any) {
        const modelProperty = this.field.model
        if (modelProperty) {
          this.lvStore.filterModel[modelProperty] = newVal
        } else {
          /* istanbul ignore next */
          if (process.env.NODE_ENV !== 'production') {
            error(
              `${JSON.stringify(this.field)}\n 未配置 model 属性，无法写入值。`
            )
          }
        }
      },
    },
    mergedProps(): FilterField['componentProps'] {
      let defaultProps = (this as any).defaultProps
      defaultProps = isPlainObject(defaultProps) ? defaultProps : {}
      const componentProps = isPlainObject(this.field.componentProps)
        ? this.field.componentProps
        : {}
      return merge(defaultProps, componentProps, {
        disabled: this.disabled,
        placeholder: this.placeholder,
      })
    },
    mergedEvents(): FilterField['componentEvents'] {
      return isPlainObject(this.field.componentEvents)
        ? this.field.componentEvents
        : {}
    },
    componentSlots(): FilterField['componentSlots'] {
      return this.field.componentSlots || {}
    },
  },

  created() {
    if (isFunction(this.field.effect)) {
      this.field.effect({
        vm: this,
        filterModel: this.lvStore.filterModel,
      })
    }
  },
}
