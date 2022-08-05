<template>
  <FieldSelect v-bind="$attrs" />
</template>

<script lang="ts" setup>
import FieldSelect from './FieldSelect.vue'

defineOptions({ name: 'FieldMultipleSelect' })
</script>
