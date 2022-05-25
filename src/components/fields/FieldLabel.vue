<template>
  <div class="el-form-item__label">{{ field.label }}</div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { FilterField } from '~/types'

defineProps({
  field: { type: Object as PropType<FilterField>, default: () => ({}) },
})
</script>
