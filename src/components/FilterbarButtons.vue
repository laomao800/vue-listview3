<script lang="tsx">
import type { PropType } from 'vue'
import { isVNode, defineComponent, h } from 'vue'
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'
import { isPlainObject, isFunction } from 'lodash-es'
import vNode from './VNode'
import { hasRenderFn } from '@/utils'
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

function applyClick(clickListener: FilterButton['click'], $event: MouseEvent) {
  return isFunction(clickListener) && clickListener($event)
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
      return (
        <el-button
          type={button.type}
          plain={button.plain}
          icon={button.icon}
          onClick={($event: MouseEvent) => applyClick(button.click, $event)}
        >
          {button.text}
        </el-button>
      )
    },

    renderDropdownButton(button: FilterButtonHasChildren) {
      return h(
        ElDropdown,
        {
          type: button.type,
          splitButton: button.splitButton,
          trigger: 'click',
          placement: 'bottom',
          onClick: ($event: MouseEvent) => applyClick(button.click, $event),
        },
        {
          default: () =>
            button.splitButton ? (
              [button.icon, button.text]
            ) : (
              <el-button
                type={button.type}
                icon={button.icon}
                onClick={($event: MouseEvent) =>
                  applyClick(button.click, $event)
                }
              >
                {button.text}
                <el-icon class="el-icon--right">
                  <ArrowDown />
                </el-icon>
              </el-button>
            ),
          dropdown: () => (
            <ElDropdownMenu>
              {button.children.map((child) => (
                <ElDropdownItem
                  {...{
                    onClick: ($event: MouseEvent) =>
                      applyClick(child.click, $event),
                  }}
                >
                  {child.icon && <i class={child.icon} />}
                  {child.text}
                </ElDropdownItem>
              ))}
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
