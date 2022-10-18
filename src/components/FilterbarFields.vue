<script lang="tsx">
import type { MaybeRef } from '@vueuse/shared'
import type { FilterField, FilterFieldConfig } from '~/types'
import { VNode, PropType, ref, unref, defineComponent } from 'vue'
import { isVNode } from 'vue'
import { isPlainObject, isFunction } from 'is-what'
import { isObjType } from '@/utils'
import FilterbarField from './FilterbarField.vue'

function isValidFieldConfig(_field: MaybeRef<any>) {
  const field = unref(_field)
  return (
    isPlainObject(field) ||
    isVNode(field) ||
    isFunction(field) ||
    Array.isArray(field)
  )
}

export default defineComponent({
  name: 'FilterbarFields',

  props: {
    fields: {
      type: Array as PropType<FilterField[]>,
      default: /* istanbul ignore next */ () => [],
    },
  },

  setup(props, { expose }) {
    let uid = 0
    const fieldRefs = ref<any[]>([])

    function renderFieldsGroup(group: FilterField[] = []) {
      const subFieldsVm: VNode[] = []
      group.forEach((subField) => {
        const vm = renderField(subField)
        vm && subFieldsVm.push(vm)
      })
      return subFieldsVm.length > 0 ? (
        <div class="lv-field-group">{subFieldsVm}</div>
      ) : null
    }

    function renderField(field: FilterField) {
      if (!isValidFieldConfig(field)) return null
      const key =
        (isObjType<FilterFieldConfig>(field) && (field.key || field.model)) ||
        `unnamed-field-${uid++}`
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
      <div class="lv-fields-wrapper">
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
.lv-field-group {
  display: inline-block;
  margin: 0;
  vertical-align: top;
}
</style>
