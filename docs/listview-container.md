# Listview Container

Listview 内置另一个组件 Listview Container 用于生成多个 Listview 集合的页面，通过顶部 Tab 结构互相切换。

## 使用方法

可包装其他自定义组件，用于将列表页独立以组件封装后再引入，减少单个页面代码长度。

外部 `<ListviewContainer>` 会自动获取内部一级子元素的 `header-title` attribute 作为 Tab 标题文本，例：

```vue
<template>
  <ListviewContainer
    :header-title="'列表容器'"
    :header-nav="[{ text: '菜单1' }, { text: '菜单2' }]"
  >
    <ListviewComponent header-title="演示列表1" />
    <ListviewComponent header-title="演示列表2" />
    <div header-title="自定义元素">content</div>
  </ListviewContainer>
</template>

<script setup>
import { ListviewContainer, Listview as ListviewComponent } from '@laomao800/vue-listview'
</script>
```

## Props

### headerTitle

- type: `String`
- default: `''`

与 [`listview` 组件的 props](props.md#headertitle) 一致。设置页面顶部通栏内的页面标题文本。

### headerNav

- type: `Array`
- default: `[]`

与 [`listview` 组件的 props](props.md#headernav) 一致。设置页面顶部通栏内的面包屑，子项可为字符串或 object ， object 支持属性有：

| 属性   | 说明                                      |
| ------ | ----------------------------------------- |
| `text` | 显示文字                                  |
| `to`   | 可选，路由跳转对象，同 vue-router 的 `to` |

### type

- type: `String`
- default: `'card'`
- 可选值: `'card'` | `'line'`

顶部 tab 样式。

### tabPosition

- type: `String`
- default: `'left'`
- 可选值: `'left'` | `'center'`

顶部 tab 显示位置。
