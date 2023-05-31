import { MaybeRef } from '@vueuse/shared'
import { Ref, VNode } from 'vue'

interface SelectOption {
  label: string
  value: any
  disabled?: boolean
  children?: SelectOption[]
}

export type FieldType =
  | 'label'
  | 'text'
  | 'number'
  | 'select'
  | 'date'
  | 'dateRange'
  | 'monthRange'
  | 'timeSelect'
  | 'timePicker'
  | 'timePickerRange'
  | 'dateTime'
  | 'dateTimeRange'
  | 'cascader'

interface FieldEffectPayload {
  fieldRef: Ref<Record<string, any>>
  filterModel: Record<string, any>
}

export interface FilterFieldConfig {
  /** 内置字段类型 */
  type?: FieldType

  /** 字段参数名 */
  model?: string

  /** 字段文本说明 */
  label?: string

  /** 同 vue 组件的 `:key` 属性，若不设置会直接使用子项的 `model` 值 */
  key?: string

  /** 组件宽度 */
  width?: string | number

  /** 显示为禁用状态 */
  disabled?: boolean

  /** 可传入对应控件原始的 attrs */
  componentAttrs?: Record<string, any>

  /** 可传入对应控件原始的 slots */
  componentSlots?: Record<string, any>

  /**
   * text 类型字段是否删除头尾空格
   * @default true
   */
  trim?: boolean

  /** select/cascader 选项配置 */
  options?:
    | SelectOption[]
    | Promise<SelectOption[]>
    | (() => SelectOption[] | Promise<SelectOption[]>)

  /** select/cascader 字段类型多选 */
  multiple?: boolean

  effect?: (effectPayload: FieldEffectPayload) => void

  render?: () => VNode
}

export type FilterField =
  | MaybeRef<FilterFieldConfig | FilterFieldConfig[] | VNode>
  | (() => MaybeRef<VNode>)
