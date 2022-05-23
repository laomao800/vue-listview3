import { VNode } from 'vue'

type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'

export interface FilterButton {
  /** 按钮样式类型 */
  type?: ButtonType

  /** 按钮图标 */
  icon?: string

  /** 是否显示为线框按钮 */
  plain?: boolean

  /** 按钮文本 */
  text?: string

  /** @deprecated 按钮点击事件，请使用 onClick 属性代替 */
  click?: ($event: MouseEvent) => void

  /** 按钮点击事件 */
  onClick?: ($event: MouseEvent) => void

  /** 是否展示为分裂按钮 */
  splitButton?: boolean

  /** 子按钮 */
  children?: {
    icon?: FilterButton['icon']
    text?: FilterButton['text']
    onClick?: FilterButton['onClick']

    /** @deprecated 按钮点击事件，请使用 onClick 属性代替 */
    click?: FilterButton['click']
  }[]

  /** 自定义渲染方法 */
  render?: () => VNode
}

export interface FilterButtonHasRender extends FilterButton {
  render: Required<FilterButton>['render']
}

export interface FilterButtonHasChildren extends FilterButton {
  children: Required<FilterButton>['children']
}
