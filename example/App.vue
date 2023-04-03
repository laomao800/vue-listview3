<template>
  <ListviewComponent
    ref="listview"
    v-model:selection="selection"
    header-title="演示列表1"
    :header-nav="['菜单1', { text: '菜单2' }]"
    request-url="/mock/list"
    request-method="post"
    :filter-buttons="filterButtons"
    :filter-fields="filterFields"
    :filter-model="filterModel"
    :table-columns="tableColumns"
    :page-props="{ pagerCount: 5 }"
    :content-attrs="contentAttrs"
    :validate-response1="() => true"
    :table-selection-column="{ selectable: (row: any, index:number) => index !== 1 }"
  />
</template>

<script lang="tsx" setup>
/* eslint-disable no-console */
import type { FilterField, TableColumn } from '~/types'

import mitt from 'mitt'
import { ref, unref, shallowRef, computed } from 'vue'
import { ElMessage, ElButton, ElSelect, ElOption } from 'element-plus'
import 'element-plus/es/components/badge/style/css'
import 'element-plus/es/components/message/style/css'
import { CirclePlus, Remove } from '@element-plus/icons-vue'
// @ts-ignore
import { Listview as ListviewComponent } from '../src'

const contentAttrs = ref({
  rowClassName: 'row-view-class',
})

const selection = ref<any[]>([])
const loadingSelection = ref(false)

const filterModel = ref({
  hidden: 'hidden',
  multipleSelect: [],
  selectField: '',
  module_id: '2',
})

const filterButtons = shallowRef([
  {
    type: 'success',
    icon: CirclePlus,
    text: '添加',
    onClick: () =>
      ElMessage({
        message: '添加',
        grouping: true,
        type: 'success',
      }),
  },
  () => (
    <ElButton
      loading={unref(loadingSelection)}
      icon={Remove}
      type="danger"
      onClick={() => {
        if (unref(selection).length < 1) {
          ElMessage({
            message: '请至少选择一条数据',
            grouping: true,
            type: 'error',
          })
        } else {
          loadingSelection.value = true
          setTimeout(() => {
            ElMessage({
              message: JSON.stringify(unref(selection).map((row) => row.id)),
              grouping: true,
              type: 'success',
            })
            loadingSelection.value = false
          }, 500)
        }
      }}
    >
      查看已选
    </ElButton>
  ),
  {
    type: 'primary',
    icon: CirclePlus,
    text: '下拉按钮',
    trigger: 'click',
    splitButton: true,
    onClick: () => ElMessage('下拉按钮'),
    children: [
      {
        text: '菜单1',
        icon: CirclePlus,
        onClick: () => ElMessage('菜单1'),
      },
      {
        text: '菜单2',
        icon: Remove,
        onClick: () => ElMessage('菜单2'),
      },
    ],
  },
])

