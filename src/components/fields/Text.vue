<template>
  <el-input
    v-model="value"
    v-bind="mergedProps"
    v-on="mergedEvents"
    @blur="onBlur"
  >
    <template v-for="(slot, key) in componentSlots" #[key]>
      <component :is="slot" v-if="isVNode(slot)" :key="key" />
      <template v-else>{{ slot }}</template>
    </template>
  </el-input>
</template>

<script>
import { isVNode } from 'vue'
import fieldMixin from '@/mixins/fieldMixin'
import { hasOwn } from '@/utils'

export default {
  name: 'FieldText',

  mixins: [fieldMixin],

  data() {
    return {
      defaultProps: {
        clearable: true,
        style: { width: '180px' },
      },
    }
  },

  methods: {
    isVNode,
    onBlur() {
      const isTrim = !hasOwn(this.field, 'trim') || !!this.field.trim
      if (isTrim) {
        try {
          this.value = this.value.trim()
        } catch (error) {}
      }
    },
  },
}
</script>
