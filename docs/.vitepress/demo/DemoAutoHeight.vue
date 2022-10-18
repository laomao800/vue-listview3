<template>
  <Listview
    :full-height="false"
    :request-url="requestUrl"
    :filter-fields="filterFields"
    :table-columns="tableColumns"
  />
</template>

<script setup lang="tsx">
import { shallowRef } from 'vue'

const requestUrl = '/mock-list.json'

const filterFields = shallowRef([
  { type: 'text', model: 'name', label: '文本字段' },
])

const tableColumns = shallowRef([
  { label: 'id', prop: 'id', width: 100 },
  { label: 'name', prop: 'name' },
  { label: '负责人', prop: 'seller', width: 100 },
  { label: '修改人', prop: 'seller', width: 100 },
  { label: '修改时间', prop: 'date', width: 120 },
])
</script>
