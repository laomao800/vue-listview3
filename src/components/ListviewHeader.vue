<template>
  <div class="lv-header">
    <h1 v-if="headerTitle" class="lv-header__title">{{ headerTitle }}</h1>
    <ElBreadcrumb
      v-if="internalNav.length > 0"
      separator="/"
      class="lv-header__breadcrumb"
    >
      <ElBreadcrumbItem
        v-for="(item, index) in internalNav"
        :key="index"
        :to="item.to"
      >
        {{ item.text }}
      </ElBreadcrumbItem>
    </ElBreadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { isPlainObject } from 'is-what'
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'

interface ValidedNavItem {
  text: string
  to?: any
}

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  headerTitle: { type: String, default: '' },
  headerNav: { type: Array, default: () => [] },
})

const internalNav = computed(() => {
  const validNav: ValidedNavItem[] = []
  props.headerNav.forEach((nav) => {
    let text, to
    if (typeof nav === 'string') {
      text = nav
    } else if (isPlainObject(nav)) {
      text = nav.text
      to = nav.to
    }
    if (text) {
      validNav.push({ text, to })
    }
  })
  return validNav
})
</script>

<style lang="less">
.lv-header {
  padding: 8px 12px;
  line-height: 1.5;
  background-color: #fff;
  border-bottom: 1px solid #dcdfe6;

  &:empty {
    display: none;
  }

  .lv-header__title {
    display: inline-block;
    padding: 0 1em 0 0;
    margin: 0 1em 0 0;
    font-size: 16px;
    border-right: 1px solid #dcdfe6;
  }
  .lv-header__breadcrumb {
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
