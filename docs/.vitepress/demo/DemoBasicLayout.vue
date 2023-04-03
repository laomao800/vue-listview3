<template>
  <Listview v-bind="lvConfig" />
</template>

<script setup lang="tsx">
import { shallowRef } from 'vue'
import { Edit, Check, Message, Star, Delete } from '@element-plus/icons-vue'
import { ElButton } from 'element-plus'

const filterModel = { hidden: 'hidden', multipleSelect: [] }

const filterButtons = [
  { text: 'default', onClick: () => console.log('click:button-default') },
  {
    type: 'danger',
    icon: Edit,
    text: 'danger',
    onClick: () => console.log('click:button-danger'),
  },
  {
    type: 'primary',
    text: '下拉按钮',
    onClick: () => console.log('click:button-dropdown1'),
    children: [
      {
        text: '菜单1',
        onClick: () => console.log('click:button-dropdown1-sub1'),
      },
      {
        text: '菜单2',
        onClick: () => console.log('click:button-dropdown1-sub2'),
      },
    ],
  },
]

const filterFields = [
  { type: 'text', model: 'name', label: '文本字段' },
  { type: 'text', model: 'name2', label: '禁用文本', disabled: true },
  { type: 'number', model: 'number' },
  {
    type: 'select',
    model: 'select',
    label: '单选字段',
    options: [
      { label: '选项 1', value: 1 },
      { label: '选项 2', value: 2 },
      { label: '选项 3', value: 3 },
      { label: '禁用项', value: 4, disabled: true },
    ],
  },
  {
    type: 'select',
    multiple: true,
    model: 'multipleSelect',
    label: '多选字段',
    options: [
      { label: '选项 1', value: 1 },
      { label: '选项 2', value: 2 },
      { label: '选项 3', value: 3 },
      { label: '禁用项', value: 4, disabled: true },
    ],
  },
  { type: 'date', model: 'date', label: '日期选择' },
  { type: 'dateRange', model: 'dateRange', label: '日期范围' },
  { type: 'monthRange', model: 'monthRange', label: '月份范围' },
  { type: 'timeSelect', model: 'timeSelect', label: '固定时间' },
  { type: 'timePicker', model: 'timePicker', label: '任意时间' },
  {
    type: 'timePickerRange',
    model: 'timePickerRange',
    label: '时间范围',
  },
  { type: 'dateTime', model: 'dateTime', label: '日期时间' },
  {
    type: 'dateTimeRange',
    model: 'dateTimeRange',
    label: '日期时间范围',
  },
  {
    type: 'cascader',
    model: 'cascader',
    label: '级联选项',
    options: [
      {
        value: '1',
        label: '菜单1',
        children: [
          {
            value: '2',
            label: '菜单2',
            children: [
              {
                value: '3',
                label: '菜单3',
                children: [{ value: '4', label: '菜单4' }],
              },
            ],
          },
        ],
      },
    ],
  },
  [
    { type: 'label', label: '组合' },
    { type: 'text', label: '支持组合多个字段' },
    { type: 'text', label: '避免被自动收起拆开' },
  ],
  { type: 'label', label: '文本标签' },
]

const tableColumns = [
  {
    label: 'id',
    prop: 'id',
    width: 100,
    fixed: true,
  },
  {
    label: 'name',
    prop: 'name',
    fixed: true,
  },
  {
    label: '操作',
    fixed: true,
    width: 120,
    align: 'center',
    render: () => (
      <div>
        <ElButton style="height:24px;padding:0 6px;" type="success">
          审核
        </ElButton>
        <ElButton style="height:24px;padding:0 6px;" type="danger">
          删除
        </ElButton>
      </div>
    ),
  },
  { label: '负责人', prop: 'seller', width: 100 },
  {
    label: '详情',
    children: [
      { label: '数量', prop: 'quantity', width: 120 },
      { label: '价格', prop: 'sale_price', width: 120 },
    ],
  },
  {
    label: '是否启用',
    width: 100,
    render: ({ row }: any) =>
      row.enable ? (
        <span style="color:#67c23a">启用</span>
      ) : (
        <span style="color:#f56c6c">禁用</span>
      ),
  },
  { label: '修改人', prop: 'seller', width: 100 },
  { label: '修改时间', prop: 'date', width: 120 },
]

const lvConfig = shallowRef({
  requestUrl: './mock-list.json',
  requestMethod: 'get',
  headerTitle: '演示列表1',
  headerNav: [{ text: '菜单1', to: '/list' }, '菜单2'],
  filterModel,
  filterButtons,
  filterFields,
  tableColumns,
})
</script>
