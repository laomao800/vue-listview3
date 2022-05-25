<script lang="tsx">
import type { VNode } from 'vue'
import { defineComponent, KeepAlive, ref, unref, computed } from 'vue'
import ListviewHeader from '@/components/ListviewHeader.vue'
import { get } from '@/utils'

function getListviewTitle(node: VNode, defaultTitle = '') {
  return (
    get(node, 'props.header-title') ||
    get(node, 'props.headerTitle') ||
    defaultTitle
  )
}

export default defineComponent({
  name: 'ListviewContainer',

  props: {
    headerTitle: { type: String, default: '' },
    headerNav: { type: Array, default: () => [] },
    type: { type: String, default: '' },
    tabPosition: { type: String, default: 'left' },
  },

  setup(props, { slots }) {
    const activeTab = ref(0)

    const childViews = computed<VNode[]>(() => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const _children = slots.default && slots.default()
      return _children.map((item, index) => {
        item.key = `view-${index}`
        return item
      })
    })
    const tabTitles = computed<string[]>(() =>
      unref(childViews).map((node) => getListviewTitle(node, '未命名'))
    )

    return () => (
      <div class="lvc__wrapper">
        <ListviewHeader
          header-title={props.headerTitle}
          header-nav={props.headerNav}
        />
        <div
          class={{
            lvc__tabs: true,
            'lvc__tabs--line': props.type === 'line',
            'lvc__tabs--card': props.type !== 'line',
            'lvc__tabs--center': props.tabPosition === 'center',
          }}
        >
          {unref(tabTitles).map((title, index) => (
            <div
              class={{
                lvc__tab: true,
                'lvc__tab--active': index === unref(activeTab),
              }}
              onClick={() => (activeTab.value = index)}
            >
              <span>{title}</span>
            </div>
          ))}
        </div>

        <div class="lvc__content">
          <KeepAlive>
            {unref(childViews).map((item, index) =>
              index === unref(activeTab) ? item : null
            )}
          </KeepAlive>
        </div>
      </div>
    )
  },
})
</script>