const emitter = mitt<any>()
const filterFields = shallowRef<FilterField[]>([
  {
    label: 'Module',
    model: 'module_id',
    render: () =>
      computed(() => (
        <ElSelect v-model={filterModel.value.module_id}>
          <ElOption label="Module 1" value="1" />
          <ElOption label="Module 2" value="2" />
        </ElSelect>
      )),
  },
  {
    type: 'select',
    model: 'selectField',
    options: [],
    effect: ({ vm, filterModel }: any) => {
      emitter.on('custom-update-input', (value: string) => {
        filterModel.selectField = value
        vm.options = [
          { label: value, value },
          { label: 'other-label', value: 'other-value' },
        ]
      })
    },
  },
  {
    type: 'select',
    model: 'searchType',
    options: [
      { label: '类型1', value: 'type1' },
      { label: '类型2', value: 'type2' },
    ],
    label: '搜索类型',
    componentAttrs: {
      onChange: (val: any) => {
        emitter.emit('search-type-change', val)
      },
    },
  },
  {
    type: 'text',
    model: 'typeKeyword',
    disabled: true,
    componentAttrs: {
      placeholder: '请先选择搜索类型',
      onChange: console.log,
    },
    effect: ({ fieldRef }) => {
      emitter.on('search-type-change', (value) => {
        fieldRef.value.componentAttrs.placeholder = value
          ? '请输入搜索关键字'
          : '请先选择搜索类型'
        fieldRef.value.disabled = !value
      })
    },
  },
  {
    type: 'select',
    model: 'error',
    label: '特定数据',
    options: [
      { label: '响应成功，内容错误', value: 'apiError' },
      { label: '响应错误', value: 'httpError' },
      { label: '响应空内容', value: 'empty' },
    ],
  },
  {
    type: 'text',
    model: 'name',
    label: '文本字段',
    componentSlots: {
      prepend: '$',
      append: '$',
    },
    componentAttrs: {
      'suffix-icon': 'el-icon-date',
    },
  },
  [
    {
      type: 'label',
      label: '支持组合',
    },
    {
      type: 'text',
      label: '组合多个字段为整体',
      model: 'group-text-1',
    },
    {
      type: 'text',
      label: '避免被自动收起拆开',
      model: 'group-text-2',
    },
  ],
  [
    {
      type: 'number',
      label: '数字',
      model: 'number',
    },
    {
      type: 'label',
      label: '文本标签',
    },
  ],
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
  {
    type: 'select',
    model: 'promiseOptions',
    label: 'promiseOptions',
    options: new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { label: '单选项 1', value: 1 },
          { label: '单选项 2', value: 2 },
          { label: '单选项 3', value: 3 },
        ])
      }, 5000)
    }),
  },
  {
    type: 'select',
    multiple: true,
    model: 'asyncOptions',
    label: 'asyncOptions',
    options: (done) => {
      setTimeout(() => {
        done([
          { label: '多选项 1', value: 1 },
          { label: '多选项 2', value: 2 },
          { label: '多选项 3', value: 3 },
        ])
      }, 3000)
    },
  },
  {
    type: 'date',
    model: 'date',
    label: '日期选择',
  },
  {
    type: 'dateRange',
    model: 'dateRange',
    label: '日期范围',
  },
  {
    type: 'monthRange',
    model: 'monthRange',
    label: '月份范围',
  },
  {
    type: 'timeSelect',
    model: 'timeSelect',
    label: '固定时间',
  },
  {
    type: 'timePicker',
    model: 'timePicker',
    label: '任意时间',
  },
  {
    type: 'timePickerRange',
    model: 'timePickerRange',
    label: '时间范围',
  },
  {
    type: 'dateTime',
    model: 'dateTime',
    label: '日期时间',
  },
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
                children: [
                  {
                    value: '4',
                    label: '菜单4',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
])

const tableColumns = shallowRef<TableColumn[]>([
  {
    label: 'id',
    prop: 'id',
    width: 100,
    fixed: true,
  },
  {
    label: 'name',
    prop: 'name',
    width: 200,
    fixed: true,
  },
  {
    label: '操作',
    width: 150,
    fixed: true,
    align: 'center',
    render: () => {
      return (
        <div>
          <ElButton
            onClick={(e) => e.stopPropagation()}
            style="padding:4px 8px"
            size="small"
            type="success"
          >
            审核
          </ElButton>
          <ElButton
            onClick={(e) => e.stopPropagation()}
            style="padding:4px 8px"
            size="small"
            type="danger"
          >
            删除
          </ElButton>
        </div>
      )
    },
  },
  { label: '销售员', prop: 'seller' },
  { label: '仓库', prop: 'warehouse' },
  { label: '零售价格', prop: 'sale_price' },
  {
    label: '折扣率',
    formatter: (row: any) => row.discount.toFixed(2),
  },
  {
    label: '折后价',
    formatter: (row: any) => (row.discount * row.sale_price).toFixed(2),
  },
  {
    label: '折扣时间',
    children: [
      { label: '折扣开始', prop: 'date', align: 'center' },
      { label: '折扣结束', prop: 'date', align: 'center' },
    ],
  },
  { label: '数量', prop: 'quantity' },
  {
    label: '是否启用',
    render: (prop: any) => {
      if (prop.row.enable) {
        return <div style="color:#67c23a">启用</div>
      } else {
        return <div style="color:#f56c6c">禁用</div>
      }
    },
  },
  { label: '创建人', prop: 'seller' },
  { label: '创建时间', prop: 'date' },
  {
    label: '最后修改',
    children: [
      { label: '修改人', prop: 'seller' },
      { label: '修改时间', prop: 'date' },
    ],
  },
])
</script>
