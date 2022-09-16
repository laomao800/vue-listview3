# Prop `filter-fields`

- type: `(FilterFieldConfig | VNode | () => VNode)[]`
- default: `[]`

配置搜索栏搜索字段，相关参数会提交至查询接口。支持 Object 配置或 JSX。

## FilterFieldConfig Types

以 object 类型配置所有支持的属性：

```ts
interface FilterFieldConfig {
  /** 内置字段类型，对应组件查看下方小节说明 */
  type:
    | 'label'
    | 'text'
    | 'number'
    | 'select'
    | 'date'
    | 'dateRange'
    | 'timeSelect'
    | 'timePicker'
    | 'timePickerRange'
    | 'dateTime'
    | 'dateTimeRange'
    | 'cascader'

  /** 字段参数名 */
  model: string

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

  /** select/cascader 类型的配置，具体用法可看下方小节 */
  options?:
    | SelectOption[]
    | Promise<SelectOption[]>
    | ((done: (options: SelectOption[]) => void) => void)

  /** select/cascader 字段类型多选 */
  multiple?: boolean

  /** 组件 mounted 后执行，可用于简单实现组件交互效果 */
  effect?: (effectPayload: {
    /** 当前 filterFieldConfig 引用 */
    fieldRef: Ref<FilterFieldConfig>
    /** 内部搜索参数对象引用 */
    filterModel: Record<string, any>
  }) => void

  render?: () => VNode | Ref<VNode>
}

interface SelectOption {
  label: string
  value: any
  disabled?: boolean
  children?: SelectOption[]
}
```

## 默认字段组件说明

| `type`          | 说明         | 对应 Element Plus 组件                 |
| --------------- | ------------ | -------------------------------------- |
| label           | 文本标签     | 纯文本，无对应组件                     |
| text            | 文本字段     | [Text][text]                           |
| number          | 数字输入     | [Number][number]                       |
| select          | 下拉单选     | [Select][select]                       |
| date            | 日期选择     | [Date][date]                           |
| dateRange       | 日期范围     | [DateRange][date-range]                |
| timeSelect      | 固定时间选项 | [TimeSelect][time-select]              |
| timePicker      | 任意时间     | [TimePicker][time-picker]              |
| timePickerRange | 时间范围     | [TimePickerRange][time-picker-range]   |
| dateTime        | 日期时间     | [DateTime][date-time]                  |
| dateTimeRange   | 日期时间范围 | [DateTimeRange][date-time-range]       |
| cascader        | 级联选项     | [Cascader][cascader]                   |

## `componentSlots` / `componentAttrs`

通过这 2 个属性可设置默认字段组件的 slots 及 attrs ，且其原组件事件亦可从此传入：

```ts
const filterFields = [{
  type: 'text',
  componentAttrs: {
    autocomplete: 'off',
    onChange: () => {}
  },
  componentSlots: {
    prepend: '$',
    append: '$'
  }
}]
```

## `options` 属性说明

对于 `select` , `cascader` 字段，可通过 `options` 属性配置选项值。支持通过传入 Promise 异步填充选项。

- type:
  - `SelectOption[]`
  - `Promise<SelectOption[]>`
  - `() => Promise<SelectOption[]>`
- default: `[]`

```ts
const optionsPromise = new Promise<SelectOption>(resolve =>
  resolve([
    { label: 'label 1', value: 1 },
    { label: 'label 2', value: 2 }
  ])
)

const filterFields = [{
  type: 'select',
  model: 'promiseSelect',
  label: 'promiseSelect',
  options: optionsPromise
}]
```

## `effect` 属性说明

`effect` 方法会在字段组件 `mounted` 后执行，可用于简单实现组件交互效果

- type: `({ fieldRef, filterModel }) => void`
  - `fieldRef: Ref<object>`: 当前自身 filterFields 项引用
  - `filterModel: Record<string, any>`: 搜索栏完整数据，可直接修改属性值

```ts
import mitt from 'mitt'
const emitter = mitt<any>()
const filterFields = [
  {
    type: 'select',
    model: 'searchType',
    label: '搜索类型',
    options: [
      { label: '类型1', value: 'type1' },
      { label: '类型2', value: 'type2' },
    ],
    componentAttrs: {
      onChange: (val: string) => emitter.emit('search-type-change', val)
    },
  },
  {
    type: 'text',
    model: 'typeKeyword',
    disabled: true,
    componentAttrs: {
      placeholder: '请先选择搜索类型',
      onChange: console.log,
    },
    effect: ({ fieldRef }) => {
      emitter.on('search-type-change', (value) => {
        fieldRef.value.componentAttrs.placeholder = value
          ? '请输入搜索关键字'
          : '请先选择搜索类型'
        fieldRef.value.disabled = !value
      })
    },
  },
]
```

## `JSX`

支持传入 JSX 渲染自定义表单组件或自定义元素：

```jsx
const filterModel = ref({
  jsxValue: ''
})

const filterFields = shallowRef([
  {
    label: 'jsxValue',
    model: 'jsxValue',
    render: () =>
      computed(() => <input v-model={filterModel.value.module_id} />),
  },
  computed(() => <input v-model={filterModel.value.module_id} />),
  <strong>text</strong>
  () => <strong>text</strong>,
])
```

[text]: https://element-plus.org/zh-CN/component/input
[number]: https://element-plus.org/zh-CN/component/input-number
[select]: https://element-plus.org/zh-CN/component/select
[date]: https://element-plus.org/zh-CN/component/date-picker
[date-range]: https://element-plus.org/zh-CN/component/date-picker#%E9%80%89%E6%8B%A9%E4%B8%80%E6%AE%B5%E6%97%B6%E9%97%B4
[time-select]: https://element-plus.org/zh-CN/component/time-select
[time-picker]: https://element-plus.org/zh-CN/component/time-picker#%E9%99%90%E5%88%B6%E6%97%B6%E9%97%B4%E9%80%89%E6%8B%A9%E8%8C%83%E5%9B%B4
[time-picker-range]: https://element-plus.org/zh-CN/component/time-picker#%E4%BB%BB%E6%84%8F%E6%97%B6%E9%97%B4%E8%8C%83%E5%9B%B4
[date-time]: https://element-plus.org/zh-CN/component/datetime-picker
[date-time-range]: https://element-plus.org/zh-CN/component/datetime-picker#%E6%97%A5%E6%9C%9F%E5%92%8C%E6%97%B6%E9%97%B4%E8%8C%83%E5%9B%B4
[cascader]: https://element-plus.org/zh-CN/component/cascader
[option-attributes]: https://element-plus.org/zh-CN/component/select#option-%E5%B1%9E%E6%80%A7
