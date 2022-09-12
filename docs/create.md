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

所有支持的配置项：

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
- `replaceComponents`
- `height`
- `fullHeight`
- `searchButton`
- `resetButton`
