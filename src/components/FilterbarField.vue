<script lang="tsx" setup>
import { ElFormItem } from 'element-plus'
import hasValues from 'has-values'
import { isFunction, isPlainObject } from 'is-what'
import { Transition, computed, h, isVNode, unref } from 'vue'
import type { PropType, Ref, VNode } from 'vue'

import type { FilterField, FilterFieldConfig } from '~/types'

import { useLvStore } from '@/useLvStore'
import { error, get, isObjType } from '@/utils'

import { getFieldComponent } from './fields/index'

type InnerVNodeType = VNode | Ref<VNode | null> | null

const lvStore = useLvStore()

const props = defineProps({
  field: {
    type: [Object, Function] as PropType<FilterField>,
    default: () => ({}),
  },
})

const showLabelRef = computed(() => {
  const modelName = get(props.field, 'model')
  if (modelName) {
    const value = get(lvStore.state.filterModel, modelName)
    // hasValues(null) -> true
    return value !== null && hasValues(value)
  }
  return false
})

function _renderField(field: FilterFieldConfig) {
  const Label = field.label ? (
    <Transition name="lv-field__label-trans">
      {unref(showLabelRef) && <div class="lv-field__label">{field.label}</div>}
    </Transition>
  ) : null

  let Content: InnerVNodeType = null

  if (isFunction(field)) {
    Content = field()
  } else if (isVNode(field)) {
    Content = field
  } else if (isPlainObject(field)) {
    if (isFunction(field.render)) {
      Content = computed(() => field.render?.() || null)
    } else if (field.type) {
      const FieldComponent = getFieldComponent(field.type) as any
      if (FieldComponent) {
        const style = field.width ? { width: `${field.width}px` } : null
        Content = (
          <ElFormItem>
            <FieldComponent {...{ field, style }} />
          </ElFormItem>
        )
      } else {
        error(`Invalid filter field type '${field.type}'`, field)
      }
    }
  }

  return [Label, Content]
}

let InnerLabel: InnerVNodeType = null
let InnerContent: InnerVNodeType = null

const rawField = unref(props.field)

if (isVNode(rawField)) {
  InnerContent = h(rawField)
} else if (isObjType<FilterFieldConfig>(rawField)) {
  ;[InnerLabel, InnerContent] = _renderField(rawField)
} else if (isFunction(rawField)) {
  InnerContent = computed(() => rawField()) as any
}

defineRender(() => {
  return (
    unref(InnerContent) && (
      <div class="lv-field">
        {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
        {h(unref(InnerContent)!)}
        {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
        {unref(InnerLabel) && h(unref(InnerLabel)!)}
      </div>
    )
  )
})
</script>

<style lang="less">
@filter-gap-size: 10px;

.lv-field {
  position: relative;
  display: inline-block;
  margin: 0 @filter-gap-size @filter-gap-size 0;
  vertical-align: top;

  &__label {
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
    > .el-cascader .el-input__inner {
      height: inherit !important;
    }
  }
}
</style>
