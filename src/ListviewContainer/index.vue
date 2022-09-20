<template>
  <div class="lvc__wrapper">
    <ListviewHeader :header-title="headerTitle" :header-nav="headerNav" />
    <div
      :class="{
        lvc__tabs: true,
        [`lvc__tabs--${type}`]: type,
        [`lvc__tabs--${tabPosition}`]: tabPosition,
      }"
    >
      <div
        v-for="(title, index) in tabTitles"
        :key="index"
        :class="{
          lvc__tab: true,
          'lvc__tab--active': index === unref(activeTab),
        }"
        @click="() => (activeTab = index)"
      >
        <span>{{ title }}</span>
      </div>
    </div>

    <div class="lvc__content">
      <KeepAlive>
        <component :is="activeView" :key="activeTab" />
      </KeepAlive>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { useSlots, VNode } from 'vue'
import { ref, unref, computed } from 'vue'
import ListviewHeader from '@/components/ListviewHeader.vue'
import { get } from '@/utils'

function getListviewTitle(node: VNode, defaultTitle = '') {
  return (
    get(node, 'props.header-title') ||
    get(node, 'props.headerTitle') ||
    defaultTitle
  )
}

defineOptions({
  name: 'ListviewContainer',
})

defineProps({
  headerTitle: { type: String, default: '' },
  headerNav: { type: Array, default: () => [] },
  type: { type: String, default: 'card' },
  tabPosition: { type: String, default: 'left' },
})

const slots = useSlots()
const activeTab = ref(0)
const views = computed<VNode[]>(() => slots?.default?.() || [])
const activeView = computed(() => unref(views)[unref(activeTab)])
const tabTitles = computed<string[]>(() =>
  unref(views).map((node) => getListviewTitle(node, '未命名'))
)
</script>
