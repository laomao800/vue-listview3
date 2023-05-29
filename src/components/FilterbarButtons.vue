<script lang="tsx">
import { ArrowDown } from '@element-plus/icons-vue'
import type { MaybeRef } from '@vueuse/shared'
import {
  ElButton,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElFormItem,
  ElIcon,
} from 'element-plus'
import { isFunction, isPlainObject } from 'is-what'
import type { PropType } from 'vue'
import { defineComponent, h, isVNode, unref } from 'vue'

import type { FilterButton, FilterButtonConfig } from '~/types'

import { isObjType, warn } from '@/utils'

interface NormalizedButton {
  text: string
  children: NormalizedButton[]
  attrs: Record<string, any>
}

function isValidButtonConfig(_button: MaybeRef<any>) {
  const button = unref(_button)
  return (
    button &&
    (isPlainObject(button) ||
      isFunction(button) ||
      isFunction(button.render) ||
      isVNode(button))
  )
}

function normalizeButton(button: FilterButtonConfig): NormalizedButton {
  const { click, text = '', children: _children, ...attrs } = button

  let onClick = button.onClick
  if (click) {
    warn(
      `[Migration][filterButtons]: 请使用 'onClick' 代替 'click' 属性。`,
      button
    )
    onClick = button.click
  }

  const children = Array.isArray(_children)
    ? _children.map(normalizeButton)
    : []

  return {
    text,
    children,
    attrs: {
      onClick,
      ...attrs,
    },
  }
}

export default defineComponent({
  name: 'FilterbarButtons',

  props: {
    buttons: {
      type: Array as PropType<FilterButton[]>,
      default: /* istanbul ignore next */ () => [],
    },
  },

  setup(props) {
    function renderButton(_button: MaybeRef<FilterButton>) {
      const button = unref(_button)
      if (!isValidButtonConfig(button)) return null

      if (isFunction(button)) {
        return h(unref(button()))
      } else if (isVNode(button)) {
        return h(button)
      } else if (isObjType<FilterButtonConfig>(button)) {
        if (Array.isArray(button.children)) {
          return renderDropdownButton(button)
        } else {
          return renderSingleButton(button)
        }
      }
    }

    function renderSingleButton(button: FilterButtonConfig) {
      const { text, attrs } = normalizeButton(button)
      return <ElButton {...attrs}>{text}</ElButton>
    }

    function renderDropdownButton(button: FilterButtonConfig) {
      const { text, children, attrs } = normalizeButton(button)
      return h(
        ElDropdown,
        {
          ...attrs,
          trigger: 'click',
          placement: 'bottom',
        },
        {
          default: () => {
            const content = []
            attrs.icon && content.push(<ElIcon>{h(attrs.icon)}</ElIcon>)
            content.push(<span>{text}</span>)

            return attrs.splitButton ? (
              content
            ) : (
              <ElButton {...attrs}>
                {content}
                <ElIcon class="ElIcon--right">
                  <ArrowDown />
                </ElIcon>
              </ElButton>
            )
          },
          dropdown: () => (
            <ElDropdownMenu>
              {children.map((child) => {
                const { text, attrs } = child
                return <ElDropdownItem {...attrs}>{text}</ElDropdownItem>
              })}
            </ElDropdownMenu>
          ),
        }
      )
    }

    return () => (
      <ElFormItem>
        {props.buttons.map((button) => renderButton(button))}
      </ElFormItem>
    )
  },
})
</script>
