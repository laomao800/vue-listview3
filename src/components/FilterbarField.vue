<template>
  <div class="lv__field">
    <component :is="InnerContent" />
    <component :is="InnerLabel" />
  </div>
</template>

<script lang="tsx" setup>
import type { FilterField } from '~/types'
import type { PropType, VNode } from 'vue'

import { computed, unref, isVNode, Transition, h } from 'vue'
import hasValues from 'has-values'
import { isFunction } from 'lodash-es'
import { isPlainObject } from 'is-what'
import { get, useLvStore } from '@/utils'
import { getFieldComponent } from './fields/index'

const _isFieldObj = (payload: typeof props.field): payload is FilterField =>
  isPlainObject(payload)

const lvStore = useLvStore()

const props = defineProps({
  field: {
    type: [Object, Function] as PropType<FilterField | VNode | (() => VNode)>,
    default: () => ({}),
  },
})

const showLabelRef = computed(() => {
  const modelName = get(props.field, 'model')
  if (modelName) {
    const value = get(lvStore.filterModel, modelName)
    // hasValues(null) -> true
    return value !== null && hasValues(value)
  }
  return false
})

let InnerLabel: VNode | null = null
let InnerContent: VNode | null = null

if (_isFieldObj(props.field)) {
  InnerLabel = props.field?.label ? (
    <Transition name="lv__field-label-trans">
      {unref(showLabelRef) && (
        <div class="lv__field-label">{props.field.label}</div>
      )}
    </Transition>
  ) : null

  if (isFunction(props.field.render)) {
    InnerContent = props.field.render()
  } else {
    const FieldComponent = getFieldComponent(props.field.type) as any
    if (FieldComponent) {
      const style = props.field.width
        ? { width: `${props.field.width}px` }
        : null
      InnerContent = (
        <el-form-item>
          <FieldComponent {...{ field: props.field, style }} />
        </el-form-item>
      )
    }
  }
} else if (isFunction(props.field)) {
  InnerContent = props.field()
} else if (isVNode(props.field)) {
  InnerContent = h(props.field)
}
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
