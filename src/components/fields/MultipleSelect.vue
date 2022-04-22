<template>
  <field-select v-bind="$attrs" />
</template>

<script>
import FieldSelect from './Select.vue'

export default {
  name: 'FieldMultipleSelect',

  components: { FieldSelect },

  // created() {
  //   if (!Array.isArray(this.value)) {
  //     this.value = []
  //   }
  // },
}
</script>
