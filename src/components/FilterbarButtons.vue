<script lang="tsx">
import type { PropType, VNode } from 'vue'
import { isVNode, defineComponent, h } from 'vue'
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'
import { isPlainObject, isFunction } from 'is-what'
import { warn } from '@/utils'
import { FilterButton } from '~/types'

interface NormalizedButton {
  text: string
  children: NormalizedButton[]
  buttonAttrs: Record<string, any> & {
    icon?: VNode | null
    onClick?: ($event: MouseEvent) => void
  }
}

function isValidButtonConfig(button: any) {
  return (
    button &&
    (isPlainObject(button) ||
      isFunction(button) ||
      isFunction(button.render) ||
      isVNode(button))
  )
}

function normalizeButton(button: FilterButton): NormalizedButton {
  const { click, icon: _icon, children: _children, ...buttonAttrs } = button
  const icon = _icon ? <el-icon>{h(_icon)}</el-icon> : null

  let onClick = button.onClick
  if (click) {
    warn(
      `[Migration][filterButtons]: 'click' will remove in next minor version, use 'onClick' instead.`,
      button
    )
    onClick = button.click
  }

  const children = Array.isArray(_children)
    ? _children.map(normalizeButton)
    : []

  return {
    text: button.text || '',
    children,
    buttonAttrs: {
      icon,
      onClick,
      ...buttonAttrs,
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
    function renderButton(button: FilterButton) {
      if (!isValidButtonConfig(button)) return null

      if (isFunction(button)) {
        return h(button())
      } else if (isFunction(button.render)) {
        return h(button.render())
      } else if (isVNode(button)) {
        return h(button)
      } else if (Array.isArray(button.children)) {
        return renderDropdownButton(button)
      } else {
        return renderSingleButton(button)
      }
    }

    function renderSingleButton(button: FilterButton) {
      const { text, buttonAttrs } = normalizeButton(button)
      return <el-button {...buttonAttrs}>{text}</el-button>
    }

    function renderDropdownButton(button: FilterButton) {
      const { text, children, buttonAttrs } = normalizeButton(button)
      return h(
        ElDropdown,
        {
          ...buttonAttrs,
          trigger: 'click',
          placement: 'bottom',
        },
        {
          default: () => {
            const content = []
            buttonAttrs.icon && content.push(buttonAttrs.icon)
            content.push(<span>{text}</span>)

            return buttonAttrs.splitButton ? (
              content
            ) : (
              <el-button {...buttonAttrs}>
                {content}
                <el-icon class="el-icon--right">
                  <ArrowDown />
                </el-icon>
              </el-button>
            )
          },
          dropdown: () => (
            <ElDropdownMenu>
              {children.map((child) => {
                const { text, buttonAttrs } = child
                return (
                  <ElDropdownItem {...(buttonAttrs as any)}>
                    {text}
                  </ElDropdownItem>
                )
              })}
            </ElDropdownMenu>
          ),
        }
      )
    }

    return () => (
      <el-form-item>
        {props.buttons.map((button) => renderButton(button))}
      </el-form-item>
    )
  },
})
</script>
