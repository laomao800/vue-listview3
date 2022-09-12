# Vue Listview 3.x

> Vue 2 使用请查看 [Listview 2.x](https://github.com/laomao800/vue-listview) 版本。

Demo： https://laomao800.github.io/vue-listview3/demo/

## 安装

```bash
yarn add @laomao800/vue-listview@3 element-plus

# OR

npm install @laomao800/vue-listview@3 element-plus
```

## 使用

### 默认组件

```js
import { defineComponent } from 'vue'
import { Listview } from '@laomao800/vue-listview'

export default defineComponent({
  components: {
    Listview
  }
})
```

### 带预设组件

```js
import { createApp } from 'vue'
import { create as createListview } from '@laomao800/vue-listview'

const app = createApp(App)

const lvPresetProps = {
  contentDataMap: { items: 'result.items', total: 'result.total' },
  usePage: { pageIndex: 'global_page_index', pageSize: 'global_page_size' },
  // ...
}
const CustomListview = createListview(lvPresetProps)

app.component('CustomListview', CustomListview)
```

所有支持预设配置的 props 可查阅 [create](./create.md) 小节。
