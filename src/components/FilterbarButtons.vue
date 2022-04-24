<script lang="tsx">
import type { PropType } from 'vue'
import { isVNode, defineComponent, h } from 'vue'
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'
import { isPlainObject, isFunction } from 'lodash-es'
import vNode from './VNode'
import { hasRenderFn, warn } from '@/utils'
import {
  FilterButton,
  FilterButtonHasChildren,
  FilterButtonHasRender,
} from '~/types'

function isValidButtonConfig(button: any) {
  return (
    button &&
    (isPlainObject(button) ||
      isFunction(button) ||
      isFunction(button.render) ||
      isVNode(button))
  )
}

function isDropdownButton(item: any): item is FilterButtonHasChildren {
  return isPlainObject(item) && Array.isArray(item.children)
}

function normalizeButton(
  button: FilterButton | FilterButtonHasChildren | FilterButtonHasRender
) {
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
    ? button.children.map(normalizeButton)
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

  components: {
    vNode,
  },

  props: {
    buttons: {
      type: Array as PropType<FilterButton[]>,
      default: /* istanbul ignore next */ () => [],
    },
  },

  methods: {
    renderButton(button: FilterButton) {
      if (!isValidButtonConfig(button)) return null

      if (isFunction(button)) {
        return <vNode node={button()} />
      } else if (hasRenderFn<FilterButtonHasRender>(button)) {
        return <vNode node={button.render()} />
      } else if (isVNode(button)) {
        return <vNode node={button} />
      } else if (isDropdownButton(button)) {
        return this.renderDropdownButton(button)
      } else {
        return this.renderSingleButton(button)
      }
    },

    renderSingleButton(button: FilterButton) {
      const { text, buttonAttrs } = normalizeButton(button)
      return <el-button {...buttonAttrs}>{text}</el-button>
    },

    renderDropdownButton(button: FilterButtonHasChildren) {
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
                return <ElDropdownItem {...buttonAttrs}>{text}</ElDropdownItem>
              })}
            </ElDropdownMenu>
          ),
        }
      )
    },
  },

  render() {
    return (
      <el-form-item>
        {this.buttons.map((button) => this.renderButton(button))}
      </el-form-item>
    )
  },
})
</script>
