<script lang="tsx">
import type { FilterField } from '~/types'
import { VNode, PropType, ref, defineComponent } from 'vue'
import { isVNode } from 'vue'
import { isFunction } from 'is-what'
import { hasOwn, error } from '@/utils'
import { getFieldComponent } from './fields/index'
import FilterbarField from './FilterbarField.vue'

function isValidFieldConfig(field: any) {
  if (!field) return false

  if (hasOwn(field, 'type')) {
    if (getFieldComponent(field.type)) {
      return true
    } else {
      error(`Invalid filter field type '${field.type}'`, field)
      return false
    }
  }

  return (
    (hasOwn(field, 'render') && isFunction(field.render)) ||
    isFunction(field) ||
    isVNode(field) ||
    Array.isArray(field)
  )
}

let uid = 0

export default defineComponent({
  name: 'FilterbarFields',

  props: {
    fields: {
      type: Array as PropType<FilterField[]>,
      default: /* istanbul ignore next */ () => [],
    },
  },

  setup(props, { expose }) {
    const fieldRefs = ref<any[]>([])

    function renderFieldsGroup(group: FilterField[] = []) {
      const subFieldsVm: VNode[] = []
      group.forEach((subField) => {
        const vm = renderField(subField)
        vm && subFieldsVm.push(vm)
      })
      return subFieldsVm.length > 0 ? (
        <div class="lv__field-group">{subFieldsVm}</div>
      ) : null
    }

    function renderField(field = {} as FilterField) {
      if (!isValidFieldConfig(field)) return null

      const key = field.key || field.model || `unnamed-field-${uid++}`
      return (
        <FilterbarField
          {...{ ref: (ref: any) => fieldRefs.value.push(ref), key, field }}
        />
      )
    }

    expose({
      fieldRefs,
    })

    return () => (
      <div class="lv__fields-wrapper">
        {props.fields.map((item) =>
          // 仅对第一层嵌套的 array 作组合
          Array.isArray(item) ? renderFieldsGroup(item) : renderField(item)
        )}
      </div>
    )
  },
})
</script>

<style lang="less">
.lv__field-group {
  display: inline-block;
  margin: 0;
  vertical-align: top;
}
</style>
