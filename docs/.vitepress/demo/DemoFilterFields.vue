<template>
  <Listview :filterModel="filterModel" :filterFields="filterFields" />
</template>

<script setup lang="tsx">
import { shallowRef, defineComponent, ref, unref, computed } from 'vue'
import { ElDialog, ElButton } from 'element-plus'
import { Download } from '@element-plus/icons-vue'
import mitt from 'mitt'

const emitter = mitt<any>()

const filterModel = shallowRef({ selectField: '' })
const filterFields = [
  {
    model: 'selectField',
    label: 'selectField',
    render: () => (
      <select
        style="height:32px;width:150px"
        value={filterModel.value.selectField}
        on-change={(e) => {
          filterModel.value.selectField = e.target.value
        }}
      >
        <option value="" />
        <option value="1">选项1</option>
        <option value="2">选项2</option>
      </select>
    ),
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
      onChange: (val) => emitter.emit('search-type-change', val),
    },
  },
  {
    type: 'text',
    model: 'typeKeyword',
    disabled: true,
    componentAttrs: {
      placeholder: '请先选择搜索类型',
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
]
</script>
