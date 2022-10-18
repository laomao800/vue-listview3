import { ListviewContainer } from '@/ListviewContainer'
import { defineConfig } from 'vitepress'

export default defineConfig({
  themeConfig: {
    siteTitle: 'Vue Listview 3',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/laomao800/vue-listview3' },
    ],
    nav: [
      {
        text: 'Changelog',
        link: 'https://github.com/laomao800/vue-listview3/blob/master/CHANGELOG.md',
      },
    ],
    sidebar: [
      {
        text: 'Listview',
        collapsible: true,
        items: [
          { text: '使用', link: '/' },
          { text: 'Props', link: '/props' },
          { text: 'Prop: filterButtons', link: '/prop-filter-buttons' },
          { text: 'Prop: filterFields', link: '/prop-filter-fields' },
          { text: 'Prop: tableColumns', link: '/prop-table-columns' },
          { text: 'Slots', link: '/slots' },
          { text: 'Methods & Events', link: '/methods-and-events' },
        ],
      },
      {
        text: 'Listview Container',
        collapsible: true,
        items: [{ text: '使用', link: '/listview-container' }],
      },
      {
        text: '定制',
        collapsible: true,
        items: [
          { text: 'create', link: '/create' },
          { text: 'lvStore', link: '/lv-store' },
        ],
      },
      {
        text: 'Demo',
        collapsible: true,
        items: [
          { text: '基础布局', link: '/demo/basic-layout' },
          { text: '自动高度', link: '/demo/auto-height' },
          { text: '指定高度', link: '/demo/specify-height' },
          { text: 'ListviewContainer', link: '/demo/listview-container' },
          { text: '常用操作按钮', link: '/demo/filter-buttons' },
          { text: '常用搜索栏', link: '/demo/filter-fields' },
          { text: '搜索栏验证', link: '/demo/filterbar-validate' },
          { text: '自定义布局', link: '/demo/custom-content' },
          { text: '自定义请求方法', link: '/demo/request-handler' },
        ],
      },
    ],
  },
})
