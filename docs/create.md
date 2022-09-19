# create()

通过 create 方法可对部分 props 默认值进行全局配置，并生成带预设的全新组件。新组件使用时依然可接收 props 覆盖预设配置。

可用于项目间接口格式不同，或者项目内部有多套不同默认配置等特殊场景。

## 全局配置项

```js
// main.ts
import { createApp } from 'vue'
import { create as createListview } from '@laomao800/vue-listview'

const app = createApp(App)

const CustomListview = createListview({
  contentDataMap: { items: 'result.items', total: 'result.total' },
  usePage: { pageIndex: 'global_page_index', pageSize: 'global_page_size' },
  // ...
})

app.component('CustomListview', CustomListview)
```

所有支持预设的 `props` ：

- `pressEnterSearch`
- `autoload`
- `requestMethod`
- `requestConfig`
- `transformRequestData`
- `transformResponseData`
- `contentDataMap`
- `contentMessage`
- `validateResponse`
- `resolveResponseErrorMessage`
- `usePage`
- `pageSize`
- `pageSizes`
- `pageAttrs`
- `pagePosition`
- `height`
- `fullHeight`
- `searchButton`
- `resetButton`


## `replaceComponents`

替换区域组件，可通过该属性配置默认插槽内容，用于全局替换诸如搜索栏、正文区域等默认组件：

```js
// main.ts
import { createApp } from 'vue'
import { create as createListview } from '@laomao800/vue-listview'
import CustomFilterbar from 'your component path...'

const app = createApp(App)

const CustomListview = createListview({
  replaceComponents: {
    filterbar: CustomFilterbar,
  },
})

app.component('CustomListview', CustomListview)
```

支持的替换区域有：

- `header`: 顶部标题栏区域
- `filterbar`: 搜索栏区域
- `content`: 正文区域
- `footer`: 底部页码区域

::: tip 注意

1. listview 本身接受的所有 attrs/props 会全部传递给替换组件；
2. 替换组件内部可通过 inject `lvStore` ，获取 Listview 内部的 store 实例，具体内容可查阅 [lvStore](lv-store.md) 章节。

:::
