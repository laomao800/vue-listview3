<script lang="tsx">
import Vue from 'vue'
import { isNil } from 'lodash-es'
import storeProviderMixin from '@/mixins/storeProviderMixin'

export default {
  name: 'ListviewContentFooter',

  mixins: [storeProviderMixin],

  inheritAttrs: false,

  computed: {
    usePage() {
      return this.lvStore.usePage
    },
    pagePosition() {
      return this.lvStore.pagePosition
    },
    currentPage: {
      get() {
        return this.lvStore.currentPage
      },
      set(val: number) {
        this.lvStore.currentPage = val
      },
    },
    currentPageSize: {
      get() {
        return this.lvStore.currentPageSize
      },
      set(val: number) {
        this.lvStore.currentPageSize = val
      },
    },
    mergedAttrs(): any {
      let total = this.lvStore.contentData.total
      total = isNil(total) ? 0 : total
      return {
        pageSize: this.currentPageSize,
        pageSizes: this.lvStore.pageSizes,
        background: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        ...this.lvStore.pageProps,
        total,
        currentPage: this.currentPage,
        'onUpdate:currentPage': this.handleCurrentChange,
        'onUpdate:pageSize': this.handleSizeChange,
      }
    },
  },

  methods: {
    handleSizeChange(pageSize: number) {
      this.currentPageSize = pageSize
      this.currentPage = 1
    },
    handleCurrentChange(currentPage: number) {
      this.currentPage = currentPage
    },
  },

  render() {
    const pagination = this.usePage && (
      <el-pagination {...this.mergedAttrs} ref="pagination" class="lv__pager" />
    )
    return (
      <div class="lv__footer">
        <div class="lv__footer-left">
          {this.$slots['footer-left'] ||
            (this.pagePosition !== 'right' && pagination)}
        </div>

        <div class="lv__footer-center">{this.$slots['footer-center']}</div>

        <div class="lv__footer-right">
          {this.$slots['footer-right'] ||
            (this.pagePosition === 'right' && pagination)}
        </div>
      </div>
    )
  },
}
</script>

<style lang="less">
.lv__footer {
  display: flex;
  padding-top: 5px;

  &-left,
  &-center,
  &-right {
    display: flex;
    flex: 1;
    align-items: center;
  }

  &-left {
    justify-content: flex-start;
  }
  &-center {
    flex: inherit;
    justify-content: center;
  }
  &-right {
    justify-content: flex-end;
  }
}
</style>
