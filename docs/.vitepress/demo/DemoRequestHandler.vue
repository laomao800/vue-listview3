<template>
  <Listview v-bind="lvConfig" />
</template>

<script setup lang="tsx">
import { shallowRef } from 'vue'

const lvConfig = shallowRef({
  filterFields: [{ type: 'text', model: 'name', label: 'name' }],
  tableColumns: [
    { label: 'id', prop: 'id', width: 120 },
    { label: 'name', prop: 'name' },
  ],
  contentDataMap: {
    items: 'custom_result.items',
    total: 'custom_result.total',
  },
  validateResponse(res) {
    try {
      return res.is_success
    } catch (e) {
      return false
    }
  },
  requestHandler(requestData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          is_success: true,
          custom_result: {
            items: [
              { id: 'id10001', name: `name10001${requestData.name || ''}` },
              { id: 'id10002', name: `name10002${requestData.name || ''}` },
            ],
            total: 2,
          },
        })
      }, 800)
    })
  },
})
</script>
