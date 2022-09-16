# Prop `table-columns`

默认表格组件列配置。

- type: `TableColumn[]`
- default: `[]`


## 常用属性

| 参数         | 类型                            | 说明                                                                  |
| ------------ | ------------------------------- | --------------------------------------------------------------------- |
| label        | String                          | 表头显示的内容                                                        |
| renderHeader | Function(h, { column, $index }) | 支持 jsx 自定义表头内容                                               |
| prop         | String                          | 列字段名                                                              |
| width        | String , Number                 | 列宽度                                                                |
| align        | String                          | 列对齐方式 `left` , `center` , `right`                                |
| render       | function({ row, column, $index }) | 支持返回字符串或 JSX |
| formatter    | function(row)                   | 如数据需要简单文本加工，可使用该配置处理后 return 即可                |
| fixed        | String , Boolean                | 列是否固定在左侧或者右侧，true 表示固定在左侧                         |
| children     | Array                           | 子列配置，子项支持属性与父级一致                                      |
| ...          | -                               | **支持其他 [Element Plus table column attrs][table-column]** |


## Types

```ts
export interface TableColumn extends ElTableColumn {
  /** 单元格渲染方法，可使用 JSX */
  render?: ({
    row,
    column,
    $index,
  }: {
    row: any
    column: any
    $index: number
  }) => VNode

  /** 子列 */
  children?: TableColumn[]
}
```

## 配置演示

```tsx
const tableColumns = shallowRef([
  // 常规调用，直接通过 prop 指定属性名
  { label: 'id', prop: 'id', fixed: true },

  // 需要对数据进行简单处理后再输出
  {
    label: '折扣率',
    formatter: row => row.discount.toFixed(2)
  },

  // 支持 JSX 以及绑定 method
  {
    label: '操作',
    align: 'center',
    fixed: true,
    render: ({ row, column, $index }) => (
      <el-button
        size="mini"
        icon={row.enable ? 'el-icon-check ' : 'el-icon-close'}
        on-click={(e) => {
          e.stopPropagation()
        }}
      >
        按钮
      </el-button>
    )
  },

  // 子列嵌套
  {
    label: '配送信息',
    children: [
      { label: '姓名', prop: 'name' },
      {
        label: '地址',
        children: [
          { label: '省份', prop: 'province' },
          { label: '市区', prop: 'city' },
          { label: '地址', prop: 'address', width: 600 }
        ]
      }
    ]
  }
])
```

[table-column]: https://element-plus.org/zh-CN/component/table.html#table-column-%E5%B1%9E%E6%80%A7
