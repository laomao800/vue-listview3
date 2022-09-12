import { VNode } from 'vue'
import { ButtonProps } from 'element-plus'

interface FilterButtonConfig extends ButtonProps {
  /** 按钮文本 */
  text?: string

  /** @deprecated 按钮点击事件，请使用 onClick 属性代替 */
  click?: ($event: MouseEvent) => void

  /** 按钮点击事件 */
  onClick?: ($event: MouseEvent) => void

  /** 是否展示为分裂按钮 */
  splitButton?: boolean

  /** 子按钮 */
  children?: Omit<FilterButton, 'children' | 'splitButton'>

  /** 自定义渲染方法 */
  render?: () => VNode
}

type FilterButton = FilterButtonConfig | VNode | (() => VNode)

export { FilterButton, FilterButtonConfig }
