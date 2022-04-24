<script lang="tsx" setup>
import type { FilterField, FilterFieldHasRender } from '~/types'
import type { PropType } from 'vue'
import {
  defineComponent,
  defineProps,
  computed,
  inject,
  unref,
  isVNode,
  Transition,
} from 'vue'
import hasValues from 'has-values'
import { isFunction } from 'lodash-es'
import { hasRenderFn, get } from '@/utils'
import vNode from './VNode'
import { getFieldComponent } from './fields/index'

const props = defineProps({
  field: {
    type: [Object, Function] as PropType<FilterField>,
  },
})

const field = props?.field || {}
const lvStore = inject('lvStore')
const showLabelRef = computed(() => {
  const value = get(lvStore.filterModel, field.model)
  // hasValues(null) -> true
  return value !== null && hasValues(value)
})
let InnerLabel = null
let InnerContent = null

InnerLabel = field?.label ? (
  <Transition name="lv__field-label-trans">
    {unref(showLabelRef) && <div class="lv__field-label">{field.label}</div>}
  </Transition>
) : null

if (isFunction(field)) {
  const fieldVm = field()
  InnerContent = <vNode node={fieldVm} />
} else if (hasRenderFn<FilterFieldHasRender>(field)) {
  const fieldVm = field.render()
  InnerContent = <vNode node={fieldVm} />
} else if (isVNode(field)) {
  InnerContent = <vNode node={field} />
} else {
  const FieldComponent = getFieldComponent(field?.type) as any
  if (FieldComponent) {
    InnerContent = (
      <el-form-item>
        <FieldComponent
          {...{
            field,
            style: field?.width ? { width: `${field?.width}px` } : null,
          }}
        />
      </el-form-item>
    )
  }
}
</script>

<script lang="tsx">
import storeProviderMixin from '@/mixins/storeProviderMixin'
import { allFieldComponents } from './fields/index'

export default defineComponent({
  name: 'FilterbarField',

  components: { ...allFieldComponents },

  mixins: [storeProviderMixin],

  render() {
    return (
      <div class="lv__field">
        {this.InnerContent}
        {this.InnerLabel}
      </div>
    )
  },
})
</script>

<style lang="less">
@filter-gap-size: 10px;

.lv__field {
  position: relative;
  display: inline-block;
  margin: 0 @filter-gap-size @filter-gap-size 0;
  vertical-align: top;

  &-label {
    position: absolute;
    top: 0;
    left: 10px;
    z-index: 1;
    padding: 0 0.2em;
    font-size: 12px;
    line-height: 12px;
    color: #999;
    white-space: nowrap;
    cursor: default;
    background-color: #fff;
    opacity: 1;
    transform: translateY(-50%) scale(0.9);
    transform-origin: center bottom;
    transition: 0.2s;

    &-trans-enter-active {
      top: 50%;
      opacity: 0;
    }
    &-trans-enter-to {
      top: 0;
      opacity: 1;
    }
    &-trans-leave-active {
      top: 0;
      opacity: 1;
    }
    &-trans-leave-to {
      top: 50%;
      opacity: 0;
    }
  }

  .el-form-item__content {
    > *,
    > .el-input .el-input__inner,
    > .el-select .el-input__inner,
    > .el-cascader .el-input__inner {
      vertical-align: top;
      box-sizing: border-box;
    }
  }
}
</style>
