<template>
  <div class="el-form-item__label">{{ field.label }}</div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { FilterFieldConfig } from '~/types'

defineOptions({ name: 'FieldLabel' })

defineProps({
  field: { type: Object as PropType<FilterFieldConfig>, default: () => ({}) },
})
</script>
