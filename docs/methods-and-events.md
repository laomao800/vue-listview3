# Methods & Events

## Methods

### search()

- types:

  ```ts
  interface Listview {
    search(keepInPage = false): Promise<void 0>
  }
  ```

  手动触发数据请求。该方法返回一个 Promise ，数据请求成功后 resolve 。

### resetFilter()

重置搜索栏数据，效果与点击“重置”按钮一致。

### setContentMessage()

- types：

  ```ts
  interface Listview {
    setContentMessage(
      /** 文本内容 */
      text: string,
      /** 文本左侧图标类型 */
      type: 'warning' | 'info' | 'error' = 'warning',
      /** 是否清空原有内容数据，若不清除内容区域会依然显示现有的内容数据 */
      cleanData: boolean = false
    ) => void
  }
  ```

### updateLayout()

手动刷新布局，包括搜索栏和内容区域各尺寸。

## Events

| event               | 说明 |
| ------------------- | ---- |
| filter-submit       | 点击搜索栏“搜索”按钮后，发起请求前触发 |
| filter-reset        | 点击搜索栏“重置”按钮或执行 `resetFilter()` 后，数据重置后触发 |
| before-request      | 发起数据请求前触发 |
| request-valid-error | `transformRequestData(data)` 返回 `false` 时触发 |
| request-success     | 数据请求成功，设置内容与关闭内部 loading 状态后触发 |
| request-error       | 数据请求失败触发 |
| requested           | 完成数据请求后触发，无论成功失败 |
| update:selection    | `v-model:selection` 更新事件，选中项改变后触发 |
