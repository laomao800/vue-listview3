<template>
  <Listview v-bind="lvConfig" />
</template>

<script setup lang="tsx">
import { shallowRef } from 'vue'

const lvConfig = shallowRef({
  height: 400,
  requestUrl: './mock-list.json',
  requestMethod: 'get',
  filterFields: [{ type: 'text', model: 'name', label: '文本字段' }],
  tableColumns: [
    { label: 'id', prop: 'id', width: 100 },
    { label: 'name', prop: 'name' },
    { label: '负责人', prop: 'seller', width: 100 },
    { label: '修改人', prop: 'seller', width: 100 },
    { label: '修改时间', prop: 'date', width: 120 },
  ],
})
</script>
