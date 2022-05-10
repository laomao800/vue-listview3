<script lang="tsx">
import type { VNode } from 'vue'
import { defineComponent, KeepAlive } from 'vue'
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

  components: {
    ListviewHeader,
  },

  props: {
    headerTitle: { type: String, default: '' },
    headerNav: { type: Array, default: () => [] },
    type: { type: String, default: '' },
    tabPosition: { type: String, default: 'left' },
  },

  data() {
    return {
      activeTab: 0,
    }
  },

  computed: {
    childViews(): VNode[] {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const _children = this.$slots?.default!()
      return _children.map((item, index) => {
        item.key = `view-${index}`
        return item
      })
    },
    tabTitles(): string[] {
      return this.childViews.map((node) => getListviewTitle(node, '未命名'))
    },
  },

  render() {
    return (
      <div class="lvc__wrapper">
        <listview-header
          header-title={this.headerTitle}
          header-nav={this.headerNav}
        />
        <div
          class={{
            lvc__tabs: true,
            'lvc__tabs--line': this.type === 'line',
            'lvc__tabs--card': this.type !== 'line',
            'lvc__tabs--center': this.tabPosition === 'center',
          }}
        >
          {this.tabTitles.map((title, index) => (
            <div
              class={{
                lvc__tab: true,
                'lvc__tab--active': index === this.activeTab,
              }}
              onClick={() => (this.activeTab = index)}
            >
              <span>{title}</span>
            </div>
          ))}
        </div>

        <div class="lvc__content">
          <KeepAlive>
            {this.childViews.map((item, index) =>
              index === this.activeTab ? item : null
            )}
          </KeepAlive>
        </div>
      </div>
    )
  },
})
</script>
