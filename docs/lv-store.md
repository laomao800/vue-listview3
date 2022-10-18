# lvStore

Listivew 内部底层数据及方法存储于名为 `lvStore` 的 provider。在各 slot props 及使用[`replaceComponents`](create.md#replaceComponents)时可通过该途径访问底层数据及方法。

## Attributes

### state

| name              | type     | 说明 |
| ----------------- | -------- | ---- |
| contentHeight     | number   | 内容区域高度 |
| contentLoading    | boolean  | 是否处于内容请求状态中 |
| contentData       | object   | 默认`{ items: [], total: 0 }`。内容数据及总条数 |
| contentMessage    | object   | 默认`{ type: '', text: '' }`。内容提示，可通过 `setContentMessage` 设置内容 |
| currentPage       | number   | 当前页码 |
| currentPageSize   | number   | 每页条目数 |
| selection         | any[]    | 当前内容区域勾选选中项 |
| filterModel       | | 搜索栏存储值 |
| usePage           | 同 props 同名属性，是否启用页码/页码参数 |
| pagePosition      | 同 props 同名属性，页码组件位置 |
| pageSizes         | 同 props 同名属性，分页“每页数量”可选值 |

### `search`

手动触发数据请求。该方法返回一个 Promise ，数据请求成功后 resolve 。与 Listview 实例 [search](methods-and-events.md#search) 方法一致。

### `setContentMessage`

设置内容区域提示文本。与 Listview 实例 [setContentMessage](methods-and-events.md#setContentMessage) 方法一致。

### `cleanContentData`

清空内容数据。

### `resetFilterModel`

清空搜索栏数据。
