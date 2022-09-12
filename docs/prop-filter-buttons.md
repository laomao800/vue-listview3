# Prop `filter-buttons`

- type: `FilterButton[]`
- default: `[]`

配置搜索栏左侧的操作按钮，默认渲染 [<ElButton />](https://element-plus.org/zh-CN/component/button.html)。支持传入 Object 和 JSX 。

## 配置属性

### text

- type: `String`
- default: `''`

按钮显示文本。

### children

- type: `Array`
- default: `null`

按钮下拉菜单子选项，不支持多级，仅支持 `icon` , `text` , `onClick` 。

### onClick

- type: `(event) => void`
- default: `null`

按钮点击事件。

### splitButton

- type: `Boolean`
- default: `false`

在有子菜单的情况下，可控制触发按钮是否呈现为左右分裂式。

## 可直接传入JSX

```tsx
const btnLoading = ref(false)
const filterButtons = shallowRef([
  <button on-click={() => {}}>JSX1</button>,
  () => (
    <ElButton
      loading={unref(btnLoading)}
      icon={Remove}
      onClick={() => {
        btnLoading.value = true
        setTimeout(() => (btnLoading.value = false), 1000)
      }}
    >
      JSX2
    </ElButton>
  ),
])
```

## Types

```ts
import { VNode } from 'vue'
import { ButtonProps } from 'element-plus'

interface FilterButtonConfig extends ButtonProps {
  /** 按钮文本 */
  text?: string

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
```
