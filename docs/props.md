---
outline: [2, 3]
---

# Props

## 布局类

### height

- type: `string | number`
- default: `null`

优先级**最高**，设置整体布局高度，包含顶部标题栏、搜索栏、正文区域、页码区域所有内容的高度，支持百分比。

### fullHeight

- type: `boolean`
- default: `true`

垂直高度是否铺满屏幕高度。

### headerTitle

- type: `string`
- default: `''`

设置页面顶部通栏内的页面标题文本。

### headerNav

- type: `(string | { text: string; to?: string })[]`
- default: `[]`

设置页面顶部通栏内的面包屑，子项可为字符串或 object ， object 支持属性有：

| 属性   | 说明                                      |
| ------ | ----------------------------------------- |
| `text` | 显示文字                                  |
| `to`   | 可选，路由跳转对象，同 vue-router 的 `to` |

### contentMessage

- type: `string | { type: 'warning' | 'info' | 'error'; text: string }`
- default: `null`

可用在 [autoload](#autoload) 为 `false` 时候，初始显示的提示信息。

传入 `string` 类型则不带图标只显示文本。传入 `Object` 类型支持通过 `type` 属性指定内置图标。

## 搜索栏

### filterButtons

搜索栏左侧按钮配置，具体可查看 [Prop filterButtons](prop-filter-buttons.md) 。

### filterFields

搜索栏搜索字段配置，具体可查看 [Prop filterFields](prop-filter-fields.md) 。

### filterModel

- type: `Object`
- default: `{}`

可选，存储搜索栏的搜索条件值。如果有需要跟随请求直接发送的数据也可在此设置，以实现类似“隐藏域”的提交效果。

::: warning 有效值过滤

注意，提交时只会对内部**有效值**进行提交，会过滤掉以下内容的参数值： `''` , `null` , `undefined` , `[]` , `{}` 。

:::

### searchButton

- type: `boolean | { text: string; attrs?: ElementPlusButtonProps }`

传入 `false` 可隐藏显示搜索栏的“搜索”按钮。

传入对象类型配置，可通过 `attrs` 设置所有 `<el-button>` props 。

### resetButton

- type: `boolean | { text: string; attrs?: ElementPlusButtonProps }`

传入 `false` 可隐藏显示搜索栏的“重置”按钮。

传入对象类型配置，可通过 `attrs` 设置所有 `<el-button>` props 。

## 内容区域/表格

### tableColumns

表格列配置，具体可查看 [Prop tableColumns](prop-table-columns.md)。

### tableSelectionColumn

- type: `boolean | 'single' | { type?: string; selectable?: (row, index) => boolean }`
- default: `true`

是否开启表格行选择功能。传入 `'single'` 为表格单选效果。如果需要禁用部分行的可选状态，可传入 `selectable` 属性：

```js
{
  tableSelectionColumn: {
    // 不传该属性默认为多选
    type: 'single',

    // 用法与 <el-table-column /> 的 selectable 一致，返回 false 表示当行不可选择
    selectable(row, index) {
      return index % 2 === 0
    }
  }
}
```

### selection

- type: `object[]`
- default: `[]`

表格行选择的选中数据。可通过 `v-model` 获取更新：

```vue
<listview v-model:selection="selection" />
```

### contentAttrs

- type: `Object`
- default: `{}`

内部通过 `v-bind` 传递给 `<el-table>` 元素，因此支持传入 [Element Plus table](https://element-plus.org/zh-CN/component/table.html) 的所有属性及事件。

## 分页

### usePage

- type: `boolean | { pageIndex: string; pageSize: string }`
- default: `{ pageIndex: 'page_index', pageSize: 'page_size' }`

传入 `false` 可关闭底部分页功能。开启分页时请求参数上除了包含搜索栏内的数据，还会自动附加上 `page_index` 和 `page_size` 2 个参数。

可以通过传入 `Object` 类型自定义接口分页参数名称。

### pageSize

- type: `number`
- default: `20`

默认每页分页数量。

### pageSizes

- type: `number[]`
- default: `[20, 50, 100]`

分页“每页数量”可选值。

### pagePosition

- type: `'left' | 'right'`
- default: `'left'`

设置页码位置。注意底部若有设置 [slots](./slots.md#footer-right) 会覆盖页码组件。

### pageAttrs

- type: `Object`
- default: `{}`

支持除 `total` 和 `currentPage` 及其更新事件之外的所有 [`<el-pagination>`](https://element-plus.org/zh-CN/component/pagination.html) 属性。

## 数据请求

::: tip 说明
内部依赖 [axios](https://github.com/axios/axios) 作为请求基础方法。

每次发起请求会自动将 [filterModel](#filtermodel) 中的数据作为参数提交。

默认开启 `withCredentials: true` ，如需关闭请配置 [requestConfig](#requestconfig) 。
:::

### autoload

- type: `boolean`
- default: `true`

初始化后是否自动加载第一页内容。

### requestUrl

- type: `string`
- default: `''`

数据请求接口地址。

### requestMethod

- type: `string`
- default: `post`

### requestConfig

- type: `Object`
- default: `{}`

Axios [Request Config](https://github.com/axios/axios#request-config)。

### contentDataMap

- type: `{ items: string; total: string }`
- default: `{ items: 'result.items', total: 'result.total_count' }`

数据接口响应内容属性映射。可以直接配置各属性相对于接口响应数据的取值路径来直接映射返回值。默认会有表格视图所需的 2 个属性映射 `items` （表格数据） 和 `total` 用于分页组件。

在发起请求并判断接口获取成功（[`validateResponse`](#validateresponse) 方法验证通过）后：

- 【默认表格样式】会分别在表格数据和分页组件使用 `items` 和 `total` 2 个属性。
  - `<el-table :data="contentData.items" />`
  - `<el-pagination :total="contentData.total" />`
- 【自定义 slot 】数据挂载在 slot-scope 的 `content-data` 属性上。
- **如果 `contentDataMap` 设置为 `null` ，则不进行映射处理，直接返回接口响应数据。**

例如：有接口响应为

```js
{
  is_success: true,
  errorInfos: null,
  result: {
    items: [1, 2, 3],
    total: 20
  }
}
```

通过映射表配置

```js
{
  items: 'result.items',
  total: 'result.total',
  errorInfos: 'errorInfos'
}
```

可得到：

```js
{
  items: [1, 2, 3],
  total: 20,
  errorInfos: null
}
```

## 错误处理

### validateResponse

- type: `() => boolean`
- default: `null`

验证接口响应是否成功。若接口响应格式字段有差异，可修改该配置。

例：

  ```js
  function (response) {
    try {
      return response.is_success
    } catch (e) {
      return false
    }
  }
  ```

### resolveResponseErrorMessage

- type: `(res) => string`
- default: `null`

在 `validateResponse` 返回 `false` 标识请求失败后，会调用 `resolveResponseErrorMessage` 解析错误提示信息。

- 【默认表格样式】错误信息会出现在表格内容区域内
- 【自定义 slot 】数据挂载在 slot-scope 的 `content-message` 属性上。

例：

  ```js
  function (response) {
    try {
      return response.error_info.msg
    } catch (e) {
      return '未知错误'
    }
  }
  ```

## 数据请求 - 自定义

如果对于数据接口请求在发送前、接受后有特殊的处理流程，或者接口数据格式与规范不一致，可通过以下几个 props 对数据进行加工处理。

### requestHandler

- type: `(requestData) => Promise<data>`
- default: `null`

自定义请求方法，需要返回 Promise ，该方法优先级最高。若设置了 [`validateResponse`](#validateresponse) 方法，亦会以返回的内容进行验证流程。

### transformRequestData

- type: `(requestData) => requestData`
- default: `null`

该方法可对接口发起请求参数在发送前作最后的更改，方法最终 return 的数据会作为提交参数。参数 `requestData` 包含搜索栏的所有数据，如果有开启分页还会包含 `page_index` 和 `page_size` 。

** 如果该方法显式的返回 `false` 则会阻止提交，可用于发起请求前进行参数验证等。**

### transformResponseData

- type: `(responseData) => responseData`
- default: `null`

对原始响应数据的加工方法，接收原始响应数据，方法处理后 return 的返回值会交由给 `contentDataMap` 进行映射。

一般用于接口响应的数据无法通过 `contentDataMap` 简单映射到需要的数据时，可使用该配置项对数据进行加工再返回。
