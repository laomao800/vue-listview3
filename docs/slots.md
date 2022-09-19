# Slots

其中 `filterbar` 、`footer` 与 [`replaceComponent`](./create.md#replacecomponents) 类似，会渲染于整个完整区域，既设置后下方其他内部 slot `filterbar-*` ， `footer-*` 等不再显示。

| name             | 说明                                         |
| ---------------- | -------------------------------------------- |
| default          | 内容主体区域                                 |
| header           | 顶部页面标题、面包屑主体区域                 |
| filterbar        | 搜索栏主体区域                               |
| footer           | 底部页码栏主体区域                           |
| filterbar-top    | 搜索栏顶部                                   |
| filterbar-bottom | 搜索栏底部                                   |
| filterbar-left   | 搜索栏左侧                                   |
| filterbar-right  | 搜索栏右侧                                   |
| prepend-submit   | 搜索栏右侧“搜索”按钮左侧                     |
| append-submit    | 搜索栏右侧“重置”按钮右侧                     |
| prepend-more     | 搜索栏折叠按钮左侧                           |
| append-more      | 搜索栏折叠按钮右侧                           |
| footer-left      | 底部页码栏左侧，该插槽会覆盖居左显示页码组件 |
| footer-center    | 底部页码栏中间位置                           |
| footer-right     | 底部页码栏右侧，该插槽会覆盖居右显示页码组件 |

## Slot props

所有 slot 都接收内部 [lvStore](./lv-store.md) 实例作为 slot props 。

用例：

```vue
<template>
  <listview>
    <template #default="{ state }">
      <div v-if="state.contentLoading">Loading...</div>
      <div v-else-if="state.contentMessage.text">{{ state.contentMessage }}</div>
      <ul v-else>
        <li v-for="(item, index) in state.contentData.items" :key="index">
          {{ item.name }}
        </li>
      </ul>
    </template>
  </listview>
</template>
```
